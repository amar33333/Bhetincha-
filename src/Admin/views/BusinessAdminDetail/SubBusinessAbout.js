import React, { Component } from "react";
// import { TimeInput } from "material-ui-time-picker";
import Datetime from "react-datetime";
import moment from "moment";

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

import Days from "../../config/daysItems";

import Select from "react-select";

class SubBusinessAbout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tagline: "",
      aboutUs: "",
      establishedYear: "",
      companyType: [],
      workingHour: [
        {
          day: "Sunday",
          start: moment().format("hh:mm a"),
          end: moment().format("hh:mm a"),
          holiday: false
        },
        {
          day: "Monday",
          start: moment().format("hh:mm a"),
          end: moment().format("hh:mm a"),
          holiday: false
        },
        {
          day: "Tuesday",
          start: moment().format("hh:mm a"),
          end: moment().format("hh:mm a"),
          holiday: false
        },
        {
          day: "Wednesday",
          start: moment().format("hh:mm a"),
          end: moment().format("hh:mm a"),
          holiday: false
        },
        {
          day: "Thursday",
          start: moment().format("hh:mm a"),
          end: moment().format("hh:mm a"),
          holiday: false
        },
        {
          day: "Friday",
          start: moment().format("hh:mm a"),
          end: moment().format("hh:mm a"),
          holiday: false
        },
        {
          day: "Saturday",
          start: moment().format("hh:mm a"),
          end: moment().format("hh:mm a"),
          holiday: true
        }
      ]
    };
  }

  toggleHoliday = day => {
    // const myDay = day.toLowerCase() + "Holiday";
    const newWorkingHour = this.state.workingHour.map(each => {
      if (each.day === day) {
        return { ...each, holiday: !each.holiday };
      } else {
        return each;
      }
    });
    this.setState({
      workingHour: newWorkingHour
    });
  };

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

  handleStartHourChange = (time, day) => {
    console.log("updatedStartState: ", day, time);

    const updatedStartState = {};
    const newStartHour = day.toLowerCase() + "Start";
    updatedStartState[newStartHour] = time;
    this.setState({ updatedStartState });
    console.log("updatedStartState: ", day, time);
  };
  handleClosingHourChange = (time, day) => {
    const updatedEndState = {};
    const newEndHour = day.toLowerCase() + "End";
    updatedEndState[newEndHour] = time;
    this.setState({ updatedEndState });
    console.log("updatedEndState: ", day, time);
  };

  renderWorkingHours = () => {
    return this.state.workingHour.map(day => (
      <FormGroup>
        <Card body outline color={day.holiday ? "danger" : "primary"}>
          <CardBody
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <strong>{day.day}</strong>
            <Label check>
              <Input
                type="checkbox"
                checked={day.holiday}
                onClick={this.toggleHoliday.bind(this, day.day)}
              />
              Holiday
            </Label>
            {day.holiday ? null : (
              <span>
                <Label>Opens at: </Label>
                <Datetime
                  dateFormat={false}
                  defaultValue={moment("2018-05-01 10:00 AM").format("hh:mm A")}
                  onChange={time => {
                    this.handleStartHourChange(time, day.day);
                  }}
                  viewMode={"time"}
                  utc={true}
                />
              </span>
            )}
            {day.holiday ? null : (
              <span>
                <Label>Closes at: </Label>
                <Datetime
                  dateFormat={false}
                  defaultValue={moment("2018-05-01 04:00 PM").format("hh:mm A")}
                  onChange={time => this.handleClosingHourChange(time, day.day)}
                  viewMode={"time"}
                  utc={true}
                />
              </span>
            )}
          </CardBody>
        </Card>
      </FormGroup>
    ));
  };
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
                    <Input
                      required
                      type="text"
                      value={this.state.aboutUs}
                      onKeyDown={this._handleKeyPress}
                      onChange={this.onChange.bind(this, "aboutUs")}
                    />
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
                  {/* <FormGroup check>
                          <Label for="visible_to_public" check>
                            <Input type="checkbox" /> Visible To Public
                          </Label>
                        </FormGroup> */}
                  <Label>Woring Hour</Label>
                  {this.renderWorkingHours()}
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
