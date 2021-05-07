package com.mentalhealth.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table (name = "answer")
@Data
@NoArgsConstructor
public class Answer {

    @Id
    @GeneratedValue (strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @JsonIgnore
    @ManyToOne
    private User user;

    @JsonIgnore
    @ManyToOne
    private Question question;

    @JsonIgnore
    @ManyToOne
    private Choice choice;

    @Size (max = 4000)
    @Column(name = "customAnswer", length = 4000)
    private String customAnswer;

    public Answer (User user, Question question) {
        this.user = user;
        this.question = question;
    }
}
