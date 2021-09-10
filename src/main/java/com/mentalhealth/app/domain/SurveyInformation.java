package com.mentalhealth.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mentalhealth.app.service.dto.SurveyInformationDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

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

	public SurveyInformation(User user, Integer times) {
		this.user = user;
		this.times = times;
	}
}
