import React from "react";
import { CreateRequestViewModel } from "../viewmodel/CreateRequestViewModel";

import "./CreateRequestPage.scss";

export const CreateRequestPageView: React.FC = () => {
  return (
    <main className="main">
      <CreateRequestViewModel />
    </main>
  );
};
