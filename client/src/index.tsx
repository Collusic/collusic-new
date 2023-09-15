import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";

import { worker } from "mocks/browser";
import App from "App";

if (process.env.REACT_APP_MOCK === "Y") {
  worker.start();
}

// Replace ReactDOM.render
createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
