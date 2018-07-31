import React, { Component } from "react";
import moment from "moment";

import {
  Label,
  Input,
  CustomInput,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup
} from "reactstrap";

import { Card as SemanticCard } from "semantic-ui-react";

class subBusinessWorkingHour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alwaysOpen: false,
      workingHour: [
        {
          day: "Sunday",
          start: undefined,
          end: undefined,
          holiday: false
        },
        {
          day: "Monday",
          start: undefined,
          end: undefined,
          holiday: false
        },
        {
          day: "Tuesday",
          start: undefined,
          end: undefined,
          holiday: false
        },
        {
          day: "Wednesday",
          start: undefined,
          end: undefined,
          holiday: false
        },
        {
          day: "Thursday",
          start: undefined,
          end: undefined,
          holiday: false
        },
        {
          day: "Friday",
          start: undefined,
          end: undefined,
          holiday: false
        },
        {
          day: "Saturday",
          start: undefined,
          end: undefined,
          holiday: false
        }
      ]
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (!nextProps.businessGet && nextProps.workingHour && nextProps.EDIT) {
      nextProps.onInitialPropsReceived();

      return {
        workingHour: !nextProps.workingHour.alwaysOpen
          ? nextProps.workingHour.workingHour.length
            ? [...nextProps.workingHour.workingHour.map(each => each)]
            : prevState.workingHour
          : prevState.workingHour,
        alwaysOpen: nextProps.workingHour.alwaysOpen
      };
    }
    return null;
  };

  getState = () => {
    return this.state.alwaysOpen
      ? { alwaysOpen: this.state.alwaysOpen }
      : this.state;
  };
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
  handleStartHourChange = (e, day) => {
    const newWorkingHour = this.state.workingHour.map(each => {
      if (day === "Sunday") {
        return {
          ...each,
          start: moment(e.target.value).format("YYYY-MM-DDTHH:mmZ")
        };
      } else if (each.day === day) {
        return {
          ...each,
          start: moment(e.target.value).format("YYYY-MM-DDTHH:mmZ")
        };
      } else {
        return each;
      }
    });
    this.setState({
      workingHour: newWorkingHour
    });
  };

  handleClosingHourChange = (e, day) => {
    const newWorkingHour = this.state.workingHour.map(each => {
      if (day === "Sunday") {
        return {
          ...each,
          end: moment(e.target.value).format("YYYY-MM-DDTHH:mmZ")
        };
      } else if (each.day === day) {
        return {
          ...each,
          end: moment(e.target.value).format("YYYY-MM-DDTHH:mmZ")
        };
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

    return (
      <FormGroup>
        <SemanticCard fluid>
          <SemanticCard.Content>
            <Row>
              <Col xs="6" md="2">
                <strong>Day</strong>
              </Col>
              <Col xs="6" md="3">
                <strong>Holiday?</strong>
              </Col>
              <Col xs="6" md="3">
                <strong>Opens at</strong>
              </Col>
              <Col xs="6" md="3">
                <strong>Closes at</strong>
              </Col>
            </Row>
          </SemanticCard.Content>
          {this.state.workingHour.map(day => (
            <SemanticCard.Content key={day.day}>
              <Row>
                <Col xs="6" md="2">
                  <strong>{day.day.substring(0, 3)}</strong>
                </Col>
                <Col xs="6" md="2">
                  <Input
                    className="ml-3"
                    type="checkbox"
                    checked={day.holiday}
                    onChange={this.toggleHoliday.bind(this, day.day)}
                  />
                </Col>
                <Col xs="6" md="4">
                  {day.holiday ? null : (
                    <span>
                      <CustomInput
                        required
                        type="select"
                        name="select"
                        id="start-hour"
                        onChange={e => {
                          this.handleStartHourChange(e, day.day);
                        }}
                      >
                        <option value="Select your time" disabled selected>
                          Select Your Time
                        </option>
                        {dateArray.map(date => (
                          <option
                            selected={
                              moment(day.start).format("YYYY-MM-DDTHH:mmZ") ===
                              moment(date).format("YYYY-MM-DDTHH:mmZ")
                                ? true
                                : false
                            }
                            key={date}
                            value={moment(date).format("YYYY-MM-DDTHH:mmZ")}
                          >
                            {moment(date).format("h:mm A")}
                          </option>
                        ))}
                      </CustomInput>
                    </span>
                  )}
                </Col>
                <Col xs="6" md="4">
                  {day.holiday ? null : (
                    <span>
                      <CustomInput
                        required
                        type="select"
                        name="select"
                        id="closing-hour"
                        onChange={e => {
                          this.handleClosingHourChange(e, day.day);
                        }}
                      >
                        <option value="Select your time" disabled selected>
                          Select Your Time
                        </option>
                        {dateArray.map(date => (
                          <option
                            selected={
                              moment(day.end).format("YYYY-MM-DDTHH:mmZ") ===
                              moment(date).format("YYYY-MM-DDTHH:mmZ")
                                ? true
                                : false
                            }
                            key={date}
                            value={moment(date).format("YYYY-MM-DDTHH:mmZ")}
                          >
                            {moment(date).format("h:mm A")}
                          </option>
                        ))}
                      </CustomInput>
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

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <strong>Working Hour</strong>
            </div>
          </CardHeader>
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
        </Card>
      </div>
    );
  }
}

export default subBusinessWorkingHour;
