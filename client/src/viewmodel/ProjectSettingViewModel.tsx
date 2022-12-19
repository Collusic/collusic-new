import React, { FormEvent, MouseEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { bpmState, inputDeviceTextState, selectedTrackState, projectNameState } from "model/projectModel";
import ProjectSetting from "components/blocks/ProjectSetting";
import { trackList } from "utils/data/track";
import { Track } from "types/projectType";
import { addProject } from "api/project";

function ProjectSettingViewModel() {
  const [bpm, setBpm] = useRecoilState(bpmState);
  const [projectName, setProjectName] = useRecoilState(projectNameState);
  const [selectedTrack, setSelectedTrack] = useRecoilState(selectedTrackState);
  const [inputTextDevice, setInputTextDevice] = useRecoilState(inputDeviceTextState);
  const [inputDeviceId, setInputDeviceId] = useState("");
  const isRecording = useRef(false);
  const navigate = useNavigate();

  // 트랙 녹음
  const recordTrack = async (deviceId: string) => {
    if (!isRecording.current) {
      try {
        // 녹음 데이터 저장 배열
        const audioArray: BlobPart[] = [];
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId,
          },
        });
        const mediaRecorder = new MediaRecorder(stream);

        // 녹음 데이터 취득
        mediaRecorder.ondataavailable = (e) => {
          audioArray.push(e.data);
        };

        // 녹음이 종료되었을 때
        mediaRecorder.onstop = () => {
          // 배열에 담긴 오디오데이터 합치고, 코덱 설정
          const blob = new Blob(audioArray, { type: "audio/ogg codecs=opus" });
          audioArray.splice(0); // 기존 오디오 데이터 초기화

          // blob 데이터 접근 주소 생성
          const blobUrl = window.URL.createObjectURL(blob);
          // TODO: 파형에 녹음된 파일 표시
        };
      } catch (err) {
        console.log(err);
        alert("녹음이 가능한 입력장치가 아닙니다.");
      }
    }
  };
  // 입력장치 선택
  const handleDeviceClick = (deviceId: string, deviceName: string) => {
    setInputDeviceId(deviceId);
    setInputTextDevice(deviceName);
  };
  // 등록할 트랙 선택
  const handleTrackClick = (e: MouseEvent) => {
    if (!e.currentTarget.lastChild) {
      alert("트랙을 다시 선택해주세요.");
    }
    setSelectedTrack(e.currentTarget.lastChild?.nodeValue as Track);
  };
  // 프로젝트 bpm 설정
  const handleBpmInput = (e: FormEvent) => {
    setBpm(Number((e.currentTarget as HTMLInputElement).value));
  };
  // 프로젝트 이름 설정
  const handleTitleInput = (e: FormEvent) => {
    setProjectName((e.currentTarget as HTMLInputElement).value);
  };
  // 프로젝트 생성하기 버튼 클릭
  const handleBtnClick = () => {
    const createProject = async () => {
      const data = await addProject({ projectName, trackTag: selectedTrack, bpm });

      navigate(`/detailProject/?id=${data.id}`);
    };
    createProject();
  };

  return (
    <ProjectSetting
      onDeviceClick={handleDeviceClick}
      onTrackClick={handleTrackClick}
      onBtnClick={handleBtnClick}
      onBpmInput={handleBpmInput}
      onTitleInput={handleTitleInput}
      bpmState={bpm}
      selectedTrack={selectedTrack}
      tracks={trackList}
      inputTextDevice={inputTextDevice}
    />
  );
}

export default ProjectSettingViewModel;
