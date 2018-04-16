import React, { Component } from "react";
import { BottomFooter, MainNavbar } from "../../components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BusinessNav, BusinessFooter, AboutEditor } from "./components";
import banner from "../../../static/img/banner.jpg";
import logo from "../../../static/img/avatar.jpg";
import { Container, Row, Col } from "reactstrap";

import { handleAboutUsSaved } from "./actions";

import "react-quill/dist/quill.snow.css";
import "./minisite.css";

import withReducer from "../../../config/withReducer";
import reducers from "./reducers";

class Minisite extends Component {
  renderUploadOverlay = () => (
    <div className="minisite_banner__img__change__overlay">
      <Link to="#">
        <span className="fa fa-camera">
          <strong> Upload New Banner</strong>
        </span>
      </Link>
    </div>
  );

  renderAboutEdit = () => (
    <span className="minisite_about__edit__icon">
      <Link to="#">
        <i aria-hidden="true" className="fa fa-pencil" />
      </Link>
    </span>
  );

  render() {
    return (
      <div>
        <MainNavbar />
        <BusinessNav
          logo={logo}
          businessName={this.props.match.params.businessName}
        />
        <div className="minisite_banner__wrapper">
          <img className="minisite_banner__img" src={banner} alt="banner" />
          {this.props.minisite.edit && this.renderUploadOverlay()}
        </div>
        <div className="body-wrapper">
          <Container>
            <Row>
              <Col xs="12" md="12" className="minisite_heading__text_wrapper">
                <h3 className="minisite_heading__text">About us</h3>
                {this.props.minisite.edit && this.renderAboutEdit()}
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12">
                {this.props.minisite.edit ? (
                  <AboutEditor
                    initialValue={this.props.minisite.data.aboutUs}
                    onAboutUsSaved={this.props.handleAboutUsSaved}
                  />
                ) : (
                  <div
                    className="quill ql-editor"
                    dangerouslySetInnerHTML={{
                      __html: this.props.minisite.data.aboutUs
                    }}
                  />
                )}
              </Col>
            </Row>
          </Container>
        </div>
        <BusinessFooter theme="dark" />
      </div>
    );
  }
}

export default withReducer("MinisiteContainer", reducers)(
  connect(
    ({ MinisiteContainer: { minisite } }) => ({
      minisite
    }),
    { handleAboutUsSaved }
  )(Minisite)
);
