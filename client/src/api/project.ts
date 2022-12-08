import { LOCAL_API } from "./axios";

// 프로젝트 생성
export const addProject = async (params: {}) => {
  const url = "/projects";
  const res = await LOCAL_API.post(url, params);

  try {
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log(err);
    alert("프로젝트가 생성되지 않았습니다. 잠시후 다시 시도해주세요.");
  }
  return false;
};
