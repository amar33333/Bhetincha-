import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Button, Col, Row, Input } from "reactstrap";

import logo from "../../static/img/logo.png";
import "./home.css";

import CustomModal from "../../Common/components/CustomModal";
import LoginModal from "../../Common/components/CustomModal/ModalTemplates/LoginModal";
import RegisterModal from "../../Common/components/CustomModal/ModalTemplates/RegisterModal";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModal: false,
      registerModal: false
    };
  }

  toggleLoginModal = () => {
    this.setState({
      loginModal: !this.state.loginModal
    });
  };

  toggleRegisterModal = () => {
    this.setState({
      registerModal: !this.state.registerModal
    });
  };

  render() {
    return (
      <div className="body-wrapper">
        <div className="home-page__header">
          <Button
            className="login-btn"
            onClick={this.toggleLoginModal}
            variant="raised"
            color="primary"
          >
            Login
          </Button>

          <CustomModal
            isOpen={this.state.loginModal}
            toggle={this.toggleLoginModal}
            className={"modal-xs" + this.props.className}
          >
            <LoginModal />
          </CustomModal>

          <CustomModal
            isOpen={this.state.registerModal}
            toggle={this.toggleRegisterModal}
            className={"register_modal " + this.props.className}
          >
            <RegisterModal />
          </CustomModal>

          <Button
            onClick={this.toggleRegisterModal}
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
                <img alt="logo" src={logo} size="large" />
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
            {/* <Row className="home-page__category">
              <Col xs="12" md="10">
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
            </Row> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
