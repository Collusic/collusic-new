package com.collusic.collusicbe.domain.genre;

import javax.persistence.*;

@Entity
@Table(name = "GENRE")
public class GenreEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String genre;
}


