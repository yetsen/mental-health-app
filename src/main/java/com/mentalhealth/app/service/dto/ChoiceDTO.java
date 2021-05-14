package com.mentalhealth.app.service.dto;

import com.mentalhealth.app.domain.Choice;
import com.mentalhealth.app.domain.Question;
import lombok.Data;

@Data
public class ChoiceDTO {

    private String value;
    private String text;
    private String title;
    private String cellType;

    ChoiceDTO(Choice choice) {
        this.value = choice.getValue();
        this.text = choice.getText();
    }

    ChoiceDTO(Question question) {
        this.text = question.getTitle();
        this.value = question.getName();
    }

    ChoiceDTO(Choice choice, boolean isMatrixDropdown) {
        if (isMatrixDropdown) {
            this.title = choice.getText();
            this.cellType = choice.getName();
        } else {
            this.value = choice.getValue();
            this.text = choice.getText();
        }
    }
}
