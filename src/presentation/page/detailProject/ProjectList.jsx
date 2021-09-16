import React, { useState, useEffect } from "react";
import styled from "./styled";
import axios from "axios";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import profileImage from "assets/profile.png";
import audio from "assets/전상근_내방.mp3";
import unselected from "assets/unselected.png";
import selected from "assets/selected.png";
import { Icon } from "@iconify/react";
import playCircle from "@iconify-icons/mdi/play-circle";
import pauseCircle from "@iconify-icons/mdi/pause-circle";
import API from "data/http/axios/api";

function ProjectList({ unselected }) {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
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

    fetchProjects();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!projects) return null;

  return (
    <styled.ProjectList>
      {projects.map((project) => (
        <styled.Project>
          <styled.Profile src={profileImage}></styled.Profile>
          <styled.Email>${project.email}</styled.Email>
          <styled.Genre>{project.company.name}</styled.Genre>
          <AudioPlayer
            style={{
              width: "600px",
              backgroundColor: "#fafafa",
              boxShadow: "none",
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
          <styled.LikeButton
            src={selected ? selected : unselected}
          ></styled.LikeButton>
        </styled.Project>
      ))}
    </styled.ProjectList>
  );
}

const defaultProps = {
  unselected: { unselected },
};
export default ProjectList;
