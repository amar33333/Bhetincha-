import React, { Component } from "react";
import moment from "moment";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import {
  Collapse,
  Label,
  Input,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  FormGroup
} from "reactstrap";

import { Card as SemanticCard } from "semantic-ui-react";

import { Select } from "../../../Common/components";

class subBusinessWorkingHour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alwaysOpen: false,
      workingHour: [
        {
          day: "Sunday",
          start: moment("2018-05-01T10:00").format("YYYY-MM-DDTHH:mmZ"),
          end: moment("2018-05-01T17:00").format("YYYY-MM-DDTHH:mmZ"),
          holiday: false
        },
        {
          day: "Monday",
          start: moment("2018-05-01T10:00").format("YYYY-MM-DDTHH:mmZ"),
          end: moment("2018-05-01T17:00").format("YYYY-MM-DDTHH:mmZ"),
          holiday: false
        },
        {
          day: "Tuesday",
          start: moment("2018-05-01T10:00").format("YYYY-MM-DDTHH:mmZ"),
          end: moment("2018-05-01T17:00").format("YYYY-MM-DDTHH:mmZ"),
          holiday: false
        },
        {
          day: "Wednesday",
          start: moment("2018-05-01T10:00").format("YYYY-MM-DDTHH:mmZ"),
          end: moment("2018-05-01T17:00").format("YYYY-MM-DDTHH:mmZ"),
          holiday: false
        },
        {
          day: "Thursday",
          start: moment("2018-05-01T10:00").format("YYYY-MM-DDTHH:mmZ"),
          end: moment("2018-05-01T17:00").format("YYYY-MM-DDTHH:mmZ"),
          holiday: false
        },
        {
          day: "Friday",
          start: moment("2018-05-01T10:00").format("YYYY-MM-DDTHH:mmZ"),
          end: moment("2018-05-01T17:00").format("YYYY-MM-DDTHH:mmZ"),
          holiday: false
        },
        {
          day: "Saturday",
          start: moment("2018-05-01T10:00").format("YYYY-MM-DDTHH:mmZ"),
          end: moment("2018-05-01T17:00").format("YYYY-MM-DDTHH:mmZ"),
          holiday: true
        }
      ]
    };
  }

  static getDerivedStateFromProps = nextProps => {
    // console.log("woeking howisa;", nextProps);
    // console.log("working hour before toogle recevied: ", nextProps.EDIT);

    if (
      !nextProps.businessGet &&
      nextProps.workingHour &&
      nextProps.workingHour.length &&
      nextProps.EDIT
    ) {
      // console.log("working hourinside toogle recevied: ", nextProps.EDIT);

      nextProps.onInitialPropsReceived();

      return {
        workingHour: [...nextProps.workingHour.map(each => each)],
        alwaysOpen: nextProps.alwaysOpen
      };
    }
    return null;
  };

  getState = () => this.state;
  toggleHoliday = day => {
    const newWorkingHour = this.state.workingHour.map(each => {
      if (each.day === day) {
        return {
          ...each,
          holiday: !each.holiday,
          start: moment().format("YYYY-MM-DDTHH:mmZ"),
          end: moment().format("YYYY-MM-DDTHH:mmZ")
        };
      } else {
        return each;
      }
    });
    this.setState({
      workingHour: newWorkingHour
    });
  };

  toggleAlwaysOpen() {
    this.setState({
      alwaysOpen: !this.state.alwaysOpen
    });
  }
  handleStartHourChange = (time, day) => {
    console.log("startHourchange: ", moment(time).format("YYYY-MM-DDTHH:mmZ"));
    const newWorkingHour = this.state.workingHour.map(each => {
      if (each.day === day) {
        return {
          ...each,
          start: moment(time).format("YYYY-MM-DDTHH:mmZ")
        };
      } else {
        return each;
      }
    });
    this.setState({
      workingHour: newWorkingHour
    });
  };

  handleClosingHourChange = (time, day) => {
    console.log("time:", time);
    const newWorkingHour = this.state.workingHour.map(each => {
      if (each.day === day) {
        return { ...each, end: moment.utc(time).format("YYYY-MM-DDTHH:mmZ") };
      } else {
        return each;
      }
    });
    this.setState({
      workingHour: newWorkingHour
    });
  };
  renderNewWorkingHours = () => {
    var dateArray = [];
    var currentDate = moment("2018-05-01T00:00");
    var stopDate = moment("2018-05-01T23:59");
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY-MM-DDTHH:mmZ"));
      currentDate = moment(currentDate).add(15, "m");
    }

    const timeList = dateArray.map((date, index) => {
      return { id: index, value: date };
    });

    // console.log("date array: ", dateArray);
    return (
      <FormGroup>
        <SemanticCard fluid>
          {this.state.workingHour.map(day => (
            <SemanticCard.Content key={day.day}>
              <Row>
                <Col xs="6" md="2">
                  <strong>{day.day}</strong>
                </Col>
                <Col xs="6" md="2">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={day.holiday}
                      onChange={this.toggleHoliday.bind(this, day.day)}
                    />
                    Holiday
                  </Label>
                </Col>
                <Col xs="6" md="4">
                  {day.holiday ? null : (
                    <span>
                      <Label>Opens at: </Label>
                      {/* <Select
                        autosize
                        name="Opnes at"
                        // value={timeList}
                        onChange={time => {
                          this.handleStartHourChange(time, day.day);
                        }}
                        options={timeList}
                        valuekey="value"
                        labelKey="value"
                        optionRenderer={({ value }) => (
                          <div>{moment(value).format("hh:mm A")}</div>
                        )}
                      /> */}
                      <Input
                        type="select"
                        onChange={time => {
                          this.handleStartHourChange(time, day.day);
                        }}
                      >
                        {dateArray.map(date => (
                          <option
                            key={date}
                            value={moment.utc(date).format("YYYY-MM-DDTHH:mmZ")}
                          >
                            {moment(date).format("h:mm A")}
                          </option>
                        ))}
                      </Input>
                      {/* <Datetime
                        dateFormat={false}
                        value={moment(day.start).format("hh:mm a")}
                        // defaultValue={moment("2018-05-01T10:00").format(
                        //   "hh:mm a"
                        // )}
                        onChange={time => {
                          this.handleStartHourChange(time, day.day);
                        }}
                        viewMode={"time"}
                        // utc={true}
                      /> */}
                    </span>
                  )}
                </Col>
                <Col xs="6" md="4">
                  {day.holiday ? null : (
                    <span>
                      <Label>Closes at: </Label>
                      <Datetime
                        dateFormat={false}
                        value={moment(day.end).format("hh:mm a")}
                        // defaultValue={moment("2018-05-01T17:00").format(
                        //   "hh:mm a"
                        // )}
                        onChange={time =>
                          this.handleClosingHourChange(time, day.day)
                        }
                        viewMode={"time"}
                        // utc={true}
                      />
                    </span>
                  )}
                </Col>
              </Row>
            </SemanticCard.Content>
          ))}
        </SemanticCard>
      </FormGroup>
    );
  };
  renderWorkingHours = () => {
    return this.state.workingHour.map(day => (
      <FormGroup key={day.day}>
        <Card body outline color={day.holiday ? "danger" : "primary"}>
          <CardBody>
            <Row>
              <Col xs="6" md="2">
                <strong>{day.day}</strong>
              </Col>
              <Col xs="6" md="2">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={day.holiday}
                    onChange={this.toggleHoliday.bind(this, day.day)}
                  />
                  Holiday
                </Label>
              </Col>
              <Col xs="6" md="4">
                {day.holiday ? null : (
                  <span>
                    <Label>Opens at: </Label>
                    <Datetime
                      dateFormat={false}
                      value={moment(day.start).format("hh:mm a")}
                      // defaultValue={moment("2018-05-01T10:00").format(
                      //   "hh:mm a"
                      // )}
                      onChange={time => {
                        this.handleStartHourChange(time, day.day);
                      }}
                      viewMode={"time"}
                      // utc={true}
                    />
                  </span>
                )}
              </Col>
              <Col xs="6" md="4">
                {day.holiday ? null : (
                  <span>
                    <Label>Closes at: </Label>
                    <Datetime
                      dateFormat={false}
                      value={moment(day.end).format("hh:mm a")}
                      // defaultValue={moment("2018-05-01T17:00").format(
                      //   "hh:mm a"
                      // )}
                      onChange={time =>
                        this.handleClosingHourChange(time, day.day)
                      }
                      viewMode={"time"}
                      // utc={true}
                    />
                  </span>
                )}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </FormGroup>
    ));
  };

  render() {
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
              <strong>Working Hour</strong>
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
                  <Row>
                    <Label
                      check
                      style={{ marginLeft: "30px", marginBottom: "20px" }}
                    >
                      <Input
                        type="checkbox"
                        checked={this.state.alwaysOpen}
                        onChange={this.toggleAlwaysOpen.bind(this)}
                      />
                      Always Open
                    </Label>
                  </Row>
                  {/* {!this.state.alwaysOpen && this.renderWorkingHours()} */}
                  {!this.state.alwaysOpen && this.renderNewWorkingHours()}
                </Col>
              </Row>
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default subBusinessWorkingHour;
