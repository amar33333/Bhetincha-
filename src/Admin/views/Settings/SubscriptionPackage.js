import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  FormGroup,
  Label
} from "reactstrap";

import Select from "react-select";

import {
  onSubscriptionPackagePermissionsList,
  onSubscriptionPackageList,
  onSubscriptionPackageSubmit
} from "../../actions";

import { ErrorHandling } from "../../../Common/utils/Extras";

class SubscriptionPackage extends Component {
  state = {
    name: "",
    subscriptionPackagePermission: [],
    indexScoring: 0.0,
    submit: false
  };

  componentDidMount() {
    this.props.onSubscriptionPackagePermissionsList();
    this.props.onSubscriptionPackageList();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.submit && !this.props.subscriptionPackageLoading) {
      const updates = { submit: false };
      if (!this.props.subscriptionPackageError) {
        updates.name = "";
        updates.subscriptionPackagePermission = [];
        updates.indexScoring = 0.0;
      }
      this.setState(updates, () => this.focusableInput.focus());
    }
  };

  onChange = (key, event) => {
    if (key === "name")
      this.setState({
        [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
      });
    else
      this.setState({
        [key]: event.target.value
      });
  };

  handleSelectChange = subscriptionPackagePermission =>
    this.setState({ subscriptionPackagePermission });

  onFormSubmit = event => {
    event.preventDefault();

    const { name, subscriptionPackagePermission, indexScoring } = this.state;

    this.setState({ submit: true }, () => {
      this.props.onSubscriptionPackageSubmit({
        body: {
          name,
          packagePermissions: subscriptionPackagePermission.map(
            each => each.name
          ),
          indexScoring
        }
      });
    });
  };

  render() {
    // console.log("oprop: ", this.props);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="6">
            {/* <PermissionProvider permission="CAN_ADD_SOCIAL_LINKS"> */}
            <Card>
              <CardHeader>
                <strong>Add New Subscription Package</strong>
              </CardHeader>
              <CardBody>
                <form onSubmit={this.onFormSubmit}>
                  <InputGroup className="mb-2">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Package Name</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      autoFocus
                      ref={ref => (this.focusableInput = ref)}
                      type="text"
                      required
                      placeholder="Subscription Package Name"
                      value={this.state.name}
                      onChange={this.onChange.bind(this, "name")}
                    />
                  </InputGroup>
                  <ErrorHandling
                    error={
                      this.props.subscriptionPackageError &&
                      this.props.subscriptionPackageError.name
                    }
                  />
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label for="Subscription Package">
                          Subscription Package
                        </Label>
                        <Select
                          clearable
                          required
                          multi
                          placeholder="Select Multiple Package Permissions"
                          noResultsText="No Packages Found"
                          name="Subscription Package"
                          value={this.state.subscriptionPackagePermission}
                          options={
                            this.props.subscriptionPackagePermissionsList
                          }
                          onChange={this.handleSelectChange}
                          valueKey="id"
                          labelKey="name"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <InputGroup className="mb-2">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Index Score</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      required
                      placeholder="Enter Index Score (Eg. 0.5)"
                      value={this.state.indexScoring}
                      onChange={this.onChange.bind(this, "indexScoring")}
                    />
                  </InputGroup>
                  <Button
                    type="submit"
                    color="primary"
                    value="Add Group"
                    disabled={this.props.subscriptionPackageLoading}
                  >
                    <i className="fa fa-plus" />Add Subscription Package
                  </Button>
                </form>
              </CardBody>
            </Card>
            {/* </PermissionProvider> */}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({
  AdminContainer: {
    settings: {
      subscriptionPackagePermissionsList,
      subscriptionPackageLoading,
      subscriptionPackageList,
      subscriptionPackageEditError,
      subscriptionPackageError
    }
  }
}) => ({
  subscriptionPackagePermissionsList,
  subscriptionPackageLoading,
  subscriptionPackageList,
  subscriptionPackageEditError,
  subscriptionPackageError
});

export default connect(
  mapStateToProps,
  {
    onSubscriptionPackagePermissionsList,
    onSubscriptionPackageSubmit,
    onSubscriptionPackageList
  }
)(SubscriptionPackage);
