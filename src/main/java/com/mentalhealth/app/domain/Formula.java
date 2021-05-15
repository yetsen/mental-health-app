package com.mentalhealth.app.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

@Entity
@Table (name = "formula")
@Getter
@Setter
public class Formula extends AbstractAuditingEntity implements Serializable {

    @Id
    @GeneratedValue (strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size (max = 255)
    @Column(name = "name")
    private String name;

    @Size (max = 4000)
    @Column(name = "formula", length = 4000)
    private String formula;

    @Size (max = 4000)
    @Column (name = "variables", length = 4000)
    private String variables;
}
