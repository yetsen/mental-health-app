package com.mentalhealth.app.repository;

import com.mentalhealth.app.domain.Formula;
import com.mentalhealth.app.domain.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FormulaRepository extends JpaRepository<Formula, Long> {

	List<Formula> findByIdIn(List<Long> idList);

	List<Formula> findBySurvey(Survey survey);
}
