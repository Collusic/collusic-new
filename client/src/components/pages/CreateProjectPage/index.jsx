import React from "react";

import "./style.scss";
import ProjectSettingViewModel from "viewmodel/ProjectSettingViewModel";
import AuthRequired from "components/atoms/Auth/AuthRequired";

function CreateProjectPage() {
  return (
    <AuthRequired>
      <div id="create-project">
        <ProjectSettingViewModel />
      </div>
    </AuthRequired>
  );
}

export default CreateProjectPage;
