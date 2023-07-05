import { useRef, useState } from "react";

interface MediaRecorderBaseResult {
  isRecording: boolean;
  isSuccess: boolean;
  data: Blob | undefined;
  streamId: string | undefined;
  startRecord: () => void;
}

interface MediaRecorderSuccessResult extends MediaRecorderBaseResult {
  isRecording: false;
  isSuccess: true;
  data: Blob;
  streamId: string;
}

interface MediaRecorderLoadingResult extends MediaRecorderBaseResult {
  isRecording: true;
  isSuccess: false;
  data: undefined;
  streamId: undefined;
}

type MediaRecorderResult = MediaRecorderSuccessResult | MediaRecorderLoadingResult;

const getMediaRecorder = async ({
  deviceId,
  onRecStart,
  onRecStop,
}: {
  deviceId: ConstrainDOMString;
  onRecStart: () => void;
  onRecStop: (data: Blob) => void;
}) => {
  const audioArray: BlobPart[] = []; // 녹음 데이터 저장 배열
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { deviceId },
  });
  const mediaRecorder = new MediaRecorder(stream);

  // 녹음 데이터 취득
  mediaRecorder.addEventListener("dataavailable", (e) => {
    audioArray.push(e.data);
  });

  mediaRecorder.addEventListener("start", onRecStart);

  // 녹음이 종료되었을 때
  mediaRecorder.addEventListener("stop", () => {
    console.log("stop!");
    // 배열에 담긴 오디오데이터 합치고, 코덱 설정
    const blob = new Blob(audioArray, { type: "audio/ogg codecs=opus" });
    audioArray.splice(0); // 기존 오디오 데이터 초기화

    stream.getAudioTracks().forEach((track) => track.stop());
    onRecStop(blob);
  });

  return mediaRecorder;
};

const useRecord = (deviceId: ConstrainDOMString) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<Blob>();
  const mediaRecorderRef = useRef<MediaRecorder>();

  const handleRecordStart = () => {
    console.log("start~");
    setIsRecording(true);
    setIsSuccess(false);
  };

  const handleRecordStop = (data: Blob) => {
    console.log("stop!");
    setData(data);
    setIsRecording(false);
    setIsSuccess(true);
  };

  const startRecord = async () => {
    try {
      const mediaRecorder = await getMediaRecorder({
        deviceId,
        onRecStart: handleRecordStart,
        onRecStop: handleRecordStop,
      });

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();

      // 30초 뒤에 녹음 중지
      setTimeout(() => {
        mediaRecorder.stop();
      }, 30000);

      console.log(mediaRecorderRef);
    } catch (err) {
      console.log(err);
      alert("녹음이 가능한 입력장치가 아닙니다.");
    }
  };

  return {
    isRecording,
    isSuccess,
    data,
    streamId: mediaRecorderRef.current?.stream.id,
    startRecord,
  } as MediaRecorderResult;
};

export default useRecord;
