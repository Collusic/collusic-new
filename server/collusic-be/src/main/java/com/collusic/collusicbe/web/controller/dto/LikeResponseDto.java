package com.collusic.collusicbe.web.controller.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LikeResponseDto {
    private int likeCount;
    private Boolean isColor;

    public LikeResponseDto(int likeCount, boolean isColor) {
        this.likeCount = likeCount;
        this.isColor = isColor;
    }
}
