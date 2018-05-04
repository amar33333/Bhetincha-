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

class subBusinessWorkingHour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alwaysOpen: false,
      workingHour: [
        {
          day: "Sunday",
          start: moment().format("YYYY-MM-DDTHH:mmZ"),
          end: moment().format("YYYY-MM-DDTHH:mmZ"),
          holiday: false
        },
        {
          day: "Monday",
          start: moment().format("YYYY-MM-DDTHH:mmZ"),
          end: moment().format("YYYY-MM-DDTHH:mmZ"),
          holiday: false
        },
        {
          day: "Tuesday",
          start: moment().format("YYYY-MM-DDTHH:mmZ"),
          end: moment().format("YYYY-MM-DDTHH:mmZ"),
          holiday: false
        },
        {
          day: "Wednesday",
          start: moment().format("YYYY-MM-DDTHH:mmZ"),
          end: moment().format("YYYY-MM-DDTHH:mmZ"),
          holiday: false
        },
        {
          day: "Thursday",
          start: moment().format("YYYY-MM-DDTHH:mmZ"),
          end: moment().format("YYYY-MM-DDTHH:mmZ"),
          holiday: false
        },
        {
          day: "Friday",
          start: moment().format("YYYY-MM-DDTHH:mmZ"),
          end: moment().format("YYYY-MM-DDTHH:mmZ"),
          holiday: false
        },
        {
          day: "Saturday",
          start: moment().format("YYYY-MM-DDTHH:mmZ"),
          end: moment().format("YYYY-MM-DDTHH:mmZ"),
          holiday: true
        }
      ]
    };
  }

  static getDerivedStateFromProps = nextProps => {
    // console.log("woeking howisa;", nextProps);
    if (nextProps.workingHour && nextProps.EDIT) {
      nextProps.ToogleEDIT(!nextProps.EDIT);

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
  //2018-05-02T08:38:49.549000Z
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
                      defaultValue={moment().format("hh:mm a")}
                      onChange={time => {
                        this.handleStartHourChange(time, day.day);
                      }}
                      viewMode={"time"}
                      utc={true}
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
                      defaultValue={moment().format("hh:mm a")}
                      onChange={time =>
                        this.handleClosingHourChange(time, day.day)
                      }
                      viewMode={"time"}
                      utc={true}
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
    // console.log("working state: ", this.state);
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
                  {!this.state.alwaysOpen && this.renderWorkingHours()}
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
