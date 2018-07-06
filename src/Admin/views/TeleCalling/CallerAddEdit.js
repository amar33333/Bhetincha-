import React, { Component } from "react";
import { Button, Table, Input, Form } from "reactstrap";
import { Select } from "../../../Common/components";

const areas = [{ id: 1, name: "oralo" }, { id: 2, name: "ukalo" }];

class CallerEdit extends Component {
  constructor(props) {
    super(props);

    if (this.props.edit) {
      this.state = {
        name: "Ram",
        number: "9898989898",
        email: "abc@xyz.com",
        area: { id: 1, name: "oralo" },
        city: { id: 1, name: "oralo" },
        district: { id: 1, name: "oralo" },
        state: { id: 1, name: "oralo" },
        country: { id: 1, name: "oralo" }
      };
    } else {
      this.state = {
        name: "",
        number: "",
        email: "",
        area: "",
        city: "",
        district: "",
        state: "",
        country: ""
      };
    }
  }

  componentDidMount() {
    console.log("mounted");
  }

  handleChange = (key, value) => this.setState({ [key]: value });

  onFormSubmit = e => {
    e.preventDefault();

    this.props.onSubmit();
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.onFormSubmit}>
          <Table size="sm" striped>
            <tbody className="contact-display">
              <tr>
                <th>Name</th>
                <td>
                  <Input
                    required
                    value={this.state.name}
                    onChange={e => this.handleChange("name", e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>Number</th>
                <td>
                  <Input
                    required
                    value={this.state.number}
                    onChange={e => this.handleChange("number", e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>Email</th>
                <td>
                  <Input
                    value={this.state.email}
                    onChange={e => this.handleChange("email", e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>Country</th>
                <td>
                  <Select
                    value={this.state.country}
                    options={areas}
                    labelKey="name"
                    valueKey="id"
                    onChange={value => this.handleChange("country", value)}
                  />
                </td>
              </tr>
              <tr>
                <th>State</th>
                <td>
                  <Select
                    value={this.state.state}
                    options={areas}
                    labelKey="name"
                    valueKey="id"
                    onChange={value => this.handleChange("state", value)}
                  />
                </td>
              </tr>
              <tr>
                <th>District</th>
                <td>
                  <Select
                    value={this.state.district}
                    options={areas}
                    labelKey="name"
                    valueKey="id"
                    onChange={value => this.handleChange("district", value)}
                  />
                </td>
              </tr>
              <tr>
                <th>City</th>
                <td>
                  <Select
                    value={this.state.city}
                    options={areas}
                    labelKey="name"
                    valueKey="id"
                    onChange={value => this.handleChange("city", value)}
                  />
                </td>
              </tr>
              <tr>
                <th>Area</th>
                <td>
                  <Select
                    value={this.state.area}
                    options={areas}
                    labelKey="name"
                    valueKey="id"
                    onChange={value => this.handleChange("area", value)}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          <Button type="submit" color="primary">
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={this.props.onCancel}>
            Cancel
          </Button>
        </Form>
      </div>
    );
  }
}

export default CallerEdit;
