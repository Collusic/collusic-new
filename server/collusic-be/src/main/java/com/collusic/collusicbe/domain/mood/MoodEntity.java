package com.collusic.collusicbe.domain.mood;

import javax.persistence.*;

@Entity
@Table(name = "MOOD")
public class MoodEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Mood mood;
}
