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
    const { user } = this.props;
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
                  <td>
                    {user.at === "c"
                      ? user.name
                      : `${user.first_name} ${user.last_name}`}
                  </td>
                </tr>
                <tr>
                  <th>Number</th>
                  <td>
                    {user.at === "m" ? user.phone_number : user.mobileNumber}
                  </td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th>Country</th>
                  <td>{user.country && user.country.name}</td>
                </tr>
                <tr>
                  <th>State</th>
                  <td>{user.state && user.state.name}</td>
                </tr>
                <tr>
                  <th>District</th>
                  <td>{user.district && user.district.name}</td>
                </tr>
                <tr>
                  <th>City</th>
                  <td>{user.city && user.city.name}</td>
                </tr>
                <tr>
                  <th>Area</th>
                  <td>{user.area && user.area.name}</td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td>{user.at === "c" ? "Business Holder" : "Individual"}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        ) : (
          <CallerAddEdit
            edit={true}
            user={this.props.user}
            number={this.props.number}
            onTeleUserUpdate={this.props.onTeleUserUpdate}
            onCountryEachList={this.props.onCountryEachList}
            onStateEachList={this.props.onStateEachList}
            onDistrictEachList={this.props.onDistrictEachList}
            onCityEachList={this.props.onCityEachList}
            countries={this.props.countries}
            partialStates={this.props.partialStates}
            partialDistricts={this.props.partialDistricts}
            partialCities={this.props.partialCities}
            partialAreas={this.props.partialAreas}
            onSubmit={this.props.onSubmit}
            onCancel={() => this.setState({ edit: false })}
          />
        )}
        <CallerLogs logs={this.props.user.logs} />
      </div>
    );
  }
}

export default CallerDetail;
