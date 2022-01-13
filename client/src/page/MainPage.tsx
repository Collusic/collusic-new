import React from "react";

import { RequestListViewModel } from "../viewmodel/RequestListViewModel";
import "./MainPage.scss";

export const MainPage: React.FC = () => {
  return (
    <main className="mainpage">
      <RequestListViewModel />
    </main>
  );
};
