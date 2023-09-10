import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NavBar } from "components/blocks/NavBar";
import { SignInViewModel } from "viewmodel/SignInViewModel";
import { SignUpViewModel } from "viewmodel/SignUpViewModel";
import { RedirectViewModel } from "viewmodel/RedirectViewModel";
import CreateProjectPage from "components/pages/CreateProjectPage";
import ProjectListPage from "components/pages/ProjectListPage";
import CreateTrackViewModel from "viewmodel/CreateTrackViewModel";
import ProjectSettingViewModel from "./viewmodel/CreateProjectViewModel";
import DetailProjectPage from "./components/pages/DetailProjectPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProjectListPage />} />
        <Route path="/create" element={<CreateProjectPage />} />
        <Route path="/signin" element={<SignInViewModel />} />
        <Route path="/signup" element={<SignUpViewModel />} />
        <Route path="/auth/redirect/:snsType" element={<RedirectViewModel />} />
        <Route path="/:projectId" element={<DetailProjectPage />} />
        <Route path="/update/:projectId" element={<ProjectSettingViewModel />} />
        <Route path="/:projectId/track/new" element={<CreateTrackViewModel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
