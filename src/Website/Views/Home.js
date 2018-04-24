import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Container, Button, Col, Row, Input } from "reactstrap";
import { Link } from "react-router-dom";
// import LaddaButton, { S, EXPAND_RIGHT } from "react-ladda";
import { connect } from "react-redux";

import logo from "../../static/img/logo.png";
import "./home.css";

import CustomModal from "../../Common/components/CustomModal";
import LoginModal from "../../Common/components/CustomModal/ModalTemplates/LoginModal";
import RegisterModal from "../../Common/components/CustomModal/ModalTemplates/RegisterModal";

import { Avatar, AutoSuggestion } from "../components";

import {
  toggleLoginModal,
  toggleRegisterModal,
  onSearchQuerySubmit
} from "../actions";

import { BottomFooter } from "../components";

class Home extends Component {
  state = { query: "", result: "" };

  renderLoginRegister = () =>
    !this.props.cookies ? (
      <div className="home-page__header">
        <Button
          className="login-btn"
          onClick={this.props.toggleLoginModal}
          variant="raised"
          color="primary"
        >
          Login
        </Button>

        <CustomModal
          isOpen={this.props.loginModal}
          toggle={this.props.toggleLoginModal}
          className={"modal-xs" + this.props.className}
        >
          <LoginModal {...this.props} />
        </CustomModal>

        <CustomModal
          isOpen={this.props.registerModal}
          toggle={this.props.toggleRegisterModal}
          className={"register_modal " + this.props.className}
        >
          <RegisterModal {...this.props} />
        </CustomModal>

        <Button
          onClick={this.props.toggleRegisterModal}
          variant="raised"
          color="warning"
        >
          Register
        </Button>
      </div>
    ) : (
      <div className="home-page__header">
        <Avatar />
      </div>
    );

  render() {
    return (
      <div className="body-wrapper">
        {this.renderLoginRegister()}
        <Container className="full-height">
          <Row>
            <Col xs="12" className="centered">
              <img alt="logo" src={logo} className="home-page__logo" />
            </Col>
          </Row>
          <Row>
            <AutoSuggestion
              placeholder="Search anything..."
              valueKey="business_name"
              suggestions={this.props.search_result.data}
              onSuggestionsFetchRequested={this.props.onSearchQuerySubmit}
              onSearchItemSelected={business => {
                this.props.history.push(`/${business.user}`);
              }}
              onSearchComplete={keyword => {
                this.props.history.push({
                  pathname: "/businesses",
                  search: `?query=${keyword}`
                  // state: { detail: response.data }
                });
              }}
            />
          </Row>
        </Container>
        <BottomFooter theme="light" extraClass="bottom-footer__home" />
      </div>
    );
  }
}

export default connect(
  ({ auth: { cookies }, home, search_result }) => ({
    cookies,
    ...home,
    search_result
  }),
  {
    toggleLoginModal,
    toggleRegisterModal,
    onSearchQuerySubmit
  }
)(Home);
