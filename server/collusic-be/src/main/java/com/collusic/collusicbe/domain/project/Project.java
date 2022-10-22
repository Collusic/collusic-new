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
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

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
    private List<Track> tracks = new ArrayList<>();

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
        if (tracks == null) {
            return 0;
        }
        return tracks.size();
    }

    public boolean isLastTrackId(Long trackId) {
        return tracks.get(tracks.size() - 1).getId().equals(trackId);
    }

    public void addTrack(Track track) {
        this.tracks.add(track);
    }

    public Track getTrack(long trackId) {
        return tracks.stream()
                     .filter(track -> track.getId().equals(trackId))
                     .findFirst()
                     .orElseThrow(NoSuchElementException::new);
    }

    public void removeTrack(int order) {
        tracks.remove(order);

        for (int i = order; i < tracks.size(); i++) {
            Track track = tracks.get(i);
            track.changeOrder(i);
        }
    }
}
