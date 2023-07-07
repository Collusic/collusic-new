import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";

import { worker } from "./mocks/browser";
import App from "./App";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

// Replace ReactDOM.render
createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
