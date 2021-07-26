package com.mentalhealth.app.service;

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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class SurveyService {

    private final BlockRepository blockRepository;

    private final AnswerRepository answerRepository;

    private final UserRepository userRepository;

    private final QuestionRepository questionRepository;

    private final SurveyInformationRepository surveyInformationRepository;


    public SurveyService (BlockRepository blockRepository, AnswerRepository answerRepository, UserRepository userRepository,
            QuestionRepository questionRepository, SurveyInformationRepository surveyInformationRepository) {
        this.blockRepository = blockRepository;
        this.answerRepository = answerRepository;
        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
        this.surveyInformationRepository = surveyInformationRepository;
    }

    public SurveyDTO getSurveyData() {
        List<Block> blocks = getAllBlocks();
        return new SurveyDTO(blocks);
    }

    public SurveyResultDTO getSurveyAnswers(Long userId, Integer times) {
        SurveyInformation surveyInformation = surveyInformationRepository.findByUser_IdAndTimes(userId, times).orElseThrow(RuntimeException::new);
        checkUserForAnsweringAllQuestions(surveyInformation);
        return convert(answerRepository.findBySurveyInformation(surveyInformation).orElseThrow(RuntimeException::new));
    }

    private List<Block> getAllBlocks() {
        return blockRepository.findAll();
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
                .findByUser_IdAndTimes(answers.getSurveyInfo().getUserId(), answers.getSurveyInfo().getTimes());

        SurveyInformation surveyInformation = surveyInformationOptional
                .orElseGet(() -> surveyInformationRepository.save(new SurveyInformation(user, answers.getSurveyInfo().getTimes())));

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

        checkUserForAnsweringAllQuestions(surveyInformation);
    }

    public boolean checkUserForAnsweringAllQuestions(Long surveyInformationId) {
        SurveyInformation surveyInformation = surveyInformationRepository.findById(surveyInformationId).orElseThrow(RuntimeException::new);
        if (surveyInformation.isFinished())
            return true;
        return checkUserForAnsweringAllQuestions(surveyInformation);
    }

    public boolean checkUserForAnsweringAllQuestions(Long userId, Integer times) {
        SurveyInformation surveyInformation = surveyInformationRepository.findByUser_IdAndTimes(userId, times).orElseThrow(RuntimeException::new);
        if (surveyInformation.isFinished())
            return true;
        return checkUserForAnsweringAllQuestions(surveyInformation);
    }

    public boolean checkUserForAnsweringAllQuestions (SurveyInformation surveyInformation) {
        if (surveyInformation.isFinished())
            return true;
        long answeredQuestionsSize = answerRepository.countAnswersBySurveyInformation(surveyInformation);
        long allQuestionsSize = questionRepository.countAllByTypeNotIn(Arrays.asList(QuestionType.MATRIX_DROPDOWN, QuestionType.MATRIX));

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

    public void clearAnswers (Long userId, Integer times) {
        SurveyInformation surveyInformation = surveyInformationRepository.findByUser_IdAndTimes(userId, times).orElseThrow(RuntimeException::new);
        answerRepository.deleteAnswersBySurveyInformation_Id(surveyInformation.getId());
        surveyInformation.setFinished(false);
        surveyInformationRepository.save(surveyInformation);
    }

    public List<Integer> getTimesByUserId (Long userId) {
        List<SurveyInformation> surveyInformations = surveyInformationRepository.findByUser_IdOrderByTimesDesc(userId);
        if (CollectionUtils.isEmpty(surveyInformations))
            return new ArrayList<>();
        return surveyInformations.stream().map(SurveyInformation::getTimes).collect(Collectors.toList());

    }
}
