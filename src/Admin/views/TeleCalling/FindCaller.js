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
import CallerAddEdit from "./CallerAddEdit";

class FindCaller extends Component {
  constructor(props) {
    super(props);

    this.state = { callerName: "", callerNumber: "985106620" };
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });

    if (key === "callerName") {
      console.log("name");
    } else if (key === "callerNumber") {
      if (this.isValidNumber(value)) {
        this.props.onTeleUserList({ params: { phone: value } });
        console.log("number");
      } else {
        console.log("NaN");
      }
    }
  };

  isValidNumber = number => number.length === 10;

  renderCaller = () => {
    if (!this.isValidNumber(this.state.callerNumber)) {
      return <p>Enter a Valid Number</p>;
    } else if (this.props.fetchTeleUserLoading || this.props.userLoading) {
      return <div>Loading</div>;
    } else if (
      Object.keys(this.props.teleUser).length === 0 &&
      this.props.teleUser.constructor === Object
    ) {
      return (
        <CallerAddEdit
          edit={false}
          number={this.state.callerNumber}
          onCountryEachList={this.props.onCountryEachList}
          onStateEachList={this.props.onStateEachList}
          onDistrictEachList={this.props.onDistrictEachList}
          onCityEachList={this.props.onCityEachList}
          countries={this.props.countries}
          partialStates={this.props.partialStates}
          partialDistricts={this.props.partialDistricts}
          partialCities={this.props.partialCities}
          partialAreas={this.props.partialAreas}
          onSubmit={this.props.onTeleUserSubmit}
        />
      );
    } else {
      return (
        <CallerDetail
          user={this.props.teleUser}
          number={this.state.callerNumber}
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
          onSubmit={() => console.log("submitted")}
        />
      );
    }
  };

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
            this.renderCaller()
          )}
        </CardBody>
      </Card>
    );
  }
}

export default FindCaller;
