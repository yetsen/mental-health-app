package com.mentalhealth.app.service;

public class AllQuestionsNotAnsweredException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public AllQuestionsNotAnsweredException () {
		super("Please answer all questions before entering dashboard!");
	}
}
