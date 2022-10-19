package com.collusic.collusicbe.domain.project;

import com.collusic.collusicbe.domain.BaseTimeEntity;
import com.collusic.collusicbe.domain.state.State;
import com.collusic.collusicbe.domain.track.Track;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Project extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PROJECT_ID")
    private Long id;

    @Size(min = 1, max = 20)
    @Column(length = 20, nullable = false)
    private String projectName;

    @Column(nullable = false)
    @Min(30)
    @Max(240)
    private int bpm;

    @Column(nullable = false)
    private String fileUrl;

    @Enumerated(EnumType.STRING)
    private State projectState;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Track> tracks;

    private static final int MAX_TRACK_CAPACITY = 10;

    @Builder
    public Project(Long id, String projectName, int bpm, String fileUrl, State projectState, List<Track> tracks) {
        this.id = id;
        this.projectName = projectName;
        this.bpm = bpm;
        this.fileUrl = fileUrl;
        this.projectState = projectState;
        this.tracks = tracks;
    }

    public boolean isTrackFull() {
        return tracks.size() == MAX_TRACK_CAPACITY;
    }

    public int getNextTrackOrder() {
        return tracks.size();
    }
}
