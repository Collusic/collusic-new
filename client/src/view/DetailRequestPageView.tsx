import React, { Suspense } from "react";

import "./detailRequestPage.scss";
import { ContributeListViewModel } from "../viewmodel/ContributeListViewModel";
import { DetailRequestViewModel } from "../viewmodel/DetailRequestViewModel";

export const DetailRequestPageView: React.FC = () => {
  return (
    <main className="request">
      <Suspense fallback={<div>로딩중...</div>}>
        <ContributeListViewModel />
      </Suspense>
      <Suspense fallback={<div>로딩중...</div>}>
        <DetailRequestViewModel />
      </Suspense>
    </main>
  );
};
