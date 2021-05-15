package com.mentalhealth.app.service;

import com.mentalhealth.app.domain.Answer;
import com.mentalhealth.app.domain.Block;
import com.mentalhealth.app.domain.Question;
import com.mentalhealth.app.domain.User;
import com.mentalhealth.app.enums.QuestionType;
import com.mentalhealth.app.repository.*;
import com.mentalhealth.app.repository.*;
import com.mentalhealth.app.service.dto.AnswerDTO;
import com.mentalhealth.app.service.dto.SurveyDTO;
import com.mentalhealth.app.service.dto.SurveyResultDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

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

    private final ChoiceRepository choiceRepository;


    public SurveyService (BlockRepository blockRepository, AnswerRepository answerRepository, UserRepository userRepository, QuestionRepository questionRepository,
        ChoiceRepository choiceRepository) {
        this.blockRepository = blockRepository;
        this.answerRepository = answerRepository;
        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
        this.choiceRepository = choiceRepository;
    }

    public SurveyDTO getSurveyData() {
        List<Block> blocks = getAllBlocks();
        return new SurveyDTO(blocks);
    }

    public SurveyResultDTO getSurveyAnswers(Long userId) {
        return convert(answerRepository.findByUser(
            userRepository.findById(userId).orElseThrow(RuntimeException::new)
        ).orElseThrow(RuntimeException::new));
    }

    private List<Block> getAllBlocks() {
        return blockRepository.findAll();
    }

    public void putAnswers(List<AnswerDTO> answers) {
        answerRepository.saveAll(answers.stream().map(answerDTO -> {
            User user = Optional.of(userRepository
                .findById(answerDTO.getUserId())).get().orElseThrow(RuntimeException::new);

            Question question = Optional.of(questionRepository
                .findByName(answerDTO.getQuestionName())).get().orElseThrow(RuntimeException::new);

            Answer answer = question.getType().equals(QuestionType.CHECKBOX) ?
                answerRepository.findByUserAndQuestionAndChoice_Value(
                    user, question, answerDTO.getChoiceValue())
                    .orElse(new Answer(user, question))
                : answerRepository.findByUserAndQuestion(user, question)
                    .orElse(new Answer(user, question));

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
    }

    public SurveyResultDTO convert(List<Answer> answers) {
        return new SurveyResultDTO(answers);
    }

    public void clearAnswers (Long userId) {
        answerRepository.deleteAnswersByUser(
            userRepository.findById(userId).orElseThrow(RuntimeException::new)
        );
    }
}
