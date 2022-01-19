import React from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { NavBarView } from "./view/NavBarView";
import { MainPageView } from "./view/MainPageView";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <NavBarView></NavBarView>
        <Routes>
          <Route path="/" element={<MainPageView />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
