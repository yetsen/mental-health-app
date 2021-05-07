package com.mentalhealth.app.enums;

import lombok.Getter;

@Getter
public enum QuestionType {
    CHECKBOX("checkbox"),
    DROPDOWN("dropdown"),
    RADIOGROUP("radiogroup"),
    MATRIX("matrix"),
    SUB_MATRIX("submatrix"),
    TEXT("text");

    private String value;

    QuestionType (String checkbox) {
        this.value = checkbox;
    }
}
