import React, { useState, useEffect } from "react";
import styled from "./styled";
import axios from "axios";
import UserImg from "assets/profile.png";
import fieldMelody from "assets/fieldMelody.png";
import fieldInstrument from "assets/fieldInstrument.png";
import fieldLyric from "assets/fieldLyric.png";
import audio from "assets/전상근_내방.mp3";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Icon } from "@iconify/react";
import playCircle from "@iconify-icons/mdi/play-circle";
import pauseCircle from "@iconify-icons/mdi/pause-circle";
import useLastLocationHistory from "lib/history";
import API from "data/http/axios/api";

const text = "Preview Lrics,";

function Project() {
  const setHistory = useLastLocationHistory();
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const readRequestProjects = async () => {
      try {
        setError(null);
        setProjects(null);
        setLoading(true);
        const { data } = await API.get("/requestprojects");
        setProjects(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    readRequestProjects();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!projects) return null;

  return (
    <>
      {projects.map((project) => (
        <styled.ProjectBox>
          <styled.Project>
            <div
              onClick={() => {
                setHistory("/requestprojects/" + project.id);
              }}
            >
              <styled.ProjectUserId key={project.id}>
                <styled.ProjectUserImg src={UserImg}></styled.ProjectUserImg>{" "}
                {project.username}
              </styled.ProjectUserId>
              <styled.ProjectTitle>{project.email}</styled.ProjectTitle>
              <styled.ProjectField>
                {true ? (
                  <styled.FieldMelody src={fieldMelody}></styled.FieldMelody>
                ) : null}
                {true ? (
                  <styled.FieldInstrument
                    src={fieldInstrument}
                  ></styled.FieldInstrument>
                ) : null}
                {true ? (
                  <styled.FieldLyric src={fieldLyric}></styled.FieldLyric>
                ) : null}
              </styled.ProjectField>
              <styled.GenreMood>
                <styled.Genre>장르</styled.Genre>
                <styled.GenreContext>{"어쿠스틱"}</styled.GenreContext>
                <styled.Mood>분위기</styled.Mood>
                <styled.MoodContext>{"희망적인"}</styled.MoodContext>
              </styled.GenreMood>
            </div>
            {true ? (
              <AudioPlayer
                style={{
                  position: "relative",
                  right: "70px",
                  width: "550px",
                  display: "flex",
                  justifyContent: "flex-start",
                  boxShadow: "none",
                  marginTop: "20px",
                  zIndex: "1",
                  opacity: "1",
                }}
                src={audio}
                showJumpControls={false}
                customVolumeControls={[]}
                customAdditionalControls={[]}
                defaultCurrentTime="Loading"
                defaultDuration="Loading"
                layout="horizontal-reverse"
                customProgressBarSection={[
                  RHAP_UI.PROGRESS_BAR,
                  RHAP_UI.CURRENT_LEFT_TIME,
                ]}
                customIcons={{
                  play: <Icon icon={playCircle} color="#FF8900" />,
                  pause: <Icon icon={pauseCircle} color="#ff8900" />,
                }}
              ></AudioPlayer>
            ) : undefined}{" "}
            {false ? text : undefined}
          </styled.Project>
        </styled.ProjectBox>
      ))}
    </>
  );
}

export default Project;
