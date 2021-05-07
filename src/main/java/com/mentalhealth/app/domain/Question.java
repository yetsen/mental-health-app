package com.mentalhealth.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mentalhealth.app.enums.QuestionType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table (name = "question")
@Getter
@Setter
public class Question extends AbstractAuditingEntity implements Serializable {

    @Id
    @GeneratedValue (strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size (max = 255)
    @Column(name = "name")
    private String name;

    @Size (max = 255)
    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private QuestionType type;

    @Size (max = 4000)
    @Column(name = "title", length = 4000)
    private String title;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Choice> choices = new HashSet<>();

    @JsonIgnore
    @ManyToOne
    private Block block;

    @Transient
    private Long parentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="parent_id")
    private Question parent;

    @OneToMany(mappedBy="parent", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval=true)
    private Set<Question> children = new HashSet<>();


}
