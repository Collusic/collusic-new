import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { API } from "api/axios";
import DetailProject from "components/blocks/DetailProject";
import { DetailProjectInfo } from "types/detailProjectType";

function DetailProjectViewModel() {
  const { pathname } = useLocation();
  const [detailProjectInfo, setDetailProjectInfo] = useState<DetailProjectInfo>({
    projectId: 0,
    projectName: "",
    likeCount: 0,
    isLiked: false,
    tracks: [],
    bpm: 30,
  });

  const getData = async () => {
    const { data }: { data: DetailProjectInfo } = await API.get(`projects/${pathname.slice(1)}`);

    setDetailProjectInfo(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <DetailProject
      projectId={detailProjectInfo.projectId}
      projectName={detailProjectInfo.projectName}
      likeCount={detailProjectInfo.likeCount}
      isLiked={detailProjectInfo.isLiked}
      bpm={detailProjectInfo.bpm}
      tracks={detailProjectInfo.tracks}
    />
  );
}

export default DetailProjectViewModel;
