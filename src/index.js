import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import initializeStore from "./config/store";

// import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={initializeStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
