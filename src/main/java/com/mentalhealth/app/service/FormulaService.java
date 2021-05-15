package com.mentalhealth.app.service;

import com.mentalhealth.app.repository.FormulaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class FormulaService {

	private final FormulaRepository formulaRepository;

	public FormulaService (FormulaRepository formulaRepository) {
		this.formulaRepository = formulaRepository;
	}
}
