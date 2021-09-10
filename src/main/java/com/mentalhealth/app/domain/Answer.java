package com.mentalhealth.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;

@Entity
@Table (name = "answer",
        indexes = {
            @Index(name = "answer_question_index",  columnList="question_id"),
            @Index(name = "answer_si_index", columnList="survey_information_id"),
            @Index(name = "answer_q_si_index", columnList="question_id, survey_information_id", unique = true),
        })
@Data
@NoArgsConstructor
public class Answer extends AbstractAuditingEntity implements Serializable {

    @Id
    @GeneratedValue (strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @JsonIgnore
    @ManyToOne
    private SurveyInformation surveyInformation;

    @JsonIgnore
    @ManyToOne
    private Question question;

    @JsonIgnore
    @ManyToOne
    private Choice choice;

    @Size (max = 4000)
    @Column(name = "customAnswer", length = 4000)
    private String customAnswer;

    public Answer (SurveyInformation surveyInformation, Question question) {
        this.surveyInformation = surveyInformation;
        this.question = question;
    }
}
