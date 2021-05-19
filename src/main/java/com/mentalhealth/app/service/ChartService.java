package com.mentalhealth.app.service;

import com.mentalhealth.app.domain.Answer;
import com.mentalhealth.app.domain.Chart;
import com.mentalhealth.app.domain.Formula;
import com.mentalhealth.app.domain.User;
import com.mentalhealth.app.repository.AnswerRepository;
import com.mentalhealth.app.repository.ChartRepository;
import com.mentalhealth.app.repository.FormulaRepository;
import com.mentalhealth.app.repository.UserRepository;
import com.mentalhealth.app.service.dto.ChartDTO;
import org.mariuszgromada.math.mxparser.Expression;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

	public ChartService (ChartRepository chartRepository, FormulaRepository formulaRepository, AnswerRepository answerRepository,
			UserRepository userRepository, SurveyService surveyService) {
		this.chartRepository = chartRepository;
		this.formulaRepository = formulaRepository;
		this.answerRepository = answerRepository;
		this.userRepository = userRepository;
		this.surveyService = surveyService;
	}

	public List<ChartDTO> generateCompanyCharts (Long companyId) {
		List<User> userList = userRepository.findAllByCompany_Id(companyId);
		List<Chart> charts = chartRepository.findAll();
		List<ChartDTO> chartDTOList = new ArrayList<>();
		charts.sort(Comparator.comparing(Chart::getId));
		charts.forEach(chart -> {
			ChartDTO chartDTO = new ChartDTO();
			List<Long> formulaIds = Arrays.stream(chart.getVariables().split(",")).map(Long::parseLong).collect(Collectors.toList());
			Map<Long, Double> averageResultMap = new HashMap<>();
			AtomicInteger userCount = new AtomicInteger();
			userList.forEach(user -> {
				if (surveyService.checkUserForAnsweringAllQuestions(user)) {
					Map<Long, Double> resultMap = getFormulaResults(user.getId(), formulaIds);
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

	public List<ChartDTO> generateCharts (Long userId) {

		if (!surveyService.checkUserForAnsweringAllQuestions(userId)) {
			throw new AllQuestionsNotAnsweredException();
		}

		List<ChartDTO> chartDTOList = new ArrayList<>();

		List<Chart> charts = chartRepository.findAll();
		charts.sort(Comparator.comparing(Chart::getId));
		charts.forEach(chart -> {
			ChartDTO chartDTO = getChartDTO(userId, chart);
			chartDTOList.add(chartDTO);
		});
		return chartDTOList;
	}

	private ChartDTO getChartDTO (Long userId, Chart chart) {
		ChartDTO chartDTO = new ChartDTO();
		List<Long> formulaIds = Arrays.stream(chart.getVariables().split(",")).map(Long::parseLong).collect(Collectors.toList());
		Map<Long, Double> resultMap = getFormulaResults(userId, formulaIds);
		String chartOptions = replaceQuestionMark(chart.getChartOptions(),
				formulaIds.stream().map(resultMap::get).map(res -> String.format("%.2f", res)).toArray(String[]::new));
		chartDTO.setChartOptions(chartOptions);
		return chartDTO;
	}

	private Map<Long, Double> getFormulaResults (Long userId, List<Long> formulaIds) {
		List<Formula> formulas = formulaRepository.findByIdIn(formulaIds);
		Map<Long, Double> resultMap = new HashMap<>();
		formulas.forEach(formula -> {
			List<Long> questionIds = Arrays.stream(formula.getVariables().split(",")).map(Long::parseLong).collect(Collectors.toList());
			List<Answer> answerList = answerRepository.findByUser_IdAndQuestion_IdIn(userId, questionIds).orElseThrow(RuntimeException::new);
			Map<Long, Answer> questionAnswerList = answerList.stream().collect(Collectors.toMap(answer -> answer.getQuestion().getId(), Function
					.identity()));
			String expression =  replaceQuestionMark(formula.getFormula(), getAnswerTexts(questionAnswerList, questionIds));
			double result = new Expression(expression).calculate();
			resultMap.put(formula.getId(), result);
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
}
