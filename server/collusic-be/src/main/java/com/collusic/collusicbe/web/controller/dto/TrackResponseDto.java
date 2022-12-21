package com.collusic.collusicbe.web.controller.dto;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.track.Track;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TrackResponseDto {
    private Long memberId;
    private String nickname;
    private String profileImageUrl;
    private Long trackId;
    private String trackName;
    private String trackTag;
    private String fileUrl;

    @Builder
    public TrackResponseDto(Member member, Track track) {
        this.memberId = member.getId();
        this.nickname = member.getNickname();
        this.profileImageUrl = member.getProfileImageUrl();
        this.trackId = track.getId();
        this.trackName = track.getTrackName();
        this.trackTag = track.getTrackTag().getLabel();
        this.fileUrl = track.getFileUrl();
    }
}
