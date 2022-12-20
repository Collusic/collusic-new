package com.collusic.collusicbe.web.controller.dto;

import com.collusic.collusicbe.domain.track.TrackTag;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
public class TrackCreateRequestDto {

    @NotBlank
    @Size(min = 1, max = 20, message = "트랙 명은 1자 이상 20자 이내로 한다.")
    private String trackName;
    @NotNull
    private TrackTag trackTag;

    private MultipartFile audioFile;

    @Builder
    public TrackCreateRequestDto(String trackName, String trackTag, MultipartFile audioFile) {
        this.trackName = trackName;
        this.trackTag = TrackTag.valueOfLabel(trackTag);
        this.audioFile = audioFile;
    }

    public void setTrackTag(String trackTag) {
        this.trackTag = TrackTag.valueOfLabel(trackTag);
    }
}
