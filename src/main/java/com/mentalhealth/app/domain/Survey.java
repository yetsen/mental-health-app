package com.mentalhealth.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table (name = "survey")
@Getter
@Setter
public class Survey {

	@Id
	@GeneratedValue (strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
	@SequenceGenerator (name = "sequenceGenerator")
	private Long id;

	@Size (max = 255)
	@Column (name = "name")
	private String name;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "survey")
	private Set<Block> blocks = new HashSet<>();
}
