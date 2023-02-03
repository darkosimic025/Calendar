import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyles } from "./theme/GlobalStyles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <>
    <App />
    <GlobalStyles />
    <div id="popover-root"></div>
  </>,
);
