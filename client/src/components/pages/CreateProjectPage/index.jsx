import "./style.scss";
import ProjectSettingViewModel from "viewmodel/ProjectSettingViewModel";

function CreateProjectPage() {
  return (
    <div id="create-project">
      <ProjectSettingViewModel />
    </div>
  );
}

export default CreateProjectPage;
