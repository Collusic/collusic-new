import React, { Suspense } from "react";
import Loading from "react-loading";

import ProjectListViewModel from "viewmodel/ProjectListViewModel";
import "./style.scss";

function ProjectListPage() {
  return (
    <div id="project-list-page">
      <img id="banner" src={`${process.env.PUBLIC_URL}/assets/banner/banner.png`} alt="" />
      <Suspense fallback={<Loading />}>
        <ProjectListViewModel />
      </Suspense>
      <div id="create-project-btn">
        <img src={`${process.env.PUBLIC_URL}/assets/plus/plus.png`} alt="" />
      </div>
    </div>
  );
}

export default ProjectListPage;
