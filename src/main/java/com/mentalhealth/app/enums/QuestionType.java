package com.mentalhealth.app.enums;

import lombok.Getter;

@Getter
public enum QuestionType {
    CHECKBOX("checkbox"),
    DROPDOWN("dropdown"),
    RADIOGROUP("radiogroup"),
    MATRIX("matrix"),
    SUB_MATRIX("submatrix"),
    RATING("rating"),
    MATRIX_DROPDOWN("matrixdropdown"),
    TEXT("text");

    private String value;

    QuestionType (String value) {
        this.value = value;
    }
}
