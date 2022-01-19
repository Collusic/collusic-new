import React, { Suspense } from "react";

import { RequestListViewModel } from "../viewmodel/RequestListViewModel";
import "./MainPage.scss";

export const MainPageView: React.FC = () => {
  return (
    <main className="mainpage">
      <Suspense fallback={<div>요청작 리스트 로딩 중...</div>}>
        <RequestListViewModel />
      </Suspense>
    </main>
  );
};
