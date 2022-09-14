package com.collusic.collusicbe.domain.mood;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "MOOD")
public class MoodEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mood;

    public MoodEntity(String mood) {
        this.mood = mood;
    }
}
