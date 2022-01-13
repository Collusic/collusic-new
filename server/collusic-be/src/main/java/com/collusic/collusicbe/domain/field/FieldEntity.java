package com.collusic.collusicbe.domain.field;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "FIELD")
@Getter
public class FieldEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String field;

    public FieldEntity(String field) {
        this.field = field;
    }
}
