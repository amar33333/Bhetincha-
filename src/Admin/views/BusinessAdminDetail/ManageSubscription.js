import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label
} from "reactstrap";

import Select from "react-select";

import {
  onSubscriptionPackageList,
  onSubscriptionPackageAssignSubmit,
  onSubscriptionPackageAssignList
} from "../../actions";

import { ErrorHandling } from "../../../Common/utils/Extras";

class ManageSubscription extends Component {
  state = {
    subscriptionPackage: []
  };

  componentDidMount() {
    this.props.onSubscriptionPackageAssignList({
      id: this.props.match.params.businessSlug
    });
    this.props.onSubscriptionPackageList();
  }

  componentDidUpdate = prevProps => {
    if (
      this.props.subscriptionPackageAssignList !==
      prevProps.subscriptionPackageAssignList
    ) {
      this.setState({
        subscriptionPackage: this.props.subscriptionPackageAssignList
      });
    }
  };

  handleSelectChange = subscriptionPackage =>
    this.setState({ subscriptionPackage });

  onFormSubmit = event => {
    event.preventDefault();

    this.props.onSubscriptionPackageAssignSubmit({
      body: {
        subscriptionPackage: this.state.subscriptionPackage.id
      },
      id: this.props.match.params.businessSlug
    });
  };

  render() {
    console.log("props: ", this.props);
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Assign Subscription Package</strong>
          </CardHeader>
          <CardBody>
            <form onSubmit={this.onFormSubmit}>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label for="Social Links">Subscription Packages</Label>
                    <Select
                      autoFocus
                      clearable
                      required
                      placeholder="Select Multiple Subscription Package"
                      name="ManageSubscription"
                      value={
                        this.state.subscriptionPackage &&
                        this.state.subscriptionPackage.id
                      }
                      onChange={this.handleSelectChange}
                      options={this.props.subscriptionPackageList}
                      valueKey="id"
                      labelKey="name"
                    />
                  </FormGroup>
                  <ErrorHandling
                    error={this.props.subscriptionPackageAssignError}
                  />
                </Col>
              </Row>

              <Button
                type="submit"
                color="primary"
                value="Add Group"
                disabled={this.props.subscriptionPackageAssignLoading}
              >
                <i className="fa fa-plus" /> Assign Subscription Package
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({
  auth: { cookies },
  AdminContainer: {
    settings: {
      subscriptionPackageList,
      subscriptionPackageAssignError,
      subscriptionPackageAssignList,
      subscriptionPackageAssignLoading
    }
  }
}) => {
  return {
    cookies,
    subscriptionPackageAssignError,
    subscriptionPackageAssignList,
    subscriptionPackageList,
    subscriptionPackageAssignLoading
  };
};

export default connect(
  mapStateToProps,
  {
    onSubscriptionPackageList,
    onSubscriptionPackageAssignSubmit,
    onSubscriptionPackageAssignList
  }
)(ManageSubscription);
