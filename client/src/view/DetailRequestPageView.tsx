import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { detailRequestProjectIdState } from "../model/detailRequestProjectModel";

import "../utils/style/detailRequestPage.scss";
import { DetailRequestViewModel } from "../viewmodel/DetailRequestViewModel";
import { DetailRequestViewPageModel } from "../viewmodel/DetailRequestViewPageModel";

export const DetailRequestPageView: React.FC = () => {
  const [projectId, setProjectId] = useRecoilState(detailRequestProjectIdState);
  const { id } = useParams();

  setProjectId(id!);
  return (
    <main className="request">
      <Suspense fallback={<div>로딩중...</div>}>
        <DetailRequestViewPageModel />
      </Suspense>
      <Suspense fallback={<div>로딩중...</div>}>
        <DetailRequestViewModel />
      </Suspense>
    </main>
  );
};
