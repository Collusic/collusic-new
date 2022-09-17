package com.collusic.collusicbe.domain.field;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "CONTRIBUTE_PROJECT_FIELD")
@Getter
public class ContributeProjectFieldEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String field;

    public ContributeProjectFieldEntity(String field) {
        this.field = field;
    }
}
