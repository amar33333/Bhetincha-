import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Container, Button, Col, Row, Input, Form } from "reactstrap";
import LaddaButton, { S, EXPAND_RIGHT } from "react-ladda";
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

const languages = [
  {
    name: "C",
    year: 1972
  },
  {
    name: "C#",
    year: 2000
  },
  {
    name: "C++",
    year: 1983
  },
  {
    name: "Clojure",
    year: 2007
  },
  {
    name: "Elm",
    year: 2012
  },
  {
    name: "Go",
    year: 2009
  },
  {
    name: "Haskell",
    year: 1990
  },
  {
    name: "Java",
    year: 1995
  },
  {
    name: "Javascript",
    year: 1995
  },
  {
    name: "Perl",
    year: 1987
  },
  {
    name: "PHP",
    year: 1995
  },
  {
    name: "Python",
    year: 1991
  },
  {
    name: "Ruby",
    year: 1995
  },
  {
    name: "Scala",
    year: 2003
  }
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : languages.filter(
        lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      result: "",
      value: "",
      suggestions: []
    };
  }

  // testing auto suggestions

  onChanges = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  onSuggestionsFetchRequested;
  // testing auto suggestions

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

    // testing auto suggest

    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Search",
      value,
      onChange: this.onChanges
    };
    //testing auto suggest

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
          <Row>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
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
