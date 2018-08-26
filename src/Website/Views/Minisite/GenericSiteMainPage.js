import React, { Component } from "react";
import { CoverPhoto } from "./components";
import { connect } from "react-redux";

import Rating from "react-rating";

import {
  Row,
  Col,
  Container
  // Dropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem
} from "reactstrap";
import { Card, Dropdown } from "semantic-ui-react";

import moment from "moment";
import "./minisite.css";

const aboutUsstyle = {
  fontSize: "12px !important",
  color: "black"
};

const MAX_CAT = 3;

class GenericSiteMainPage extends Component {
  render() {
    return (
      <div
        style={{
          paddingTop: "60px"
        }}
      >
        <p>Main Page of Generic Site</p>
      </div>
    );
  }
}

export default connect(
  ({
    MinisiteContainer: {
      crud: {
        business_name,
        about,
        workingHour,
        alwaysOpen,
        industry,
        categories
      }
    }
  }) => ({
    data: {
      tagline: about.tagline || "",
      aboutUs: about.aboutUs || "",
      establishedYear: about.establishedYear || "",
      companyType: about.companyType
    },
    business_name,
    workingHour,
    alwaysOpen,
    industry,
    categories
  })
)(GenericSiteMainPage);
