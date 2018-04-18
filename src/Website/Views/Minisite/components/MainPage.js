import React, { Component } from "react";
import AboutUs from "./AboutUs";
import CoverPhoto from "./CoverPhoto";

import "../minisite.css";

class MainPage extends Component {
  render() {
    return (
      <div>
        <CoverPhoto />
        <div className="body-wrapper">
          <AboutUs />
        </div>
      </div>
    );
  }
}

export default MainPage;
