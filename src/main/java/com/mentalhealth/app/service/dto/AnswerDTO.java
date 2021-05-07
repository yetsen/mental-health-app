package com.mentalhealth.app.service.dto;

import lombok.Data;

@Data
public class AnswerDTO {
    private Long userId;
    private String questionName;
    private String choiceValue;
}
