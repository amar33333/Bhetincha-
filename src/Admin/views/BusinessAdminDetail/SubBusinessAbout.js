import React, { Component } from "react";
import AboutUsEditor from "../../../Website/Views/Minisite/components/AboutUsEditor";
import "react-datetime/css/react-datetime.css";

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
      tagline: "",
      aboutUs: "",
      establishedYear: "",
      companyType: []
    };
  }

  // static getDerivedStateFromProps = nextProps => ({
  //   tagline: nextProps.tagline,
  //   aboutUs: nextProps.aboutUs,
  //   establishedYear: nextProps.aboutUs,
  //   companyType: { id: nextProps.companyType, name: nextProps.companyType }
  // });

  static getDerivedStateFromProps = nextProps =>
    nextProps.about && nextProps.edit
      ? {
          tagline: nextProps.about.tagline,
          aboutUs: nextProps.about.aboutUs,
          establishedYear: "",
          companyType: {
            id: nextProps.about.companyType,
            name: nextProps.about.companyType
          }
        }
      : null;

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  handleAboutChange = value => this.setState({ aboutUs: value });

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });
  };

  clearState = () => {
    this.setState({
      tagline: "",
      aboutUs: "",
      establishedYear: "",
      companyType: ""
    });
  };

  getState = () => this.state;

  render() {
    const companyTypes = this.props.company_types;

    const { company_type } = this.state;
    const valueCompanyType = company_type && company_type.id;

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader onClick={this.props.toggleCollapse}>
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
                onClick={this.props.toggleCollapse}
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
                {!this.props.collapsed ? (
                  <i className="fa fa-angle-up" />
                ) : (
                  <i className="fa fa-angle-down" />
                )}
              </Button>
            </div>
          </CardHeader>
          <Collapse isOpen={!this.props.collapsed}>
            <CardBody>
              <Row>
                <Col xs="12" md="12">
                  <FormGroup>
                    <Label for="About_Tagline">Tagline</Label>
                    <Input
                      required
                      type="text"
                      value={this.state.tagline}
                      onKeyDown={this._handleKeyPress}
                      onChange={this.onChange.bind(this, "tagline")}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="aboutUs">About Us</Label>
                    <AboutUsEditor
                      readOnly={this.props.loading}
                      value={this.state.aboutUs}
                      onChange={this.handleAboutChange}
                    />
                    {/* <Input
                      required
                      type="text"
                      value={this.state.aboutUs}
                      onKeyDown={this._handleKeyPress}
                      onChange={this.onChange.bind(this, "aboutUs")}
                    /> */}
                  </FormGroup>
                  <FormGroup>
                    <Label for="year">Established Year</Label>
                    <Input
                      required
                      type="text"
                      value={this.state.establishedYear}
                      onKeyDown={this._handleKeyPress}
                      onChange={this.onChange.bind(this, "establishedYear")}
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
                        "companyType"
                      )}
                      options={companyTypes}
                      valueKey="id"
                      labelKey="name"
                    />
                  </FormGroup>
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
