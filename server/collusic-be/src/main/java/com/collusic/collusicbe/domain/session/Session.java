package com.collusic.collusicbe.domain.session;

import com.collusic.collusicbe.domain.track.Track;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SESSION_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TRACK_ID")
    private Track track;

    @Column(nullable = false)
    private float startMeasure;

    @Column(nullable = false)
    private float endMeasure;
}
