import React, { Component } from "react";
import { BottomFooter, MainNavbar } from "../../components";
import BusinessNav from "./components/BusinessNav";
import banner from "../../../static/img/banner.jpg";
import logo from "../../../static/img/avatar.jpg";
import { Container, Row, Col } from "reactstrap";

import "./minisite.css";
import BusinessFooter from "./components/BusinessFooter";

class Minisite extends Component {
  // const BUSINESSNAME = this.props.match.params.businessName;
  componentWillMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <MainNavbar name={this.props.match.params.businessName} />
        <BusinessNav logo={logo} name={this.props.match.params.businessName} />
        <img className="minisite_banner__img" src={banner} alt="banner" />
        <div className="body-wrapper">
          <Container>
            <Row>
              <Col xs="12" md="12">
                <h3 className="minisite_heading__text"> About us </h3>
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

export default Minisite;
