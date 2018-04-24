import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Container, Button, Col, Row, Input } from "reactstrap";
import { Link } from "react-router-dom";
// import LaddaButton, { S, EXPAND_RIGHT } from "react-ladda";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";

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
    this.state = {
      query: "",
      result: "",
      value: ""
    };
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    console.log("cleared");
    this.setState({
      suggestions: []
    });
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

  getSuggestionValue = suggestion => {
    console.log("get yo hai");
    return suggestion.business_name;
  };

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => <div>{suggestion.business_name}</div>;

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
          {/* <Form onSubmit={this.onSearchQuerySubmit}> */}
          <Row>
            <Col xs="12" className="home-page__searchbar ">
              <Input
                // autoFocus
                //fluid // warning says this is not a boolean
                className="home-page__searchbar__input centered"
                icon="search"
                placeholder="Search anything..."
                value={this.state.query}
                onChange={event => {
                  this.setState({ query: event.target.value });
                  this.props.onSearchQuerySubmit({ query: event.target.value });
                }}
              />
            </Col>
          </Row>
          {this.props.search_result.loading && (
            <Row>
              <Col className="centered">Loading</Col>
            </Row>
          )}
          {this.state.query &&
            this.props.search_result.data.length === 0 && (
              <Row>
                <Col className="centered">Not Found</Col>
              </Row>
            )}
          {/* <Row>
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
          </Row> */}
          {/* </Form> */}
          {this.props.search_result.data.map(result => (
            <Link to={`/${result.user}`} key={result.user}>
              <Row>
                <Col className="centered">{result.business_name}</Col>
              </Row>
            </Link>
          ))}
          {/* <Row>
            <Col className="centered">{result}</Col>
          </Row> */}
          {/* </Row> */}
          <Row>
            {/* <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
            /> */}
            <Autosuggest
              // onKeyDown={() => console.log("key down")}
              suggestions={this.props.search_result.data}
              onSuggestionsFetchRequested={({ value }) => {
                console.log(value);
                this.props.onSearchQuerySubmit({ query: value });
              }}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              onSuggestionSelected={() => console.log("select vayo")}
              renderInputComponent={inputProps => (
                <div>
                  <form
                    onSubmit={event => {
                      event.preventDefault();
                      console.log("enter press vayo");
                    }}
                  >
                    <Input
                      {...inputProps}
                      // onKeyDown={() => console.log("key down vayo")}
                      autoFocus
                      style={{
                        border: "1px solid #aaa",
                        borderRadius: "0px"
                      }}
                    />
                  </form>
                </div>
              )}
              inputProps={{
                placeholder: "Search for business",
                value: this.state.value,
                onChange: (event, { newValue }) =>
                  this.setState({ value: newValue })
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
