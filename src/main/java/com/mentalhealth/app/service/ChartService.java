package com.mentalhealth.app.service;

import com.google.common.base.Functions;
import com.google.common.collect.Collections2;
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

	private final FormulaRepository formulaRepository;

	private final AnswerRepository answerRepository;

	private final UserRepository userRepository;

	private final SurveyInformationRepository surveyInformationRepository;

	public ChartService (FormulaRepository formulaRepository, AnswerRepository answerRepository, UserRepository userRepository,
			SurveyInformationRepository surveyInformationRepository) {
		this.formulaRepository = formulaRepository;
		this.answerRepository = answerRepository;
		this.userRepository = userRepository;
		this.surveyInformationRepository = surveyInformationRepository;
	}

	public List<Map<String, Map<Integer, Double>>> getAllCompanyFormulaResults(Long companyId) {
		List<User> userList = Constants.ACADEMY_ID.equals(companyId) ?
				userRepository.findAll() : userRepository.findAllByCompany_IdAndIsEmployer(companyId, false);
		return getAllFormulaResults(userList);
	}

	public List<Map<String, Map<Integer, Double>>> getAllFormulaResults(List<User> userList) {
		List<Map<String, Map<Integer, Double>>> allResults = new ArrayList<>(); //formula, times, result

		List<SurveyInformation> surveyInformations = surveyInformationRepository.findByUserIn(userList);

		Map<User, List<SurveyInformation>> surveyInformationMap = surveyInformations.stream()
				.collect(Collectors.groupingBy(SurveyInformation::getUser,
						Collectors.toList()));

		surveyInformationMap.forEach((key, value) -> {
			Map<String, Map<Integer, Double>> r = new LinkedHashMap<>();

			value.stream().filter(SurveyInformation::isFinished).forEach(surveyInformation -> {
				Map<String, Double> subRes = surveyInformation.getResults();
				if (CollectionUtils.isEmpty(subRes)) {
					subRes = getFormulaResults(surveyInformation);
					surveyInformation.setResults(subRes);
					surveyInformationRepository.save(surveyInformation);
				}
				final Map<String, Double> finalSubRes = subRes;
				subRes.keySet().forEach(formulaName -> {
					Map<Integer, Double> existingTimesResultMap = r.getOrDefault(formulaName, new TreeMap<>());
					existingTimesResultMap.put(surveyInformation.getTimes(), finalSubRes.get(formulaName));
					r.put(formulaName, existingTimesResultMap);
				});
			});
			if (!CollectionUtils.isEmpty(r))
				allResults.add(r);
		});

		return allResults;

	}

	public Map<String, Map<Integer, Double>> getAllFormulaResults(Long userId) {
		Map<String, Map<Integer, Double>> results = new LinkedHashMap<>(); //formula, times, result
		List<SurveyInformation> surveyInformations = surveyInformationRepository.findByUser_Id(userId);
		surveyInformations.forEach(surveyInformation -> {
			if (!surveyInformation.isFinished())
				return;
			Map<String, Double> res = surveyInformation.getResults();
			if (CollectionUtils.isEmpty(res)) {
				res = getFormulaResults(surveyInformation);
				surveyInformation.setResults(res);
				surveyInformationRepository.save(surveyInformation);
			}
			for (String key : res.keySet()) {
				Map<Integer, Double> subRes = results.getOrDefault(key, new TreeMap<>());
				subRes.put(surveyInformation.getTimes(), res.get(key));
				results.put(key, subRes);
			}
		});
		return results;
	}

	public Map<String, Double> getFormulaResults (SurveyInformation surveyInformation) {
		List<Formula> formulas = formulaRepository.findBySurveyOrderByOrderAscIdAsc(surveyInformation.getSurvey());
		Map<String, Double> resultMap = new LinkedHashMap<>();
		formulas.forEach(formula -> {
			List<Long> questionIds = Arrays.stream(formula.getVariables().split(",")).map(Long::parseLong).collect(Collectors.toList());
			Optional<List<Answer>> answerListOptional = answerRepository.findByQuestion_IdInAndSurveyInformation_Id(questionIds, surveyInformation.getId());
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

}
