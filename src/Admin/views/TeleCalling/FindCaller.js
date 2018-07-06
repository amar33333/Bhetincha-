import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  Label,
  FormGroup,
  Card,
  CardBody,
  Badge,
  CardHeader
} from "reactstrap";
import CallerList from "./CallerList";
import CallerDetail from "./CallerDetail";

class FindCaller extends Component {
  constructor(props) {
    super(props);

    this.state = { callerName: "", callerNumber: "9898989898" };
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });

    if (key === "callerName") {
      console.log("name");
    } else if (key === "callerNumber") {
      if (this.isValidNumber(value)) {
        console.log("number");
      } else {
        console.log("NaN");
      }
    }
  };

  isValidNumber = number => number.length === 10;

  render() {
    return (
      <Card>
        <CardHeader>
          <strong>Find Caller</strong>
        </CardHeader>
        <CardBody>
          <FormGroup>
            <Label for="callerName">Caller Name</Label>
            <Col>
              <Input
                type="text"
                name="callerName"
                id="callerName"
                placeholder="Enter a Name"
                value={this.state.callerName}
                onChange={e => this.handleChange("callerName", e.target.value)}
              />
            </Col>
          </FormGroup>
          <CallerList />
          <hr />
          <FormGroup>
            <Label for="callerNumber">Caller Number</Label>
            <Col>
              <Input
                type="number"
                name="callerNumber"
                id="callerNumber"
                placeholder="Enter Number"
                value={this.state.callerNumber}
                onChange={e =>
                  this.handleChange("callerNumber", e.target.value)
                }
              />
            </Col>
          </FormGroup>
          {this.state.callerNumber === "" ? (
            <p>Caller Number Empty</p>
          ) : (
            <CallerDetail
              number={this.state.callerNumber}
              isValidNumber={this.isValidNumber}
            />
          )}
        </CardBody>
      </Card>
    );
  }
}

export default FindCaller;
