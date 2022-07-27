import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NavBarView } from "./view/NavBarView";

import { LoginView } from "./view/LoginView";
import { StartPageView } from "./view/StartPageView";

function App() {
  return (
      <BrowserRouter>
        <NavBarView />
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route path="/" element={<StartPageView />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
