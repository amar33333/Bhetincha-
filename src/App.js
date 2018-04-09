import React, { Component } from "react";
import { Provider } from "react-redux";

// Import Flag Icons Set
import "flag-icon-css/css/flag-icon.min.css";
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";
// Import Semantic UI css
import "semantic-ui-css/semantic.min.css";

import "bootstrap/dist/css/bootstrap.min.css";

// import "../node_modules/@coreui/styles/scss/_dropdown-menu-right.scss";

import { MainRoute } from "./config/routes";
import store from "./config/store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainRoute />
      </Provider>
    );
  }
}

export default App;
