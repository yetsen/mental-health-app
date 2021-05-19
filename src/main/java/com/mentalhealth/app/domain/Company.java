package com.mentalhealth.app.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table (name = "company", indexes = {
		@Index(columnList = "employee_code", name = "company_employee_code_idx"),
		@Index(columnList = "employer_code", name = "company_employer_code_idx")
})
@Getter
@Setter
public class Company  extends AbstractAuditingEntity implements Serializable {
	@Id
	@GeneratedValue (strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
	@SequenceGenerator(name = "sequenceGenerator")
	private Long id;

	@Size (max = 255)
	@Column(name = "name")
	private String name;

	@Size (max = 255)
	@Column(name = "employee_code")
	private String employeeCode;


	@Size (max = 255)
	@Column(name = "employer_code")
	private String employerCode;
}
