import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NavBarView } from "./view/NavBarView";

import { SignInViewModel } from "./viewmodel/SignInViewModel";
import { StartPageView } from "./view/StartPageView";
import { SignUpViewModel } from "./viewmodel/SignUpViewModel";
import { RedirectViewModel } from "./viewmodel/RedirectViewModel";
import { ProjectListView } from "./view/ProjectListView";

function App() {
  return (
    <BrowserRouter>
      <NavBarView />
      <Routes>
        <Route path="/signin" element={<SignInViewModel />} />
        <Route path="/signup" element={<SignUpViewModel />} />
        <Route path="/auth/redirect" element={<RedirectViewModel />} />
        <Route path="/" element={<StartPageView />} />
        <Route path="/projectlist" element={<ProjectListView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
