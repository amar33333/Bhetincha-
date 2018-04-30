import React, { Component } from "react";
import { TimeInput } from "material-ui-time-picker";

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
      about_us_tagline: "",
      about_us: "",
      established_year: "",
      company_type: [],

      sundayHoliday: Days[0].holiday,
      sundayStart: "",
      sundayEnd: "",

      mondayHoliday: Days[1].holiday,
      mondayStart: "",
      mondayEnd: "",

      tuesdayHoliday: Days[2].holiday,
      tuesdayStart: "",
      tuesdayEnd: "",

      wednesdayHoliday: Days[3].holiday,
      wednesdayStart: "",
      wednesdayEnd: "",

      thursdayHoliday: Days[4].holiday,
      thursdayStart: "",
      thursdayEnd: "",

      fridayHoliday: Days[5].holiday,
      fridayStart: "",
      fridayEnd: "",

      saturdayHoliday: Days[6].holiday,
      saturdayStart: "",
      saturdayEnd: ""

      // collapsed: true
    };
  }

  toggleHoliday = day => {
    const myDay = day.toLowerCase() + "Holiday";
    const updatedHolidayState = {};
    [
      "sundayHoliday",
      "mondayHoliday",
      "tuesdayHoliday",
      "wednesdayHoliday",
      "thursdayHoliday",
      "fridayHoliday",
      "saturdayHoliday"
    ].forEach(newDay => {
      console.log(myDay);
      if (newDay === myDay) {
        updatedHolidayState[myDay] = !this.state[myDay];
      }
    });
    console.log(updatedHolidayState);
    this.setState(updatedHolidayState);
  };

  // static getDerivedStateFromProps = nextProps => ({
  //   about_us_tagline: nextProps.tagline,
  //   about_us: nextProps.aboutUs,
  //   established_year: nextProps.aboutUs,
  //   company_type: { id: nextProps.companyType, name: nextProps.companyType }
  // });

  static getDerivedStateFromProps = nextProps =>
    nextProps.about && nextProps.edit
      ? {
          about_us_tagline: nextProps.about.tagline,
          about_us: nextProps.about.aboutUs,
          established_year: "",
          company_type: {
            id: nextProps.about.companyType,
            name: nextProps.about.companyType
          }
        }
      : null;

  // toggleCollapse = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed
  //   });
  // };
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

  handleWorkingHourChange = time => {
    console.log("selectedTime: ", time);
  };

  renderWorkingHours = () => {
    return Days.map(day => (
      <FormGroup>
        <Card>
          <CardBody
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <strong>{day.day}</strong>
            <Label check>
              <Input
                type="checkbox"
                checked={this.state[day.day.toLowerCase() + "Holiday"]}
                onClick={this.toggleHoliday.bind(this, day.day)}
              />
              Holiday
            </Label>
            <Label>Opens at: </Label>
            <TimeInput
              disabled={
                this.state[day.day.toLowerCase() + "Holiday"] ? true : false
              }
              mode="12h"
              value={day.start}
              onChange={time => this.handleWorkingHourChange(time)}
            />
            <Label>Closes at: </Label>
            <TimeInput
              disabled={
                this.state[day.day.toLowerCase() + "Holiday"] ? true : false
              }
              mode="12h"
              value={day.end}
              onChange={time => this.handleWorkingHourChange(time)}
            />
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
