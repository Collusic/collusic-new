import React from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { MainPage } from "./page/MainPage";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      {/* <RequestList></RequestList> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
