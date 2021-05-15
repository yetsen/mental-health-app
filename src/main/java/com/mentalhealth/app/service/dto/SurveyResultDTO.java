package com.mentalhealth.app.service.dto;

import com.mentalhealth.app.domain.Answer;
import com.mentalhealth.app.domain.Choice;
import com.mentalhealth.app.enums.QuestionType;
import lombok.Data;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import java.util.*;

@Data
public class SurveyResultDTO {

    Map<String, String> singleNode = new HashMap<>();
    Map<String, List<String>> singleNodeMultipleAnswer = new HashMap<>();
    Map<String, Map<String, String>> parentNode = new HashMap<>();
    Map<String, Map<String, Map<String, String>>> parentNodeMultipleAnswer = new HashMap<>();

    public SurveyResultDTO (List<Answer> answers) {
        answers.forEach(
            answer -> {
                if (ObjectUtils.isEmpty(answer.getQuestion().getParent())) {
                    if (answer.getQuestion().getType().equals(QuestionType.TEXT) || answer.getQuestion().getType().equals(QuestionType.RATING)) {
                        singleNode.put(answer.getQuestion().getName(), answer.getCustomAnswer());
                    } else if (answer.getQuestion().getType().equals(QuestionType.CHECKBOX)){
                        singleNodeMultipleAnswer.computeIfAbsent(
                            answer.getQuestion().getName(), k -> new ArrayList<>())
                            .add(answer.getChoice().getValue());
                    } else {
                        singleNode.put(answer.getQuestion().getName(), answer.getChoice().getValue());
                    }
                } else if (QuestionType.MATRIX_DROPDOWN.equals(answer.getQuestion().getParent().getType())) {
                    //TODO: this is temporary. It should work on multiple columns for the future
                    Map<String, Map<String, String>> node = parentNodeMultipleAnswer.get(answer.getQuestion().getParent().getName());
                    if (CollectionUtils.isEmpty(node)) {
                        node = new HashMap<>();
                    }
                    Map<String, String> ans = new HashMap<>();
                    Optional<Choice> choiceOptional = answer.getQuestion().getParent().getChoices().stream().findFirst();
                    if (choiceOptional.isPresent()) {
                        ans.put(choiceOptional.get().getName(), answer.getCustomAnswer());
                        node.put(answer.getQuestion().getName(), ans);
                        parentNodeMultipleAnswer.put(answer.getQuestion().getParent().getName(), node);
                    }

                } else {
                    Map<String, String> node = parentNode.get(answer.getQuestion().getParent().getName());
                    if (CollectionUtils.isEmpty(node)) {
                        node = new HashMap<>();
                    }
                    node.put(answer.getQuestion().getName(), answer.getChoice().getValue());
                    parentNode.put(answer.getQuestion().getParent().getName(), node);
                }
            }
        );
    }
}
