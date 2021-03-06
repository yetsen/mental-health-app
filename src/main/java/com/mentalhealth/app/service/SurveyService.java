package com.mentalhealth.app.service;

import com.mentalhealth.app.config.Constants;
import com.mentalhealth.app.domain.*;
import com.mentalhealth.app.enums.QuestionType;
import com.mentalhealth.app.repository.*;
import com.mentalhealth.app.service.dto.AnswersDTO;
import com.mentalhealth.app.service.dto.SurveyDTO;
import com.mentalhealth.app.service.dto.SurveyResultDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class SurveyService {

    private final BlockRepository blockRepository;

    private final AnswerRepository answerRepository;

    private final UserRepository userRepository;

    private final QuestionRepository questionRepository;

    private final SurveyInformationRepository surveyInformationRepository;

    private final SurveyRepository surveyRepository;

    private final ChartService chartService;


    public SurveyService (BlockRepository blockRepository, AnswerRepository answerRepository, UserRepository userRepository,
            QuestionRepository questionRepository, SurveyInformationRepository surveyInformationRepository,
            SurveyRepository surveyRepository, ChartService chartService) {
        this.blockRepository = blockRepository;
        this.answerRepository = answerRepository;
        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
        this.surveyInformationRepository = surveyInformationRepository;
        this.surveyRepository = surveyRepository;
        this.chartService = chartService;
    }

    public Map<Long, SurveyDTO> getSurveyData() {
        List<Survey> surveys = surveyRepository.findAll();
        return surveys.stream().collect(
                Collectors.toMap(Survey::getId, survey ->
                        new SurveyDTO(blockRepository.findBySurvey_Id(survey.getId()))));
    }

    public SurveyDTO getSurveyData(Long surveyId) {
        List<Block> blocks = getBlocks(surveyId);
        return new SurveyDTO(blocks);
    }

    public SurveyResultDTO getSurveyAnswers(Long userId, Integer times, Long surveyId) {
        Optional<SurveyInformation> surveyInformationOptional = surveyInformationRepository.findByUser_IdAndTimesAndSurvey_Id(userId, times, surveyId);
        if (surveyInformationOptional.isPresent()) {
            return convert(answerRepository.findBySurveyInformation(surveyInformationOptional.get()).orElseThrow(RuntimeException::new));
        } else {
            SurveyInformation surveyInformation = surveyInformationRepository
                    .findByUser_IdAndTimesAndSurvey_Id(userId, 1, surveyId).orElseThrow(RuntimeException::new);
            Block introductionBlock = blockRepository.findBySurvey_IdAndName(surveyId, "Introduction"); //TODO: Change It Introduction always same
            return convert(answerRepository.findBySurveyInformationAndQuestion_IdIn(surveyInformation, introductionBlock.getQuestions()
                    .stream().map(Question::getId).collect(Collectors.toList())).orElseThrow(RuntimeException::new));
        }
    }

    private List<Block> getAllBlocks() {
        return blockRepository.findAll();
    }

    private List<Block> getBlocks(Long surveyId) {
        return blockRepository.findBySurvey_Id(surveyId);
    }

    public void putAnswers(AnswersDTO answers) {
        if (ObjectUtils.isEmpty(answers)
                || CollectionUtils.isEmpty(answers.getAnswers())
                || ObjectUtils.isEmpty(answers.getSurveyInfo())) {
            return;
        }
        User user = Optional.of(userRepository
                .findById(answers.getSurveyInfo().getUserId())).get().orElseThrow(RuntimeException::new);

        Optional<SurveyInformation> surveyInformationOptional = surveyInformationRepository
                .findByUser_IdAndTimesAndSurvey_Id(answers.getSurveyInfo().getUserId(),
                        answers.getSurveyInfo().getTimes(), answers.getSurveyInfo()
                        .getSurveyId());

        SurveyInformation surveyInformation = surveyInformationOptional
                .orElseGet(() -> {
                    Survey survey = Optional.of(surveyRepository
                            .findById(answers.getSurveyInfo().getSurveyId())).get().orElseThrow(RuntimeException::new);
                    return surveyInformationRepository.save(new SurveyInformation(user, answers.getSurveyInfo().getTimes(), survey));
                });

        answerRepository.saveAll(answers.getAnswers().stream().map(answerDTO -> {
            Question question = Optional.of(questionRepository
                .findByName(answerDTO.getQuestionName())).get().orElseThrow(RuntimeException::new);

            Answer answer = question.getType().equals(QuestionType.CHECKBOX) ?
                answerRepository.findByQuestionAndChoice_ValueAndSurveyInformation(question, answerDTO.getChoiceValue(), surveyInformation)
                    .orElse(new Answer(surveyInformation, question))
                : answerRepository.findByQuestionAndSurveyInformation(question, surveyInformation)
                    .orElse(new Answer(surveyInformation, question));

            if (question.getType().equals(QuestionType.TEXT) || question.getType().equals(QuestionType.RATING) ||
                    (!ObjectUtils.isEmpty(question.getParent()) && QuestionType.MATRIX_DROPDOWN.equals(question.getParent().getType()))) {
                answer.setCustomAnswer(answerDTO.getChoiceValue());
                return answer;
            }

            answer.setChoice(Optional.ofNullable(question.getParent())
                .orElse(question).getChoices().stream()
                .filter(choice -> choice.getValue().equals(answerDTO.getChoiceValue()))
                .findFirst().orElseThrow(RuntimeException::new));

            return answer;
        }).collect(Collectors.toList()));

        if (answers.getSurveyInfo().isFinished()) {
            surveyInformation.setFinished(true);
            surveyInformation.setResults(chartService.getFormulaResults(surveyInformation));
            surveyInformationRepository.save(surveyInformation);
        }
    }

    public boolean checkUserForAnsweringAllQuestions(Long userId, Integer times, Long surveyId) {
        SurveyInformation surveyInformation = surveyInformationRepository.findByUser_IdAndTimesAndSurvey_Id(userId, times, surveyId)
                .orElseThrow(RuntimeException::new);
        return surveyInformation.isFinished();
    }

    public boolean checkUserForAnsweringAllQuestions (SurveyInformation surveyInformation) {
        if (surveyInformation.isFinished())
            return true;
        long answeredQuestionsSize = answerRepository.countAnswersBySurveyInformation(surveyInformation);
        List<Block> blockList = blockRepository.findBySurvey_Id(2L); //TODO change static 2
        long allQuestionsSize = questionRepository.countAllByTypeNotInAndBlockIn(Arrays.asList(QuestionType.MATRIX_DROPDOWN, QuestionType.MATRIX), blockList);

        if (allQuestionsSize == answeredQuestionsSize) {
            surveyInformation.setFinished(true);
            surveyInformationRepository.save(surveyInformation);
            return true;
        }
        return false;
    }

    public SurveyResultDTO convert(List<Answer> answers) {
        return new SurveyResultDTO(answers);
    }

    public void clearAnswers (Long userId, Integer times, Long surveyId) {
        SurveyInformation surveyInformation = surveyInformationRepository.findByUser_IdAndTimesAndSurvey_Id(userId, times, surveyId)
                .orElseThrow(RuntimeException::new);
        answerRepository.deleteAnswersBySurveyInformation_Id(surveyInformation.getId());
        surveyInformationRepository.delete(surveyInformation);
    }

    public List<SurveyInformation> getSurveyInformationByUserId (Long userId) {
        return surveyInformationRepository.findByUser_IdOrderByTimesAsc(userId);

    }

    public Map<Integer, List<SurveyInformation>> getCompanySurveyInformationByCompanyId (Long companyId) {
        List<User> companyUsers = Constants.ACADEMY_ID.equals(companyId) ?
                userRepository.findAllByIsEmployer(false) : userRepository.findAllByCompany_IdAndIsEmployer(companyId, false);

        if (CollectionUtils.isEmpty(companyUsers))
            throw new RuntimeException("User Not Found!!");

        List<SurveyInformation> surveyInformationList = surveyInformationRepository.findByUser_IdInOrderByTimesAsc(
                companyUsers.stream().map(User::getId).collect(Collectors.toList()));
        return surveyInformationList.stream().collect(Collectors.groupingBy(SurveyInformation::getTimes,
                TreeMap::new, Collectors.toCollection(ArrayList::new)));

    }
}
