import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";

import "react-quill/dist/quill.snow.css";
import "../minisite.css";

import AboutUsEditor from "./AboutUsEditor";
import { onEditAboutUsClicked } from "../actions";

class AboutUs extends Component {
  renderAboutEdit = () => (
    <span className="minisite_about__edit__icon">
      <i
        onClick={this.props.onEditAboutUsClicked}
        aria-hidden="true"
        className="fa fa-pencil"
      />
    </span>
  );

  render() {
    return (
      <Container>
        <Row>
          <Col xs="12" md="12" className="minisite_heading__text_wrapper">
            <h3 className="minisite_heading__text">About us</h3>
            {this.props.mainEdit && this.renderAboutEdit()}
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12">
            {this.props.mainEdit && this.props.aboutUsEdit ? (
              <div>
                <AboutUsEditor initialValue={this.props.data} />
              </div>
            ) : (
              <div>
                <div>Tagline {this.props.data.tagline}</div>
                <div>Established Year {this.props.data.establishedYear}</div>
                {/* <div>Company Type {this.props.data.companyType}</div> */}
                <div
                  className="quill ql-editor"
                  dangerouslySetInnerHTML={{
                    __html: this.props.data.aboutUs
                  }}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(
  ({
    MinisiteContainer: {
      crud: { about },
      edit
    }
  }) => ({
    data: {
      tagline: about.tagline,
      aboutUs: about.aboutUs,
      establishedYear: about.establishedYear
      // companyType: about.companyType
    },
    aboutUsEdit: edit.aboutUs,
    mainEdit: edit.main
  }),
  { onEditAboutUsClicked }
)(AboutUs);
