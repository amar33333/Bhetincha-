import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import { Input, Image, Icon } from "semantic-ui-react";

import logo from "../../static/img/logo.png";

import "./home.css";

class Home extends Component {
  render() {
    return (
      <div className="body-wrapper">
        <div className="home-page__header">
          <Button
            className="login-btn"
            // onClick={this.toggleLoginModal}
            variant="raised"
            color="primary"
          >
            Login
          </Button>
          <Button
            // onClick={this.toggleRegisterModal}
            variant="raised"
            color="warning"
          >
            Register
          </Button>
        </div>
        <div className="centered">
          <div className="home_page__centered__wrapper">
            <Row className="home-page__logo">
              <Col xs="8" md="6">
                <Image src={logo} size="large" />
              </Col>
            </Row>
            <Row className="home-page__searchbar">
              <Col xs="8" md="6">
                <Input
                  fluid
                  className="home-page__searchbar__input"
                  icon="search"
                  placeholder="Search..."
                />
              </Col>
            </Row>
            <Row className="home-page__category">
              <Col xs="12" md="10">
                {/* <span className="fa fa-atm home-page__category__icon" /> */}
                <Icon
                  name="payment"
                  size="large"
                  color="grey"
                  className="home-page__category__icon"
                />{" "}
                <span>ATM Lounges </span>
                <Icon
                  name="hospital"
                  size="large"
                  color="grey"
                  className="home-page__category__icon"
                />{" "}
                <span>Hospitals </span>
                <Icon
                  name="ambulance"
                  size="large"
                  color="grey"
                  className="home-page__category__icon"
                />{" "}
                <span>Ambulance </span>
                <Icon
                  name="food"
                  size="large"
                  color="grey"
                  className="home-page__category__icon"
                />{" "}
                <span>Restaurant </span>
                <Icon
                  name="university"
                  size="large"
                  color="grey"
                  className="home-page__category__icon"
                />{" "}
                <span>University </span>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
