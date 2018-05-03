import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";

import "react-quill/dist/quill.snow.css";
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
      <Container id="about-us">
        <Row>
          <Col xs="12" md="12" className="minisite_heading__text_wrapper">
            <h3 className="minisite_heading__text">About us</h3>
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
  ({ MinisiteContainer: { crud: { about }, edit } }) => ({
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
