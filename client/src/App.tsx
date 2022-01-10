import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { RequestProjectsViewModel } from "./viewmodel/RequestProjectsViewModel";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <RequestProjectsViewModel></RequestProjectsViewModel>
    </RecoilRoot>
  );
};

export default App;
