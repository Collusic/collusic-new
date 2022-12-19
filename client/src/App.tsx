import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NavBar } from "components/blocks/NavBar";
import AuthVerify from "viewmodel/AuthVerify";
import { SignInViewModel } from "viewmodel/SignInViewModel";
import { SignUpViewModel } from "viewmodel/SignUpViewModel";
import { RedirectViewModel } from "viewmodel/RedirectViewModel";
import { ProjectListView } from "view/ProjectListView";
import CreateProjectPage from "components/pages/CreateProjectPage";
import ProjectListPage from "components/pages/ProjectListPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/signin" element={<SignInViewModel />} />
        <Route path="/signup" element={<SignUpViewModel />} />
        <Route path="/auth/redirect/:snsType" element={<RedirectViewModel />} />
        <Route path="/projectlist" element={<ProjectListView />} />
        <Route path="/createproject" element={<CreateProjectPage />} />
        <Route path="/" element={<ProjectListPage />} />
      </Routes>
      <AuthVerify />
    </BrowserRouter>
  );
}

export default App;
