import { useEffect } from "react";

import type { AudioType } from "types/audioType";

import useRecord from "./useRecord";
import useTimer from "./useTimer";

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
  const {
    isRecording,
    isSuccess: isRecordSuccess,
    data: recordData,
    streamId: recordKey,
    startRecord,
    stopRecord,
    initRecord,
  } = useRecord(inputDeviceId);

  const { start: startTimer, pause: pauseTimer, isExpired, time: timerTime } = useTimer(30);

  const handleRecordButtonClick = () => {
    startRecord();
    startTimer();
  };

  const handleTrackRemove = (audioId: AudioType["id"]) => {
    stopRecord();
    pauseTimer();

    if (window.confirm("녹음된 트랙이 있어요. 정말 삭제할까요?")) {
      initRecord();
      onTrackRemove?.(audioId);
    }
  };

  // timer가 종료되면 트랙 녹음 중지
  useEffect(() => {
    if (isExpired) {
      stopRecord();
    }
  }, [isExpired]);

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
