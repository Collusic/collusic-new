import "./style.scss";
import CreateProjectViewModel from "viewmodel/CreateProjectViewModel";
import AuthRequired from "components/atoms/Auth/AuthRequired";

function CreateProjectPage() {
  return (
    <AuthRequired>
      <div id="create-project">
        <CreateProjectViewModel />
      </div>
    </AuthRequired>
  );
}

export default CreateProjectPage;
