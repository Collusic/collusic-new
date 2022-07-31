import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NavBarView } from "./view/NavBarView";

import { SignInViewModel } from "./viewmodel/SignInViewModel";
import { StartPageView } from "./view/StartPageView";
import { SignUpViewModel } from "./viewmodel/SignUpViewModel";

function App() {
  return (
    <BrowserRouter>
      <NavBarView />
      <Routes>
        <Route path="/signin" element={<SignInViewModel />} />
        <Route path="/signup" element={<SignUpViewModel />} />
        <Route path="/" element={<StartPageView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
