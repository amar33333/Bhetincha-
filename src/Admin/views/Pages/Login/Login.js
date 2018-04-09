import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import { Link } from "react-router-dom";
import { createHashHistory } from "history";
import axios from "axios";
import querystring from "querystring";
import Cookie from "universal-cookie";

//motu
// const clientId = 'i8GtC2hMxtrw4iNT5QRaen85W8njqf5j9ZxbJmFL';
// const clientSecret = 'A3qrbTFHhbRvcbzeZJWhcc0MPJq415uKqawJdCQq4CgZQTqOzGgAb5xSl7ULYEiyzXvZ4DFToJv52NxP6uqkYdSZDj9W4WumGVUkaXzspXxiItDwP2UgrL4aUGLaZtz4';

//dari
// const clientId = 'BZx9Ui0JbFvPhfHjpsKEegYudnWCcwxTG75RdSiu';
// const clientSecret = '8SJ3j43fGnpVxCvZHBq3TvQlsHsJu1jrVYyJKsJav0EXmWMjVNYkGjWM07yGKgrumOOkHToXpS6OhHeBxso4uaWf1m3NDRAVtBgv4l2wJoCb7MpD2BEXgR2mzshyCQ5L';

// mine
const clientId = "SMGueGLZ416OUdko14H6g62M8dfwnxEJZ69TmlxU";
const clientSecret =
  "jgU2qEuQC9iP2P9qaXJg1XHmHf1jKFyz1vTf4nq3kj6DLQOZbtYRag9CCewV7xoJGmQFM4LOJQyUem06Ae7lXG3CTqkC6D56uN11FiyQigS0Yi2t3TmLkGmUVJ1BIyWM";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { username: "", password: "" };

    const cookies = new Cookie();

    this.onLoginBtnClick = this.onLoginBtnClick.bind(this);
    this.onForgotPassBtnClick = this.onForgotPassBtnClick.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFail = this.onLoginFail.bind(this);

    // axios.post('http://192.168.100.108:8000/api/accounts/user/',null,
    //    {
    //          headers: { Authorization : "Bearer " + '0NhZhyv902ZtQ2j3nRZ6ErgT9VdYz9' }

    //      }
    //    )
    //    .then(function (response) {
    //    console.log(response);
    //    })
    //    .catch(function (error) {
    //    console.log(error);
    //    });
  }

  requestData(access_token) {
    axios({
      method: "get",
      url: "http://192.168.100.3:8000/api/accounts/user/",
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        console.log("response_data: ", response);
      })
      .catch(error => {
        console.log("error_data: ", error);
      });
  }

  onLoginBtnClick() {
    console.log("Login Button Clicked");
    // axios.post('http://192.168.100.108:8000/o/token', {
    //         username: username,
    //         password: password
    // })
    // .then(this.onLoginSuccess.bind(this))
    // .catch(this.onLoginFail.bind(this));

    // return (<Redirect to="/dashboard" />);

    const { username, password } = this.state;

    if (username.length && password.length) {
      axios
        .post(
          "http://192.168.100.3:8000/o/token/",
          querystring.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: "password",
            username: this.state.username,
            password: this.state.password
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(this.onLoginSuccess)
        .catch(this.onLoginFail);
    } else {
      console.log("username or password empty");
    }
  }

  onLoginSuccess(response) {
    console.log("respose token: ", response);

    const cookies = new Cookie();
    const token_data = response.data;

    cookies.set("token_data", token_data, { path: "/" });

    this.requestData(response.data.access_token);
    const history = createHashHistory();

    this.props.history.push("/dashboard");
  }

  onLoginFail(error) {
    console.log("error token: ", error);
  }

  onForgotPassBtnClick() {
    console.log("Forgot Password Clicked");
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.onUsernameChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                        placeholder="Password"
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button
                          color="primary"
                          className="px-4"
                          onClick={() => this.onLoginBtnClick()}
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
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: 44 + "%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <Button color="primary" className="mt-3" active>
                        Register Now!
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
