import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Raven from "raven-js";

import initializeStore from "./config/store";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

if (process.env.NODE_ENV === "production") {
  Raven.config(
    "https://f0ac1ed091a946b1a7688a9b8baceaef@sentry.io/1188153"
  ).install();
}

ReactDOM.render(
  <Provider store={initializeStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
