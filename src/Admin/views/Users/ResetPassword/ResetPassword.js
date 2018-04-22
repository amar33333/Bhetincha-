import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";

import axios from "axios";
import { USERS_URL } from "../../../utils/API";
import { getTokenData, getAccessToken } from "../../../utils/CookiesProvider";
import PermissionProvider from "../../../utils/PermissionProvider";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedOption: "",
      new_password: "",
      conf_new_password: ""
    };

    this.handleUserListChange = this.handleUserListChange.bind(this);
  }

  componentWillMount() {
    console.log("reset passowrd will mount ran");
    const access_token = getAccessToken();
    console.log("cessss: ", access_token);
    this.setState({ access_token: access_token }, () => {
      this.getUsers();
    });
  }

  getUsers() {
    // console.log("asdasd: ", this.state.access_token);
    axios({
      method: "get",
      url: `${USERS_URL}/`,
      headers: {
        Authorization: "Bearer " + this.state.access_token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        console.log("settings: response ", response);
        this.setState({
          users: response.data.map(user => {
            return { value: user.id, label: user.username };
          })
        });
        toast.success("Users Fetched Successfully!");
      })
      .catch(error => {
        console.log("users fetch error: ", error);
        toast.error("Error Fetching Users!");
      });
  }

  handleUserListChange(selectedOption) {
    this.setState({ selectedOption });
    console.log(`Selected SETTINGS: ${selectedOption.label}`);
  }

  onPasswordChangedBtnClick() {
    console.log("asdasd: ", `${USERS_URL}/${this.state.selectedOption.value}`);
    console.log("accses: ", this.state.access_token);
    console.log("passasda: ", this.state.new_password);
    if (this.state.new_password === this.state.conf_new_password) {
      axios({
        method: "put",
        url: `${USERS_URL}/${this.state.selectedOption.value}/`,
        headers: {
          Authorization: "Bearer " + this.state.access_token,
          "Content-Type": "application/json"
        },
        data: {
          password: this.state.new_password
        }
      })
        .then(response => {
          toast.success("Password Updated Successfully!");
        })
        .catch(error => {
          console.log("password change error: ", error);
          toast.error("Error: Password Not Updated!");
        });
    } else {
      toast.error("Error: Password Not Confirmed! Please Enter Again.");
    }
  }

  onChange(field, e) {
    const value = e.target.value;
    if (field === "vat" || field === "service_charge" || field === "discount") {
      if (!isNaN(value)) this.setState({ [field]: value });
    } else {
      this.setState({ [field]: value });
    }
  }

  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;

    return (
      <div className="animated fadeIn">
        <ToastContainer />
        <PermissionProvider permission="CAN_VIEW_SETTINGS">
          <Row className="justify-content-center">
            <Col xs="12" md="6">
              <Card>
                <CardHeader>
                  <strong>Reset Password</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label htmlFor="pan_no">Select user</Label>
                        <Select
                          autoFocus
                          required
                          name="Users"
                          value={value}
                          onChange={this.handleUserListChange}
                          options={this.state.users}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label htmlFor="pan_no">New Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={this.state.new_password}
                          onChange={this.onChange.bind(this, "new_password")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label htmlFor="pan_no">Confirm New Password</Label>
                        <Input
                          id="confirmpassword"
                          type="password"
                          value={this.state.conf_new_password}
                          onChange={this.onChange.bind(
                            this,
                            "conf_new_password"
                          )}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <Button
                        color="primary"
                        size="lg"
                        onClick={this.onPasswordChangedBtnClick.bind(this)}
                      >
                        Change Password
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </PermissionProvider>
      </div>
    );
  }
}

export default ResetPassword;
