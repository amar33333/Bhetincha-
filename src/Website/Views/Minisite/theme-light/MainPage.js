import React, { Component } from "react";
import { AboutUs, CoverPhoto } from "../components";

import "./minisite.css";

class MainPage extends Component {
  render() {
    return (
      <div
        style={{
          paddingTop: "60px"
        }}
      >
        <CoverPhoto />
        <div className="body-wrapper">
          <AboutUs />
        </div>
      </div>
    );
  }
}

export default MainPage;
