import { API } from "./axios";

// 프로젝트 생성
export const addTrack = async (projectId: string, params: {}) => {
  const url = `/projects/${projectId}/tracks`;
  const errorMessage = "트랙이 생성되지 않았습니다. 잠시 후 다시 시도해주세요.";

  try {
    const res = await API.post(url, params);
    return res.data;
  } catch (err) {
    console.log(err);
    alert(errorMessage);
  }

  return Promise.reject(new Error(errorMessage));
};
