package com.mentalhealth.app.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table (name = "chart")
@Getter
@Setter
public class Chart extends AbstractAuditingEntity implements Serializable {

	@Id
	@GeneratedValue (strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
	@SequenceGenerator(name = "sequenceGenerator")
	private Long id;

	@Size (max = 255)
	@Column(name = "name")
	private String name;

	@Size (max = 4000)
	@Column(name = "chart_options", length = 4000)
	private String chartOptions;

	@Size (max = 4000)
	@Column (name = "variables", length = 4000)
	private String variables;
}
