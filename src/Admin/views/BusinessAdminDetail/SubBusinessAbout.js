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
      companyType: ""
    };
  }

  static getDerivedStateFromProps = nextProps =>
    nextProps.about && nextProps.edit
      ? {
          tagline: nextProps.about.tagline ? nextProps.about.tagline : "",
          aboutUs: nextProps.about.aboutUs ? nextProps.about.aboutUs : "",
          establishedYear: nextProps.about.establishedYear
            ? nextProps.about.establishedYear
            : "",
          companyType: nextProps.about.companyType
            ? {
                id: nextProps.about.companyType.id,
                name: nextProps.about.companyType.name
              }
            : ""
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

  getState = () => {
    let reformed = {};
    for (var property in this.state) {
      reformed =
        (this.state[property] !== null &&
          this.state[property] !== undefined &&
          this.state[property] !== "") ||
        (this.state[property].constructor === Array &&
          this.state[property].length > 0)
          ? { ...reformed, [property]: this.state[property] }
          : reformed;
    }

    console.log("about reformed: ", reformed);
    return {
      about: {
        ...reformed,
        companyType: this.state.companyType.id
      }
    };
  };
  render() {
    console.log("about props: ", this.props);
    console.log("about state: ", this.state);
    const companyTypes = this.props.company_types;

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
                      type="text"
                      value={this.state.tagline}
                      onKeyDown={this._handleKeyPress}
                      onChange={this.onChange.bind(this, "tagline")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="12">
                  <FormGroup>
                    <Label for="aboutUs">About Us</Label>
                    <AboutUsEditor
                      readOnly={this.props.loading}
                      value={this.state.aboutUs}
                      onChange={this.handleAboutChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="6" md="6">
                  <FormGroup>
                    <Label for="year">Established Year</Label>
                    <Input
                      type="text"
                      value={this.state.establishedYear}
                      onKeyDown={this._handleKeyPress}
                      onChange={this.onChange.bind(this, "establishedYear")}
                    />
                  </FormGroup>
                </Col>
                <Col xs="6" md="6">
                  <FormGroup>
                    <Label for="company_type">Company Type</Label>
                    <Select
                      name="Company Type"
                      placeholder="Select Your Company Type"
                      noResultsText="No Data Found"
                      value={
                        this.state.companyType ? this.state.companyType.id : ""
                      }
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
