import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form
} from "reactstrap";

import { connect } from "react-redux";
import { onSubmit, onRequestLoginData } from "../../../../actions";

class LoginModal extends Component {
  state = { username: "", password: "" };

  // componentWillReceiveProps(nextProps, nextState) {
  //   console.log("this pros: ");
  // }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log("next prosp login: ", nextProps);

  //   // if (nextProps.statusClass === "fulfilled" && nextProps.data) {
  //   //   const { data } = nextProps.data;
  //   // }

  //   if (nextProps.statusClass === "fulfilled")
  //     nextProps.history.push("/admin/dashboard");

  //   return null;
  // }

  // requestData(access_token) {
  //   const cookies = new Cookie();

  //   axios({
  //     method: "get",
  //     url: "http://192.168.1.2:8000/api/accounts/getuserinfo/",
  //     headers: {
  //       Authorization: "Bearer " + access_token,
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(response => {
  //       console.log("response_data: ", response);
  //       cookies.set("user_data", response.data, {
  //         path: "/",
  //         expires: expiryDate
  //       });
  //       console.log("ccokies: ", cookies.get("user_data"));

  //       const history = createHashHistory();
  //       const path = "/" + response.data.username;
  //       console.log("sagar_login.js: ", path);
  //       this.props.history.push(path);
  //     })
  //     .catch(error => {
  //       console.log("error_data: ", error);
  //     });
  // }

  onForgotPassBtnClick = () => {
    console.log("Forgot Password Clicked");
  };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.onSubmit({ username, password });
  };

  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-user" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            autoFocus
            required
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.onChange.bind(this, "username")}
          />
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-lock" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            required
            type="password"
            value={this.state.password}
            onChange={this.onChange.bind(this, "password")}
            placeholder="Password"
          />
        </InputGroup>
        <Row>
          <Col xs="6">
            <Button
              color="primary"
              className="px-4"
              //onClick={() => this.onLoginBtnClick()}
            >
              Login
            </Button>
          </Col>
          <Col xs="6" className="text-right">
            <Button
              color="link"
              className="px-0"
              onClick={() => this.onForgotPassBtnClick()}
            >
              Forgot password?
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { ...auth };
};

export default connect(mapStateToProps, { onSubmit, onRequestLoginData })(
  LoginModal
);
