import React from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { MainPageView } from "./view/MainPageView";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      {/* <RequestList></RequestList> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPageView />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
