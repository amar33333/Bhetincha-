import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CircularProgressbar from "react-circular-progressbar";

import "react-quill/dist/quill.snow.css";
import "react-circular-progressbar/dist/styles.css";
import "../../minisite.css";

import { onEditAboutUsClicked } from "../../actions";

class AboutUs extends Component {
  state = { AsyncEditor: null };

  onEditClicked = () => {
    this.renderEditor();
    this.props.onEditAboutUsClicked();
  };

  renderAboutEdit = () => (
    <span className="minisite_about__edit__icon">
      <i
        onClick={this.onEditClicked}
        aria-hidden="true"
        className="fa fa-pencil"
      />
    </span>
  );

  renderEditor = () => {
    import("./AboutUsEdit").then(module =>
      this.setState({ AsyncEditor: module.default })
    );
  };

  render() {
    const AsyncEditor = this.state.AsyncEditor;
    return (
      <div id="about-us" className="minisite_about__wrapper">
        <Container>
          <Row>
            <Col xs="12" md="12" className="minisite_heading__text_wrapper">
              <h2 className="minisite_heading__text">
                <strong>About us</strong>
              </h2>
              {this.props.mainEdit && this.renderAboutEdit()}
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12">
              {this.props.mainEdit && this.props.aboutUsEdit ? (
                AsyncEditor ? (
                  <AsyncEditor initialValue={this.props.data} />
                ) : (
                  <div>Loading</div>
                )
              ) : (
                <div>
                  <div className="text-center">
                    <h2>&#8220;{this.props.data.tagline}&#8221;</h2>
                  </div>
                  <div
                    className="quill ql-editor"
                    dangerouslySetInnerHTML={{
                      __html: this.props.data.aboutUs
                    }}
                  />

                  <div>Established Year {this.props.data.establishedYear}</div>
                  {/* <div>Company Type {this.props.data.companyType}</div> */}
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <CircularProgressbar
                initialAnimation
                percentage={100}
                className="progressbar-blue"
                // textForPercentage={() => "90% is cool"}
              />
            </Col>
            <Col md="2">
              <CircularProgressbar
                initialAnimation
                percentage={20}
                className="progressbar-red"
                // textForPercentage={() => "90% is cool"}
              />
            </Col>
            <Col md="2">
              <CircularProgressbar
                initialAnimation
                percentage={40}
                className="progressbar-red"
                // textForPercentage={() => "90% is cool"}
              />
            </Col>
          </Row>
        </Container>
      </div>
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
      tagline: about.tagline || "",
      aboutUs: about.aboutUs || "",
      establishedYear: about.establishedYear || ""
      // companyType: about.companyType
    },
    aboutUsEdit: edit.aboutUs,
    mainEdit: edit.main
  }),
  { onEditAboutUsClicked }
)(AboutUs);
