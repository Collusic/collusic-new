import React, { Suspense } from "react";

import "../utils/style/detailRequestPage.scss";
import { DetailRequestViewModel } from "../viewmodel/DetailRequestViewModel";
import { DetailRequestViewPageModel } from "../viewmodel/DetailRequestViewPageModel";

export const DetailRequestPageView: React.FC = () => {
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
