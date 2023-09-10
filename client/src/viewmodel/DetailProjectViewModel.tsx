import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { DetailProjectInfo } from "types/detailProjectType";
import { API } from "api/axios";

import DetailProject from "components/blocks/DetailProject";

function DetailProjectViewModel() {
  const { pathname } = useLocation();
  const [detailProjectInfo, setDetailProjectInfo] = useState<DetailProjectInfo>();

  const getData = async () => {
    const { data } = await API.get<DetailProjectInfo>(`projects/${pathname.slice(1)}`);

    setDetailProjectInfo(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return detailProjectInfo ? (
    <DetailProject
      projectId={detailProjectInfo.projectId}
      projectName={detailProjectInfo.projectName}
      likeCount={detailProjectInfo.likeCount}
      isLiked={detailProjectInfo.isLiked}
      bpm={detailProjectInfo.bpm}
      tracks={detailProjectInfo.tracks}
    />
  ) : (
    <div>Loading...</div>
  );
}

export default DetailProjectViewModel;
