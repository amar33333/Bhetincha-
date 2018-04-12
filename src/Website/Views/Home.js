import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Button, Col, Row, Input, Form } from "reactstrap";
import LaddaButton, { S, EXPAND_RIGHT } from "react-ladda";
import { connect } from "react-redux";

import logo from "../../static/img/logo.png";
import "./home.css";

import CustomModal from "../../Common/components/CustomModal";
import LoginModal from "../../Common/components/CustomModal/ModalTemplates/LoginModal";
import RegisterModal from "../../Common/components/CustomModal/ModalTemplates/RegisterModal";

import {
  toggleLoginModal,
  toggleRegisterModal,
  onSearchQuerySubmit
} from "../../actions";

class Home extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   loginModal: false,
  //   //   registerModal: false
  //   // };
  // }

  // toggleLoginModal = () => {
  //   this.setState({
  //     loginModal: !this.state.loginModal
  //   });
  // };

  // toggleRegisterModal = () => {
  //   this.setState({
  //     registerModal: !this.state.registerModal
  //   });
  // };

  constructor(props) {
    super(props);

    this.state = { query: "", result: "" };
  }

  onChange = event => {
    this.setState({ query: event.target.value });
  };

  onSearchQuerySubmit = event => {
    event.preventDefault();
    const { query } = this.state;
    this.props.onSearchQuerySubmit({ query });
  };

  render() {
    // console.log("home search_result: ", this.props.search_result);
    // const result = this.props.search_result.data
    //   ? this.props.search_result.data.hits.hits[0]._source.name
    //   : "";

    const result = this.props.search_result.data
      ? this.props.search_result.data.hits.hits.length !== 0
        ? this.props.search_result.data.hits.hits[0]._source.name
        : "Data Not Found"
      : "";

    return (
      <div className="body-wrapper">
        <div className="home-page__header">
          <Button
            className="login-btn"
            onClick={() => this.props.toggleLoginModal(!this.props.loginModal)}
            variant="raised"
            color="primary"
          >
            Login
          </Button>

          <CustomModal
            isOpen={this.props.loginModal}
            toggle={() => this.props.toggleLoginModal(!this.props.loginModal)}
            className={"modal-xs" + this.props.className}
          >
            <LoginModal {...this.props} />
          </CustomModal>

          <CustomModal
            isOpen={this.props.registerModal}
            toggle={() =>
              this.props.toggleRegisterModal(!this.props.registerModal)
            }
            className={"register_modal " + this.props.className}
          >
            <RegisterModal {...this.props} />
          </CustomModal>

          <Button
            onClick={() =>
              this.props.toggleRegisterModal(!this.props.registerModal)
            }
            variant="raised"
            color="warning"
          >
            Register
          </Button>
        </div>
        <Form onSubmit={this.onSearchQuerySubmit}>
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
                    autoFocus
                    //fluid // warning says this is not a boolean
                    className="home-page__searchbar__input"
                    icon="search"
                    placeholder="Search..."
                    value={this.state.query}
                    onChange={this.onChange}
                  />
                  <LaddaButton
                    loading={this.props.loading}
                    data-size={S}
                    data-style={EXPAND_RIGHT}
                  >
                    SEARCH
                  </LaddaButton>
                </Col>
              </Row>
              <Row>
                <Col>{result}</Col>
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
        </Form>
      </div>
    );
  }
}

export default connect(
  ({ auth, search_result }) => ({ ...auth, search_result }),
  {
    toggleLoginModal,
    toggleRegisterModal,
    onSearchQuerySubmit
  }
)(Home);
