import React from "react";
import { CreateTitleView } from "../view/CreateTitleView";
import { CreateContentView } from "../view/CreateContentView";

export const CreateRequestViewModel: React.FC = () => {
  return (
    <React.Fragment>
      <CreateTitleView />
      <CreateContentView />
    </React.Fragment>
  );
};
