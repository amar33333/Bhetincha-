import React, { Component } from "react";
import moment from "moment";
import Datetime from "react-datetime";
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

  handleStartHourChange = (time, day) => {
    const newWorkingHour = this.state.workingHour.map(each => {
      if (each.day === day) {
        return { ...each, start: time };
      } else {
        return each;
      }
    });
    this.setState({
      workingHour: newWorkingHour
    });
  };

  handleClosingHourChange = (time, day) => {
    const newWorkingHour = this.state.workingHour.map(each => {
      if (each.day === day) {
        return { ...each, end: time };
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

export default subBusinessWorkingHour;
