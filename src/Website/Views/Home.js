import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Container, Button, Col, Row, Input, Form } from "reactstrap";
import LaddaButton, { S, EXPAND_RIGHT } from "react-ladda";
import { connect } from "react-redux";

import logo from "../../static/img/logo.png";
import "./home.css";

import CustomModal from "../../Common/components/CustomModal";
import LoginModal from "../../Common/components/CustomModal/ModalTemplates/LoginModal";
import RegisterModal from "../../Common/components/CustomModal/ModalTemplates/RegisterModal";

import { Avatar } from "../components";

import {
  toggleLoginModal,
  toggleRegisterModal,
  onSearchQuerySubmit
} from "../actions";

import { BottomFooter } from "../components";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { query: "", result: "" };
  }

  onChange = event => this.setState({ query: event.target.value });

  onSearchQuerySubmit = event => {
    event.preventDefault();
    const { query } = this.state;
    this.props.onSearchQuerySubmit({ query });
  };

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
    const result = this.props.search_result.data
      ? this.props.search_result.data.hits.hits.length !== 0
        ? this.props.search_result.data.hits.hits[0]._source.name
        : "Data Not Found"
      : "";

    return (
      <div className="body-wrapper">
        {this.renderLoginRegister()}
        <Container className="full-height">
          <Row>
            <Col xs="12" className="centered">
              <img alt="logo" src={logo} className="home-page__logo" />
            </Col>
          </Row>
          <Form onSubmit={this.onSearchQuerySubmit}>
            <Row>
              <Col xs="12" className="home-page__searchbar ">
                <Input
                  autoFocus
                  //fluid // warning says this is not a boolean
                  className="home-page__searchbar__input centered"
                  icon="search"
                  placeholder="Search anything..."
                  value={this.state.query}
                  onChange={this.onChange}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12" className="centered">
                <LaddaButton
                  loading={this.props.search_result.loading}
                  data-size={S}
                  data-style={EXPAND_RIGHT}
                  className="mt-3"
                >
                  अवश्य भेटिन्छ
                </LaddaButton>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col className="centered">{result}</Col>
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
