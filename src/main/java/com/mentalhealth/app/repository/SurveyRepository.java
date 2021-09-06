package com.mentalhealth.app.repository;

import com.mentalhealth.app.domain.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SurveyRepository extends JpaRepository<Survey, Long> {

	@Override List<Survey> findAll ();
}
