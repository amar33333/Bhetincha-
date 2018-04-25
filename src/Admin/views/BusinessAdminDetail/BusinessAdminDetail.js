import React, { Component } from "react";
import { connect } from "react-redux";

import { Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";

import { onBusinessCreate } from "../../actions";

import SubBusinessDetails from "./SubBusinessDetails";
import SubBusinessPrimaryAddress from "./SubBusinessPrimaryAddress";
import SubBusinessLogo from "./SubBusinessLogo";
import SubBusinessCoverImage from "./SubBusinessCoverImage";
import SubBusinessContact from "./SubBusinessContact";
import SubBusinessAbout from "./SubBusinessAbout";
import SubBusinessBranchWrapper from "./SubBusinessBranchWrapper";

class BusinessAdminDetail extends Component {
  constructor(props) {
    super(props);

    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;

    this.propsData = {};
  }

  onFormSubmit = event => {
    event.preventDefault();
    console.log("this propsData: ", this.propsData);
    this.props.onBusinessCreate({
      data: this.propsData,
      access_token: this.access_token
    });
    console.log("this chidl ", this.child);
    // this.child.clearState();
  };

  _handleKeyPress = event => {
    this.setState({ event });
    // // console.log('eventasdsa: ', this.state.event);

    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);

    if (
      (event.keyCode === 13 || event.keyCode === 40) &&
      form.elements[index].type !== "submit"
    ) {
      // // console.log('enter & down');

      form.elements[index + 1].focus();
      event.preventDefault();
    }

    if (event.keyCode === 38) {
      // // console.log('up');
      // const form = event.target.form;
      // const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index - 1].focus();
      // form.elements[index - 1].click();
      event.preventDefault();
    }
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Col>
          <Card>
            <CardHeader>
              <strong>Add New Business</strong>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.onFormSubmit}>
                <SubBusinessDetails
                  ref={instance => {
                    this.child = instance;
                  }}
                  onSubmit={value => {
                    this.propsData = { ...this.propsData, ...value };
                  }}
                />
                <SubBusinessPrimaryAddress
                  onSubmit={value => {
                    this.propsData = { ...this.propsData, ...value };
                  }}
                />
                {/* <SubBusinessBranchWrapper
                  onSubmit={value => {
                    this.propsData = { ...this.propsData, ...value };
                    console.log("albumprops: ", this.propsData);
                  }}
                /> */}
                <SubBusinessLogo
                  onSubmit={value => {
                    this.propsData = { ...this.propsData, ...value };
                  }}
                />
                <SubBusinessCoverImage
                  onSubmit={value => {
                    this.propsData = { ...this.propsData, ...value };
                  }}
                />
                <SubBusinessContact
                  onSubmit={value => {
                    this.propsData = { ...this.propsData, ...value };
                  }}
                />
                <SubBusinessAbout
                  onSubmit={value => {
                    this.propsData = { ...this.propsData, ...value };
                  }}
                />
                <Row>
                  <Col xs="12">
                    <Button
                      color="primary"
                      onKeyDown={this._handleKeyPress}
                      size="lg"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </form>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default connect(
  ({ auth }) => ({
    ...auth
  }),
  {
    onBusinessCreate
  }
)(BusinessAdminDetail);
