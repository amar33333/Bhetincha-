import React, { Component } from "react";
import { Button, Table, Input, Form } from "reactstrap";
import { Select } from "../../../Common/components";

class CallerEdit extends Component {
  constructor(props) {
    super(props);

    if (this.props.edit) {
      const {
        first_name,
        last_name,
        email,
        mobileNumber,
        country,
        state,
        district,
        city,
        area,
        type
      } = props.user;
      this.state = {
        firstName: first_name,
        lastName: last_name,
        number: mobileNumber,
        email,
        area: area || "",
        city: city || "",
        district: district || "",
        state: state || "",
        country: country || ""
      };
    } else {
      this.state = {
        firstName: "",
        lastName: "",
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

  handleChange = (key, value) => {
    this.setState({
      [key]:
        key === "firstName" || key === "lastName"
          ? value.replace(/\b\w/g, l => l.toUpperCase())
          : value
    });

    if (key === "country") {
      this.setState({ state: "", district: "", city: "", area: "" });
      value && this.props.onCountryEachList({ id: value.id });
    } else if (key === "state") {
      this.setState({ district: "", city: "", area: "" });
      value && this.props.onStateEachList({ id: value.id });
    } else if (key === "district") {
      this.setState({ city: "", area: "" });
      value && this.props.onDistrictEachList({ id: value.id });
    } else if (key === "city") {
      this.setState({ area: "" });
      value && this.props.onCityEachList({ id: value.id });
    }
  };

  onFormSubmit = e => {
    e.preventDefault();

    const body = {};
    const {
      firstName,
      lastName,
      email,
      area,
      city,
      district,
      state,
      country
    } = this.state;

    if (!this.props.edit) {
      body.mobileNumber = this.props.number;
      body.first_name = firstName;
      if (lastName) {
        body.last_name = lastName;
      }
      if (email) {
        body.email = email;
      }
      if (area && area.id) {
        body.area = area.id;
      }
      if (city && city.id) {
        body.city = city.id;
      }
      if (district && district.id) {
        body.district = district.id;
      }
      if (state && state.id) {
        body.state = state.id;
      }
      if (country && country.id) {
        body.country = country.id;
      }

      this.props.onSubmit({ body });
    }
  };

  render() {
    return (
      <div>
        {!this.props.edit && <p>No Associated User. Add New User</p>}
        <Form onSubmit={this.onFormSubmit}>
          <Table size="sm" striped>
            <tbody className="contact-display">
              <tr>
                <th>First Name</th>
                <td>
                  <Input
                    required
                    value={this.state.firstName}
                    onChange={e =>
                      this.handleChange("firstName", e.target.value)
                    }
                  />
                </td>
              </tr>
              <tr>
                <th>Last Name</th>
                <td>
                  <Input
                    value={this.state.lastName}
                    onChange={e =>
                      this.handleChange("lastName", e.target.value)
                    }
                  />
                </td>
              </tr>
              {/* <tr>
                <th>Number</th>
                <td>
                  <Input
                    required
                    value={this.state.number}
                    onChange={e => this.handleChange("number", e.target.value)}
                  />
                </td>
              </tr> */}
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
                    options={this.props.countries}
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
                    options={this.props.partialStates}
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
                    options={this.props.partialDistricts}
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
                    options={this.props.partialCities}
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
                    options={this.props.partialAreas}
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
          {this.props.edit && (
            <Button color="secondary" onClick={this.props.onCancel}>
              Cancel
            </Button>
          )}
        </Form>
      </div>
    );
  }
}

export default CallerEdit;
