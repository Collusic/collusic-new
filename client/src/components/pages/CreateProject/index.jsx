import React from "react";

import "./style.scss";
import ProjectViewModel from "viewmodel/ProjectViewModel";

function CreateProject() {
  return (
    <div id="create-project">
      <ProjectViewModel />
    </div>
  );
}

export default CreateProject;
