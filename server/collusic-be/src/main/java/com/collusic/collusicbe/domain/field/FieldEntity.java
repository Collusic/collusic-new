package com.collusic.collusicbe.domain.field;

import javax.persistence.*;

@Entity
@Table(name = "FIELD")
public class FieldEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Field field;

}
