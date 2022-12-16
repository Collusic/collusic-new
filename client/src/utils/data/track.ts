import { Track } from "types/projectType";

// 프로젝트 생성 페이지에서 선택된 아이콘
export const SelectedTrackSrc = {
  피아노: `${process.env.PUBLIC_URL}/assets/track/selected/piano.svg`,
  드럼: `${process.env.PUBLIC_URL}/assets/track/selected/drum.svg`,
  보컬: `${process.env.PUBLIC_URL}/assets/track/selected/vocal.svg`,
  박수: `${process.env.PUBLIC_URL}/assets/track/selected/crap.svg`,
  "어쿠스틱 기타": `${process.env.PUBLIC_URL}/assets/track/selected/acousticguitar.svg`,
  "일렉 기타": `${process.env.PUBLIC_URL}/assets/track/selected/electricguitar.svg`,
  바이올린: `${process.env.PUBLIC_URL}/assets/track/selected/violin.svg`,
  리코더: `${process.env.PUBLIC_URL}/assets/track/selected/recorder.svg`,
  마라카스: `${process.env.PUBLIC_URL}/assets/track/selected/maracas.svg`,
  ETC: "",
  "": "",
};

// 프로젝트 생성 페이지에서 선택되지 않은 아이콘
export const UnselectedTrackSrc = {
  피아노: `${process.env.PUBLIC_URL}/assets/track/unselected/piano.svg`,
  드럼: `${process.env.PUBLIC_URL}/assets/track/unselected/drum.svg`,
  보컬: `${process.env.PUBLIC_URL}/assets/track/unselected/vocal.svg`,
  박수: `${process.env.PUBLIC_URL}/assets/track/unselected/crap.svg`,
  "어쿠스틱 기타": `${process.env.PUBLIC_URL}/assets/track/unselected/acousticguitar.svg`,
  "일렉 기타": `${process.env.PUBLIC_URL}/assets/track/unselected/electricguitar.svg`,
  바이올린: `${process.env.PUBLIC_URL}/assets/track/unselected/violin.svg`,
  리코더: `${process.env.PUBLIC_URL}/assets/track/unselected/recorder.svg`,
  마라카스: `${process.env.PUBLIC_URL}/assets/track/unselected/maracas.svg`,
  ETC: "",
  "": "",
};

// 프로젝트 목록 페이지에서 기여한 트랙 아이콘
export const TrackIconSrc = {
  피아노: `${process.env.PUBLIC_URL}/assets/trackIcon/piano.png`,
  드럼: `${process.env.PUBLIC_URL}/assets/trackIcon/drum.png`,
  보컬: `${process.env.PUBLIC_URL}/assets/trackIcon/vocal.png`,
  박수: `${process.env.PUBLIC_URL}/assets/trackIcon/crap.png`,
  "어쿠스틱 기타": `${process.env.PUBLIC_URL}/assets/trackIcon/acousticguitar.png`,
  "일렉 기타": `${process.env.PUBLIC_URL}/assets/trackIcon/electricguitar.png`,
  바이올린: `${process.env.PUBLIC_URL}/assets/trackIcon/violin.png`,
  리코더: `${process.env.PUBLIC_URL}/assets/trackIcon/recorder.png`,
  마라카스: `${process.env.PUBLIC_URL}/assets/trackIcon/maracas.png`,
  ETC: `${process.env.PUBLIC_URL}/assets/trackIcon/etc.png`,
  "": "",
};

export const trackList: Track[] = [
  "피아노",
  "드럼",
  "보컬",
  "박수",
  "어쿠스틱 기타",
  "일렉 기타",
  "바이올린",
  "리코더",
  "마라카스",
  "ETC",
];
