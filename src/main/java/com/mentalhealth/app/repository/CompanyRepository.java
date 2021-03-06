package com.mentalhealth.app.repository;

import com.mentalhealth.app.domain.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository  extends JpaRepository<Company, Long> {

	Optional<Company> findByEmployeeCode(String code);

	Optional<Company> findByEmployerCode(String code);
}
