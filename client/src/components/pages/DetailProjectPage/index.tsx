import UnderPlayBarViewModel from "viewmodel/UnderPlayBarViewModel";
import DetailProjectViewModel from "viewmodel/DetailProjectViewModel";
import "./style.scss";

function DetailProjectPage() {
  return (
    <section id="detail-project">
      <DetailProjectViewModel />
      <UnderPlayBarViewModel />
    </section>
  );
}

export default DetailProjectPage;
