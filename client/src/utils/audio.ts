// audio 객체에서 Blob 데이터를 받아오기 위한 함수
const getAudioBlob = async (audio: HTMLAudioElement) => {
  try {
    const response = await fetch(audio.src);
    const blob = await response.blob();
    return blob;
  } catch (e) {
    console.error("audio blob 데이터를 불러오는데 실패했어요.", e);
  }

  return Promise.reject();
};

export { getAudioBlob };
