package com.collusic.collusicbe.domain.track;

import com.collusic.collusicbe.domain.member.Member;
import com.collusic.collusicbe.domain.member.MemberRepository;
import com.collusic.collusicbe.domain.project.ProjectRepository;
import com.collusic.collusicbe.service.TrackService;
import com.collusic.collusicbe.web.controller.request.TrackCreateRequestDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;

import java.io.IOException;
import java.util.concurrent.CountDownLatch;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("local")
public class TrackServiceWithJpaTest {

    @Autowired
    private TrackService trackService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Test
    @DisplayName("트랙 생성 동시성 테스트 - 동시에 생성 요청이 들어온 경우 최대 10개까지만 생성되어야 한다.")
    public void 동시에_15개의_요청() throws InterruptedException, IOException {
        // given
        Member testMember = memberRepository.getById(1l);

        CountDownLatch countDownLatch = new CountDownLatch(15);

        for (int i = 0; i < 15; i++) {
            String name = String.valueOf(i);
            Thread thread = new Thread(() -> {
                try {
                    TrackCreateRequestDto requestDto = TrackCreateRequestDto.builder()
                                                                            .trackName("test track name" + name)
                                                                            .trackTag("피아노")
                                                                            .audioFile(new MockMultipartFile("test", new byte[]{}))
                                                                            .build();
                    trackService.create(testMember, 5l, requestDto);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                countDownLatch.countDown();
            });

            thread.start();
        }

        countDownLatch.await();
        projectRepository.findById(5l).get().getTracks().forEach(x -> System.out.println(x.getTrackName()));
        assertThat(projectRepository.findById(5l).get().getTracks().size()).isEqualTo(10);
        assertThat(projectRepository.findById(5l).get().isTrackFull()).isTrue();
    }
}
