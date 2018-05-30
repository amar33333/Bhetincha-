import React, { Component } from "react";
import { AboutUs, CoverPhoto } from "./components";
import { connect } from "react-redux";

import { Row, Col, Container } from "reactstrap";

import "./minisite.css";

const aboutUsstyle = {
  fontSize: "12px !important",
  color: "white"
};

class MainPage extends Component {
  render() {
    return (
      <div>
        <CoverPhoto />
        <div className="body-wrapper">
          <div className="minisite_about__wrapper">
            <Container>
              <Row>
                <Col xs="12" md="4">
                  <h2>About Us</h2>
                  <p
                    style={aboutUsstyle}
                    dangerouslySetInnerHTML={{
                      __html: this.props.data.aboutUs
                    }}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ MinisiteContainer: { crud: { about } } }) => ({
  data: {
    tagline: about.tagline || "",
    aboutUs: about.aboutUs || "",
    establishedYear: about.establishedYear || ""
    // companyType: about.companyType
  }
}))(MainPage);
