package com.mentalhealth.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mentalhealth.app.config.ResultConverter;
import com.mentalhealth.app.service.dto.SurveyInformationDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Map;

@Entity
@Table (name = "survey_information",
		indexes = {
				@Index(name = "si_user_index",  columnList="user_id"),
		})
@Data
@NoArgsConstructor
public class SurveyInformation extends AbstractAuditingEntity implements Serializable {

	@Id
	@GeneratedValue (strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
	@SequenceGenerator (name = "sequenceGenerator")
	private Long id;

	@JsonIgnore
	@ManyToOne
	private User user;

	@Column (name = "times")
	private Integer times;

	@Column(name = "finished")
	private boolean finished;

	@JsonIgnore
	@ManyToOne
	private Survey survey;

	@Column(name = "results", length = 4000)
	@SuppressWarnings("JpaAttributeTypeInspection")
	@Convert(converter = ResultConverter.class)
	private Map<String, Double> results;

	public SurveyInformation(User user, Integer times, Survey survey) {
		this.user = user;
		this.times = times;
		this.survey = survey;
	}
}
