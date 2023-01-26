import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NavBar } from "components/blocks/NavBar";
import { SignInViewModel } from "viewmodel/SignInViewModel";
import { SignUpViewModel } from "viewmodel/SignUpViewModel";
import { RedirectViewModel } from "viewmodel/RedirectViewModel";
import CreateProjectPage from "components/pages/CreateProjectPage";
import ProjectListPage from "components/pages/ProjectListPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProjectListPage />} />
        <Route path="/createproject" element={<CreateProjectPage />} />
        <Route path="/signin" element={<SignInViewModel />} />
        <Route path="/signup" element={<SignUpViewModel />} />
        <Route path="/auth/redirect/:snsType" element={<RedirectViewModel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
