import React, { Component } from "react";
import { Container, Button, Col, Row, Input } from "reactstrap";
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
import querystring from "querystring";

class Home extends Component {
  state = { query: "", result: "" };

  renderLoginRegister = () =>
    !this.props.cookies ? (
      <div className="home-page__header">
        <Button
          outline
          className="login-btn"
          onClick={this.props.toggleLoginModal}
          variant="raised"
          color="primary"
        >
          Login
        </Button>

        <CustomModal
          title="Login To Bhetincha"
          isOpen={this.props.loginModal}
          toggle={this.props.toggleLoginModal}
          className={"modal-xs" + this.props.className}
        >
          <LoginModal {...this.props} />
        </CustomModal>

        <CustomModal
          title="Register In Bhetincha"
          isOpen={this.props.registerModal}
          toggle={this.props.toggleRegisterModal}
          className={"register_modal " + this.props.className}
        >
          <RegisterModal {...this.props} />
        </CustomModal>

        <Button
          //onClick={this.props.toggleRegisterModal}
          onClick={() => this.props.history.push("/business-register")}
          variant="raised"
          color="success"
        >
          Register
        </Button>
      </div>
    ) : (
      <div
        className="home-page__header"
        style={{
          marginRight: "80px"
        }}
      >
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
          <Row className="centered">
            <Col xs="12" md="8" className="home-page__searchbar ">
              <AutoSuggestion
                placeholder="Search anything..."
                valueKey="business_name"
                autoFocus
                suggestions={this.props.search_result.data}
                onSuggestionsFetchRequested={this.props.onSearchQuerySubmit}
                // onSearchItemSelected={business => {
                //   this.props.history.push(`/${business.slug}`);
                // }}
                onSearchComplete={keyword => {
                  this.props.history.push({
                    pathname: "/businesses",
                    //query: keyword
                    //search: `?query=${keyword}&frm=0&size=5`
                    search: `?${querystring.stringify({
                      query: keyword
                      //frm: 0,
                      //size: 5
                    })}`
                    // state: { detail: response.data }
                  });
                }}
              />
            </Col>
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
