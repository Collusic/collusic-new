import type { ProjectResponseType } from "types/projectType";
import { API } from "api/axios";

// 프로젝트 생성
export const addProject = async (params: {}) => {
  const url = "/projects";
  const res = await API.post(url, params);

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

export const getProjectList = async (params: {}) => {
  const url = "/projects";
  const res = await API.get(url, { params });

  try {
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log(err);
    alert("프로젝트를 불러오는데 실패했습니다. 새로고침 해주세요.");
  }
  return false;
};

export const setProjectLike = async (params: number) => {
  const url = `/projects/${params}/like`;
  const res = await API.post(url);

  try {
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log(err);
    alert("좋아요를 누르는데 실패했습니다. 새로고침 해주세요.");
  }
  return false;
};

export const getProject = async (id: string) => {
  const res = await API.get<ProjectResponseType>(`/projects/${id}`);
  return res.data;
};
