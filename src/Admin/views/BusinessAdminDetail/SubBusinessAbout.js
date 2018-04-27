import React, { Component } from "react";

import {
  Row,
  Col,
  Input,
  Label,
  FormGroup,
  Card,
  CardHeader,
  CardBody,
  Collapse,
  Button
} from "reactstrap";

import Select from "react-select";

class SubBusinessAbout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      about_us_tagline: "",
      about_us: "",
      established_year: "",
      company_type: "",
      collapse: false
    };
  }
  toggleCollapse = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };
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

  getState = () => this.state;

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
          <CardHeader onClick={this.toggleCollapse}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <strong>About Us</strong>
              <Button
                color="primary"
                onClick={this.toggleCollapse}
                style={{
                  marginBottom: "0rem",
                  backgroundColor: "rgb(230, 228, 241)",
                  color: "black",
                  fontSize: "1.3rem",
                  border: "1px solid #2e219036",
                  borderRadius: "50%",
                  height: "30px",
                  width: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {this.state.collapse ? (
                  <i className="fa fa-angle-up" />
                ) : (
                  <i className="fa fa-angle-down" />
                )}
              </Button>
            </div>
          </CardHeader>
          <Collapse isOpen={this.state.collapse}>
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
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default SubBusinessAbout;
