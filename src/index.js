import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Raven from "raven-js";
import "./config/rxjs";

import "./index.css";
import store from "./config/store";
import App from "./App";
// import registerServiceWorker from "./registerServiceWorker";
import { unregister } from "./registerServiceWorker";

import * as firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCVe593c4dXDDGizPWlic90OSHUHGY6DD0",
  authDomain: "bhetincha-c316f.firebaseapp.com",
  databaseURL: "https://bhetincha-c316f.firebaseio.com",
  projectId: "bhetincha-c316f",
  storageBucket: "",
  messagingSenderId: "786592356787"
};

firebase.initializeApp(config);

if (process.env.NODE_ENV === "production") {
  Raven.config(
    "https://f0ac1ed091a946b1a7688a9b8baceaef@sentry.io/1188153"
  ).install();
}

//console.log("soling store", store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
// registerServiceWorker();
unregister();
