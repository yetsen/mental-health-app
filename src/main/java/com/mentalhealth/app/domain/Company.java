package com.mentalhealth.app.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table (name = "company", indexes = {
		@Index(columnList = "code", name = "company_code_idx")
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
	@Column(name = "code")
	private String code;
}
