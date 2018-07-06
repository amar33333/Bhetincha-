import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import "./callerdetail.css";

import CallerAddEdit from "./CallerAddEdit";
import CallerLogs from "./CallerLogs";

class CallerDetail extends Component {
  constructor(props) {
    super(props);

    this.state = { edit: false, found: true };
  }
  render() {
    if (!this.props.isValidNumber(this.props.number)) {
      return <p>Enter a Valid Number</p>;
    }
    return (
      <div>
        {!this.state.edit ? (
          <div>
            <Button
              color="link"
              className="pull-right"
              onClick={() => this.setState({ edit: true })}
            >
              Edit
            </Button>
            <Table size="sm" striped>
              <tbody className="contact-display">
                <tr>
                  <th>Name</th>
                  <td>Ram Prasad</td>
                </tr>
                <tr>
                  <th>Number</th>
                  <td>9898989898</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>abc@xyz.com</td>
                </tr>
                <tr>
                  <th>Country</th>
                  <td>Nepal</td>
                </tr>
                <tr>
                  <th>State</th>
                  <td>State-01</td>
                </tr>
                <tr>
                  <th>District</th>
                  <td>Kathmandu</td>
                </tr>
                <tr>
                  <th>City</th>
                  <td>City</td>
                </tr>
                <tr>
                  <th>Area</th>
                  <td>Area</td>
                </tr>
              </tbody>
            </Table>
          </div>
        ) : (
          <CallerAddEdit
            edit={true}
            onSubmit={() => console.log("submitted")}
            onCancel={() => this.setState({ edit: false })}
          />
        )}
        <CallerLogs />
      </div>
    );
  }
}

export default CallerDetail;
