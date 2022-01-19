import React from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { NavBarView } from "./view/NavBarView";
import { MainPageView } from "./view/MainPageView";
import { CreateRequestPageView } from "./view/CreateRequestPageView";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <NavBarView></NavBarView>
        <Routes>
          <Route path="/" element={<MainPageView />} />
          <Route path="/createrequest" element={<CreateRequestPageView />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
