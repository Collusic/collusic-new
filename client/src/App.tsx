import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { RequestListViewModel } from "./viewmodel/RequestListViewModel";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <RequestListViewModel></RequestListViewModel>
    </RecoilRoot>
  );
};

export default App;
