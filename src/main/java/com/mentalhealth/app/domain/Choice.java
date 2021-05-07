package com.mentalhealth.app.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table (name = "choice")
@Getter
@Setter
public class Choice extends AbstractAuditingEntity implements Serializable {

    @Id
    @GeneratedValue (strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size (max = 255)
    @Column(name = "name")
    private String name;

    @Size (max = 255)
    @Column(name = "value")
    private String value;

    @Size (max = 4000)
    @Column (name = "text", length = 4000)
    private String text;
}
