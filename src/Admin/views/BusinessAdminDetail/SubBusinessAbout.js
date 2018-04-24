import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Row,
  Col,
  Input,
  Label,
  FormGroup,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";

import Select from "react-select";

import { onCompanyTypeList } from "../../actions";

class SubBusinessAbout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      about_us_tagline: "",
      about_us: "",
      established_year: "",
      company_type: ""
    };

    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;
  }

  componentWillMount() {
    this.props.onCompanyTypeList({ access_token: this.access_token });
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.onSubmit) this.props.onSubmit(nextState);
  }

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });
  };

  clearState = () => {
    this.setState({
      about_us_tagline: "",
      about_us: "",
      established_year: "",
      company_type: ""
    });
  };

  render() {
    const companyTypes = this.props.company_types
      ? this.props.company_types.map(companyType => {
          return { value: companyType.id, label: companyType.name };
        })
      : null;

    const { company_type } = this.state;
    const valueCompanyType = company_type && company_type.value;

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>About Us</strong>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="12" md="12">
                <FormGroup>
                  <Label for="About_Tagline">Tagline</Label>
                  <Input
                    required
                    type="text"
                    value={this.state.about_us_tagline}
                    onKeyDown={this._handleKeyPress}
                    onChange={this.onChange.bind(this, "about_us_tagline")}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="about_us">About Us</Label>
                  <Input
                    required
                    type="text"
                    value={this.state.about_us}
                    onKeyDown={this._handleKeyPress}
                    onChange={this.onChange.bind(this, "about_us")}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="year">Established Year</Label>
                  <Input
                    required
                    type="text"
                    value={this.state.established_year}
                    onKeyDown={this._handleKeyPress}
                    onChange={this.onChange.bind(this, "established_year")}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="company_type">Company Type</Label>
                  <Select
                    required
                    name="Company Type"
                    placeholder="Select Your Company Type"
                    noResultsText="No Data Found"
                    value={valueCompanyType}
                    onChange={this.handleSelectChange.bind(
                      this,
                      "company_type"
                    )}
                    options={companyTypes}
                  />
                </FormGroup>
                {/* <FormGroup check>
                          <Label for="visible_to_public" check>
                            <Input type="checkbox" /> Visible To Public
                          </Label>
                        </FormGroup> */}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { business_reducer }, auth }) => ({
    ...business_reducer,
    ...auth
  }),
  {
    onCompanyTypeList
  }
)(SubBusinessAbout);
