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
        // mobileNumber,
        country,
        state,
        district,
        city,
        area,
        // type,
        name,
        // phone_number,
        at
      } = props.user;

      this.state = {
        at,
        firstName: at === "c" ? undefined : first_name,
        lastName: at === "c" ? undefined : last_name,
        name: at === "c" ? name : undefined,
        // number: at === "m" ? phone_number : mobileNumber,
        email: email || "",
        area: area || "",
        city: city || "",
        district: district || "",
        state: state || "",
        country: country || ""
      };
    } else {
      this.state = {
        at: "t",
        firstName: "",
        lastName: "",
        name: "",
        // number: "",
        email: "",
        area: "",
        city: "",
        district: "",
        state: "",
        country: ""
      };
    }
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

    const {
      at,
      firstName,
      lastName,
      name,
      email,
      area,
      city,
      district,
      state,
      country
    } = this.state;
    const body = {};

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
    } else {
      const { user } = this.props;
      if (at === "c") {
        if (user.name !== name) {
          body.name = name;
        }
      } else {
        if (user.first_name !== firstName) {
          body.first_name = firstName;
        }
        if (user.last_name !== lastName) {
          body.last_name = lastName;
        }
      }

      if (user.email !== email) {
        body.email = email;
      }
      if (
        (user.country && country && user.country.id !== country.id) ||
        (!user.country && country)
      ) {
        body.country = country.id;
        body.state = null;
        body.district = null;
        body.city = null;
        body.area = null;
      }
      if (
        (user.state && state && user.state.id !== state.id) ||
        (!user.state && state)
      ) {
        body.state = state.id;
        body.district = null;
        body.city = null;
        body.area = null;
      }
      if (
        (user.district && district && user.district.id !== district.id) ||
        (!user.district && district)
      ) {
        body.district = district.id;
        body.city = null;
        body.area = null;
      }
      if (
        (user.city && city && user.city.id !== city.id) ||
        (!user.city && city)
      ) {
        body.city = city.id;
        body.area = null;
      }
      if (
        (user.area && area && user.area.id !== area.id) ||
        (!user.area && area)
      ) {
        body.area = area.id;
      }

      if (Object.keys(body).length) {
        this.props.onTeleUserUpdate({
          body: { at, ...body },
          phone: this.props.number
        });
      }
      // console.log(body);
    }
  };

  render() {
    return (
      <div>
        {!this.props.edit && <p>No Associated User. Add New User</p>}
        <Form onSubmit={this.onFormSubmit}>
          <Table size="sm" striped>
            <tbody className="contact-display">
              {this.state.at !== "c" && (
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
              )}
              {this.state.at !== "c" && (
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
              )}
              {this.state.at === "c" && (
                <tr>
                  <th>Name</th>
                  <td>
                    <Input
                      value={this.state.name}
                      onChange={e => this.handleChange("name", e.target.value)}
                    />
                  </td>
                </tr>
              )}
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
