import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "react-loading";

import ProjectListViewModel from "viewmodel/ProjectListViewModel";
import "./style.scss";

function ProjectListPage() {
  const navigate = useNavigate();

  return (
    <div id="project-list-page">
      <img id="banner" src={`${process.env.PUBLIC_URL}/assets/banner/banner.png`} alt="" />
      <Suspense fallback={<Loading />}>
        <ProjectListViewModel />
      </Suspense>
      <button type="button" id="create-project-btn" onClick={() => navigate("/create")}>
        <img src={`${process.env.PUBLIC_URL}/assets/plus/plus.png`} alt="" />
      </button>
    </div>
  );
}

export default ProjectListPage;
