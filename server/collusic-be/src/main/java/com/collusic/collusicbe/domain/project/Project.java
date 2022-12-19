package com.collusic.collusicbe.domain.project;

import com.collusic.collusicbe.domain.BaseTimeEntity;
import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.track.Track;
import com.collusic.collusicbe.domain.track.TrackTag;
import com.collusic.collusicbe.global.exception.CannotDeleteException;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

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

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Track> tracks = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectLike> likes = new ArrayList<>();

    private static final int MAX_TRACK_CAPACITY = 10;

    @Builder
    public Project(Long id, String projectName, int bpm, String fileUrl) {
        this.id = id;
        this.projectName = projectName;
        this.bpm = bpm;
        this.fileUrl = fileUrl;
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
        track.setProject(this);
        this.tracks.add(track);
    }

    public Track getTrack(long trackId) {
        this.tracks.sort(Comparator.comparingInt(Track::getOrderInProject));

        return tracks.stream()
                     .filter(track -> track.getId().equals(trackId))
                     .findFirst()
                     .orElseThrow(NoSuchElementException::new);
    }

    public void removeTrack(long trackId) {
        Track track = tracks.stream()
                            .filter(t -> t.getId().equals(trackId))
                            .findFirst()
                            .orElseThrow(NoSuchElementException::new);

        tracks.remove(track);

        for (int i = 0; i < tracks.size(); i++) {
            track = tracks.get(i);
            track.changeOrder(i);
        }
    }

    public List<String> collectTrackTags() {
        this.tracks.sort(Comparator.comparingInt(Track::getOrderInProject));

        return tracks.stream()
                     .map(track -> track.getTrackTag().getLabel())
                     .collect(Collectors.toList());
    }

    public void addLike(ProjectLike projectLike) {
        getLikes().add(projectLike);
    }

    public void deleteLike(ProjectLike projectLike) {
        getLikes().remove(projectLike);
    }

    public void update(String projectName, TrackTag trackTag) {
        this.projectName = projectName;
        this.tracks.get(0).changeTrackInfo(projectName, trackTag);
    }

    public void checkDeletable(Member member) {
        for (Track track : tracks) {
            if (!(track.isDeleted() || track.hasSameCreator((member)))) {
                throw new CannotDeleteException("다른 사용자의 트랙이 있는 경우, 프로젝트를 삭제할 수 없습니다.");
            }
        }
    }
}
