import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
// import { worker } from "./mocks/browser";

import App from "./App";
import "./utils/style/index.scss";

// if (process.env.NODE_ENV === "development") {
//   worker.start();
// }

ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById("root") as HTMLElement,
);
