package com.mentalhealth.app.service;

import com.mentalhealth.app.config.Constants;
import com.mentalhealth.app.domain.*;
import com.mentalhealth.app.repository.*;
import com.mentalhealth.app.service.dto.ChartDTO;
import io.swagger.models.auth.In;
import org.mariuszgromada.math.mxparser.Expression;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Transactional
public class ChartService {

	private final ChartRepository chartRepository;

	private final FormulaRepository formulaRepository;

	private final AnswerRepository answerRepository;

	private final UserRepository userRepository;

	private final SurveyService surveyService;

	private final SurveyInformationRepository surveyInformationRepository;

	private final BlockRepository blockRepository;

	public ChartService (ChartRepository chartRepository, FormulaRepository formulaRepository, AnswerRepository answerRepository,
			UserRepository userRepository, SurveyService surveyService, SurveyInformationRepository surveyInformationRepository,
			BlockRepository blockRepository) {
		this.chartRepository = chartRepository;
		this.formulaRepository = formulaRepository;
		this.answerRepository = answerRepository;
		this.userRepository = userRepository;
		this.surveyService = surveyService;
		this.surveyInformationRepository = surveyInformationRepository;
		this.blockRepository = blockRepository;
	}

	public List<ChartDTO> generateCompanyCharts (Long companyId, Integer times) {
		List<User> userList = Constants.ACADEMY_ID.equals(companyId) ?
				userRepository.findAll() : userRepository.findAllByCompany_Id(companyId);
		List<Chart> charts = chartRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
		List<ChartDTO> chartDTOList = new ArrayList<>();
		charts.forEach(chart -> {
			ChartDTO chartDTO = new ChartDTO();
			List<Long> formulaIds = Arrays.stream(chart.getVariables().split(",")).map(Long::parseLong).collect(Collectors.toList());
			Map<Long, Double> averageResultMap = new HashMap<>();
			AtomicInteger userCount = new AtomicInteger();
			userList.forEach(user -> {
				Optional<SurveyInformation> surveyInformationOptional = surveyInformationRepository.findByUser_IdAndTimes(user.getId(), times);
				if (!surveyInformationOptional.isPresent()) {
					return;
				}
				if (surveyService.checkUserForAnsweringAllQuestions(user.getId(), times)) {
					Map<Long, Double> resultMap = getFormulaResults(surveyInformationOptional.get().getId(), formulaIds);
					resultMap.keySet().forEach(formulaId -> {
						double restSum = averageResultMap.getOrDefault(formulaId, 0.0);
						restSum += resultMap.get(formulaId);
						averageResultMap.put(formulaId, restSum);
					});
					userCount.getAndIncrement();
				}
			});
			averageResultMap.keySet().forEach(formulaId -> averageResultMap.put(formulaId,
					averageResultMap.get(formulaId)/ userCount.get()));
			String chartOptions = replaceQuestionMark(chart.getChartOptions(),
					formulaIds.stream().map(averageResultMap::get).map(res -> String.format("%.2f", res)).toArray(String[]::new));
			chartDTO.setChartOptions(chartOptions);
			chartDTOList.add(chartDTO);
		});
		return chartDTOList;
	}

	public List<ChartDTO> generateCharts (Long userId, Integer times) {
		SurveyInformation surveyInformation = surveyInformationRepository.findByUser_IdAndTimes(userId, times)
				.orElseThrow(RuntimeException::new);

		if (!surveyService.checkUserForAnsweringAllQuestions(surveyInformation)) {
			throw new AllQuestionsNotAnsweredException();
		}

		List<ChartDTO> chartDTOList = new ArrayList<>();

		List<Chart> charts = chartRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
		charts.forEach(chart -> {
			ChartDTO chartDTO = getChartDTO(surveyInformation.getId(), chart);
			chartDTOList.add(chartDTO);
		});
		return chartDTOList;
	}

	public List<Map<String, Map<Integer, Double>>> getAllCompanyFormulaResults(Long companyId) {
		List<User> userList = Constants.ACADEMY_ID.equals(companyId) ?
				userRepository.findAll() : userRepository.findAllByCompany_Id(companyId);
		List<Map<String, Map<Integer, Double>>> result = new ArrayList<>();
		userList.forEach(user -> {
			Map<String, Map<Integer, Double>> r = getAllFormulaResults(user.getId());
			if (!CollectionUtils.isEmpty(r))
				result.add(r);
		});
		return result;
	}

