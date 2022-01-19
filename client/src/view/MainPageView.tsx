import React from "react";

import { RequestListViewModel } from "../viewmodel/RequestListViewModel";
import { FloatingReqCreateButtonView } from "./FloatingReqCreateButtonView";
import "./MainPage.scss";

export const MainPageView: React.FC = () => {
  return (
    <main className="mainpage">
      <RequestListViewModel />
      <article className="float">
        <FloatingReqCreateButtonView />
      </article>
    </main>
  );
};
