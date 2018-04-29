import React, { Component } from "react";
import { connect } from "react-redux";

import { Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";

import { onCompanyTypeList } from "../../actions";

import SubBusinessDetails from "./SubBusinessDetails";
import SubBusinessAbout from "./SubBusinessAbout";

class BusinessEdit extends Component {
  state = {};

  access_token = this.props.cookies
    ? this.props.cookies.token_data.access_token
    : null;

  componentDidMount() {
    this.props.onCompanyTypeList({ access_token: this.access_token });
  }

  static getDerivedStateFromProps = nextProps => nextProps;

  render() {
    console.log("nextprops state: ", this.state);
    console.log("new props: ", this.props);

    return (
      <div className="animated fadeIn">
        <Col>
          <Card>
            <CardHeader>
              <strong>Edit Your Business</strong>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.onFormSubmit}>
                <SubBusinessDetails
                  ref={ref => (this.subBusinessAdminDetailRef = ref)}
                  {...this.props}
                />
                <SubBusinessAbout
                  ref={ref => (this.subBusinessAboutRef = ref)}
                  {...this.state.data.about}
                  company_types={this.props.company_types}
                  edit
                />
                <Row>
                  <Col xs="12">
                    <Button color="primary" size="lg">
                      EDIT
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
  ({ AdminContainer: { business_reducer }, auth }) => ({
    company_types: business_reducer.company_types,
    ...auth
  }),
  { onCompanyTypeList }
)(BusinessEdit);
