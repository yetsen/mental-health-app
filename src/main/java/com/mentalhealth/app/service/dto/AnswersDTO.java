package com.mentalhealth.app.service.dto;

import lombok.Data;

import java.util.List;

@Data
public class AnswersDTO {

	private SurveyInformationDTO surveyInfo;
	private List<AnswerDTO> answers;
}
