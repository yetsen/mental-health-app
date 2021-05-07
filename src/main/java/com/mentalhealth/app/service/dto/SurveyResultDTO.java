package com.mentalhealth.app.service.dto;

import com.mentalhealth.app.domain.Answer;
import com.mentalhealth.app.enums.QuestionType;
import lombok.Data;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class SurveyResultDTO {

    Map<String, String> singleNode = new HashMap<>();
    Map<String, List<String>> singleNodeMultipleAnswer = new HashMap<>();
    Map<String, Map<String, String>> parentNode = new HashMap<>();

    public SurveyResultDTO (List<Answer> answers) {
        answers.forEach(
            answer -> {
                if (ObjectUtils.isEmpty(answer.getQuestion().getParent())) {
                    if (answer.getQuestion().getType().equals(QuestionType.TEXT)) {
                        singleNode.put(answer.getQuestion().getName(), answer.getCustomAnswer());
                    } else if (answer.getQuestion().getType().equals(QuestionType.CHECKBOX)){
                        singleNodeMultipleAnswer.computeIfAbsent(
                            answer.getQuestion().getName(), k -> new ArrayList<>())
                            .add(answer.getChoice().getValue());
                    } else {
                        singleNode.put(answer.getQuestion().getName(), answer.getChoice().getValue());
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
