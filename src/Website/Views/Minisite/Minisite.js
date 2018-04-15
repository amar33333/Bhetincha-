import React, { Component } from "react";
import { BottomFooter, MainNavbar } from "../../components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BusinessNav, BusinessFooter } from "./components";
import banner from "../../../static/img/banner.jpg";
import logo from "../../../static/img/avatar.jpg";
import { Container, Row, Col } from "reactstrap";

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
                <h3 className="minisite_heading__text"> About us </h3>
                {this.props.minisite.edit && this.renderAboutEdit()}
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12">
                <p className="text-center">
                  Mollit et et enim non quis cillum excepteur non enim commodo
                  excepteur.Aute in velit mollit labore eiusmod
                  exercitation.Incididunt labore aliqua sint proident ut ad esse
                  ex eu.Reprehenderit Lorem est reprehenderit consectetur
                  est.Quis irure eiusmod in labore.Lorem.Mollit et et enim non
                  quis cillum excepteur non enim commodo excepteur.Aute in velit
                  mollit labore eiusmod exercitation.Incididunt labore aliqua
                  sint proident ut ad esse ex eu.Reprehenderit Lorem est
                  reprehenderit consectetur est.Quis irure eiusmod in
                  labore.Lorem.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
        <BusinessFooter />
        <BottomFooter />
      </div>
    );
  }
}

export default withReducer("MinisiteContainer", reducers)(
  connect(({ MinisiteContainer: { minisite } }) => ({
    minisite
  }))(Minisite)
);