	public Map<String, Map<Integer, Double>> getAllFormulaResults(Long userId) {
		Map<String, Map<Integer, Double>> results = new HashMap<>(); //formula, times, result
		List<SurveyInformation> surveyInformations = surveyInformationRepository.findByUser_Id(userId);
		surveyInformations.forEach(surveyInformation -> {
			Map<String, Double> res = getFormulaResults(surveyInformation.getId());
			for (String key : res.keySet()) {
				Map<Integer, Double> subRes = new TreeMap<>();
				subRes.put(surveyInformation.getTimes(), res.get(key));
				results.put(key, subRes);
			}
		});
		return results;
	}

	private ChartDTO getChartDTO (Long surveyInformationId, Chart chart) {
		ChartDTO chartDTO = new ChartDTO();
		List<Long> formulaIds = Arrays.stream(chart.getVariables().split(",")).map(Long::parseLong).collect(Collectors.toList());
		Map<Long, Double> resultMap = getFormulaResults(surveyInformationId, formulaIds);
		String chartOptions = replaceQuestionMark(chart.getChartOptions(),
				formulaIds.stream().map(resultMap::get).map(res -> String.format("%.2f", res)).toArray(String[]::new));
		chartDTO.setChartOptions(chartOptions);
		return chartDTO;
	}

	private Map<Long, Double> getFormulaResults (Long surveyInformationId, List<Long> formulaIds) {
		List<Formula> formulas = formulaRepository.findByIdIn(formulaIds);
		Map<Long, Double> resultMap = new HashMap<>();
		formulas.forEach(formula -> {
			List<Long> questionIds = Arrays.stream(formula.getVariables().split(",")).map(Long::parseLong).collect(Collectors.toList());
			List<Answer> answerList = answerRepository.findByQuestion_IdInAndSurveyInformation_Id(questionIds, surveyInformationId).orElseThrow(RuntimeException::new);
			Map<Long, Answer> questionAnswerList = answerList.stream().collect(Collectors.toMap(answer -> answer.getQuestion().getId(), Function
					.identity()));
			String expression =  replaceQuestionMark(formula.getFormula(), getAnswerTexts(questionAnswerList, questionIds));
			double result = new Expression(expression).calculate();
			resultMap.put(formula.getId(), result);
		});
		return resultMap;
	}

	private Map<String, Double> getFormulaResults (Long surveyInformationId) {
		List<Formula> formulas = formulaRepository.findAll();
		Map<String, Double> resultMap = new HashMap<>();
		formulas.forEach(formula -> {
			List<Long> questionIds = Arrays.stream(formula.getVariables().split(",")).map(Long::parseLong).collect(Collectors.toList());
			Optional<List<Answer>> answerListOptional = answerRepository.findByQuestion_IdInAndSurveyInformation_Id(questionIds, surveyInformationId);
			if (!answerListOptional.isPresent()) {
				return;
			}
			List<Answer> answerList = answerListOptional.get();
			Map<Long, Answer> questionAnswerList = answerList.stream().collect(Collectors.toMap(answer -> answer.getQuestion().getId(), Function
					.identity()));
			String expression =  replaceQuestionMark(formula.getFormula(), getAnswerTexts(questionAnswerList, questionIds));
			double result = new Expression(expression).calculate();
			resultMap.put(formula.getName(), result);
		});
		return resultMap;
	}

	private String [] getAnswerTexts(Map<Long, Answer> questionAnswerList, List<Long> questionIds) {
		return questionIds.stream()
				.map(questionAnswerList::get)
				.map(answer ->
						!StringUtils.isEmpty(answer.getCustomAnswer()) ?
								answer.getCustomAnswer() : answer.getChoice().getValue()).toArray(String[]::new);
	}

	private String replaceQuestionMark(String str, String [] array) {
		String[] tokens = str.split("\\?");
		str = "";
		for(int i = 0; i < array.length; i++){
			str += tokens[i] + array[i];
		}
		str += tokens[array.length];
		return str;
	}

	public ChartDTO generateBlockChart (Long blockId, Long userId, Integer times) {
		Optional<Block> blockOptional = blockRepository.findById(blockId);
		if (!blockOptional.isPresent())
			throw new RuntimeException("Block Not Found");

		Block block = blockOptional.get();
		if (block.getChart() == null)
			throw new RuntimeException("Chart is null");

		SurveyInformation surveyInformation = surveyInformationRepository.findByUser_IdAndTimes(userId, times)
				.orElseThrow(RuntimeException::new);

		return getChartDTO(surveyInformation.getId(), block.getChart());

	}
}
