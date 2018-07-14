import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Button,
  Input
} from "reactstrap";

import Select from "react-select";

import { onUsersNotPaginatedList, onUserEdit } from "../../../actions";
import { Loading } from "../../../../Common/pages";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
      new_password: "",
      conf_new_password: ""
    };

    this.handleUserListChange = this.handleUserListChange.bind(this);
  }

  componentDidMount() {
    this.props.onUsersNotPaginatedList();
  }

  handleUserListChange(selectedOption) {
    this.setState({ selectedOption });
  }

  onPasswordChangedBtnClick() {
    const {
      new_password: password,
      conf_new_password,
      selectedOption: { id }
    } = this.state;

    if (password === conf_new_password)
      this.props.onUserEdit({
        id,
        body: {
          password
        }
      });
    else toast.error("Password Mismatch !!! ");
  }

  onChange(field, e) {
    const value = e.target.value;

    this.setState({ [field]: value });
  }

  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.id;
    console.log("reset state: ", this.state);

    return !this.props.usersFetchLoading ? (
      <div className="animated fadeIn">
        {/* <PermissionProvider permission="CAN_VIEW_SETTINGS"> */}
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
                        placeholder="Select A User"
                        onChange={this.handleUserListChange}
                        options={this.props.usersNotPaginatedList}
                        valueKey="id"
                        labelKey="username"
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
                        onChange={this.onChange.bind(this, "conf_new_password")}
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
        {/* </PermissionProvider> */}
      </div>
    ) : (
      <Loading />
    );
  }
}

export default connect(
  ({
    AdminContainer: {
      user_reducer: { usersNotPaginatedList, usersFetchLoading }
    }
  }) => ({
    usersNotPaginatedList,
    usersFetchLoading
  }),
  {
    onUsersNotPaginatedList,
    onUserEdit
  }
)(ResetPassword);
