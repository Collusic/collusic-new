import { useEffect } from "react";
import { useRecoilValue } from "recoil";

import type { AudioType } from "types/audioType";

import { isTrackPlayingState } from "model/audioModel";
import useRecord from "./useRecord";

const useCreateTrack = ({
  inputDeviceId,
  onReocrdSuccess,
  onRecordCancel: _onRecordCancel,
  onTrackRemove,
}: {
  inputDeviceId: ConstrainDOMString;
  onReocrdSuccess?: (data: Blob, key: string) => void;
  onRecordCancel?: () => void;
  onTrackRemove?: (audioId: AudioType["id"]) => void;
}) => {
  const isTrackPlaying = useRecoilValue(isTrackPlayingState);

  const {
    isRecording,
    isSuccess: isRecordSuccess,
    data: recordData,
    streamId: recordKey,
    startRecord,
    stopRecord,
    initRecord,
  } = useRecord(inputDeviceId);

  const handleRecordButtonClick = () => {
    startRecord();
  };

  const handleTrackRemove = (audioId: AudioType["id"]) => {
    stopRecord();

    if (window.confirm("녹음된 트랙이 있어요. 정말 삭제할까요?")) {
      initRecord();
      onTrackRemove?.(audioId);
    }
  };

  // 녹음 상태이고, track player가 재생상태인 경우에 녹음
  useEffect(() => {
    if (!isRecording) {
      return;
    }

    if (isTrackPlaying) {
      startRecord();
    } else {
      stopRecord();
    }
  }, [isTrackPlaying]);

  useEffect(() => {
    if (isRecordSuccess) {
      onReocrdSuccess?.(recordData, recordKey);
    }
  }, [isRecordSuccess]);

  return {
    recordData,
    isRecording,
    isRecordSuccess,
    handleRecordButtonClick,
    handleTrackRemove,
  };
};

export default useCreateTrack;
