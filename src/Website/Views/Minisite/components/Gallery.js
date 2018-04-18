import React, { Component } from "react";
import { MainNavbar } from "../../../components";
import { BusinessFooter } from "./";
class Gallery extends Component {
  state = {};
  render() {
    return (
      <div>
        <MainNavbar />
        <div>This is gallery </div>
        <BusinessFooter theme="dark" />
      </div>
    );
  }
}

export default Gallery;
