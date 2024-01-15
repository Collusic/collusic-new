import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NavBar } from "components/blocks/NavBar";
import { SignInViewModel } from "viewmodel/SignInViewModel";
import { SignUpViewModel } from "viewmodel/SignUpViewModel";
import { RedirectViewModel } from "viewmodel/RedirectViewModel";
import ProjectSettingViewModel from "viewmodel/CreateProjectViewModel";

import CreateProjectPage from "components/pages/CreateProjectPage";
import ProjectListPage from "components/pages/ProjectListPage";
import CreateTrackPage from "components/pages/CreateTrackPage";
import DetailProjectPage from "components/pages/DetailProjectPage";
import AuthRequired from "components/atoms/Auth/AuthRequired";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProjectListPage />} />
        <Route
          path="/create"
          element={
            <AuthRequired>
              <CreateProjectPage />
            </AuthRequired>
          }
        />
        <Route path="/signin" element={<SignInViewModel />} />
        <Route path="/signup" element={<SignUpViewModel />} />
        <Route path="/auth/redirect/:snsType" element={<RedirectViewModel />} />
        <Route path="/:projectId" element={<DetailProjectPage />} />
        <Route
          path="/update/:projectId"
          element={
            <AuthRequired>
              <ProjectSettingViewModel />
            </AuthRequired>
          }
        />
        <Route
          path="/:projectId/track/new"
          element={
            <AuthRequired>
              <CreateTrackPage />
            </AuthRequired>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
