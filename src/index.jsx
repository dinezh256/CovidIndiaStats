import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Suspense fallback={""}>
    <App />
  </Suspense>,
  document.getElementById("root")
);

serviceWorker.unregister();
