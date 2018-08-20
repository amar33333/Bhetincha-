import React, { Component } from "react";
import {
  Col,
  Row,
  Input,
  FormGroup,
  Label,
  Form,
  Button,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import Select from "react-select";
import moment from "moment";
import Datetime from "react-datetime";
import { Redirect } from "react-router-dom";
import debounce from "lodash.debounce";

class ExperienceDetailsComponent extends Component {
  state = {
    company: "",
    designation: "",
    industry: "",
    start_date: "",
    end_date: ""
  };

  // Used when page is refreshed
  componentDidMount() {
    this.props.data &&
      this.setState({
        company: {
          id: this.props.data.company,
          business_name: this.props.data.company
        },
        industry: {
          id: this.props.data.industry,
          name: this.props.data.industry
        },
        designation: this.props.data.designation,
        start_date: this.props.data.start_date,
        end_date: this.props.data.end_date
      });
  }

  // // Used when data is updated within page without refresh
  componentDidUpdate = prevProps => {
    if (this.props.data !== prevProps.data) {
      this.props.data &&
        this.setState({
          company: {
            id: this.props.data.company,
            business_name: this.props.data.company_name
          },
          industry: {
            id: this.props.data.industry,
            name: this.props.data.industry
          },
          designation: this.props.data.designation,
          start_date: this.props.data.start_date,
          end_date: this.props.data.end_date
        });
    }
  };

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value
    });

  handleSelectChange = newValue => {
    this.setState({
      company: newValue
    });
  };

  debouncedAutocomplete = debounce(q => {
    this.props.handleOnBusinessFilterChange({
      q
    });
  });

  onFormSubmit = event => {
    event.preventDefault();

    this.props.isParamsUserSameAsLoggedUser(
      this.props.username,
      this.props.individualName
    ) && this.props.onExperienceDetailsSubmit
      ? this.props.onExperienceDetailsSubmit({
          id: this.props.individual_id,
          body: {
            designation: this.state.designation,
            industry: this.state.industry ? this.state.industry.id : null,
            start_date: moment(this.state.start_date).format(
              "YYYY-MM-DDTHH:mmZ"
            ),
            end_date: moment(this.state.end_date).format("YYYY-MM-DDTHH:mmZ"),
            company: this.state.company ? this.state.company.id : null
          }
        })
      : this.props.onExperienceDetailEdit({
          id: this.props.individual_id,
          username: this.props.username,
          history: this.props.history,
          itemId: this.props.data && this.props.data.professionalID,
          body: {
            designation: this.state.designation,
            industry: this.state.industry ? this.state.industry.id : null,
            start_date: moment(this.state.start_date).format(
              "YYYY-MM-DDTHH:mmZ"
            ),
            end_date: moment(this.state.end_date).format("YYYY-MM-DDTHH:mmZ"),
            company: this.state.company ? this.state.company.id : null
          }
        });
  };

  render() {
    console.log("exper compo: ", this.props);

    return this.props.isParamsUserSameAsLoggedUser(
      this.props.username,
      this.props.individualName
    ) ? (
      <div>
        <Card>
          <CardHeader>
            <strong>Add new Experience</strong>
          </CardHeader>
          <CardBody>
            <Form onSubmit={this.onFormSubmit}>
              <Row className="mb-4">
                <Col>
                  <Select
                    placeholder="Select Business Name"
                    isClearable
                    tabSelectsValue={false}
                    isLoading={this.props.fetchLoading}
                    onInputChange={this.debouncedAutocomplete}
                    onFocus={() => this.debouncedAutocomplete(" ")}
                    value={this.state.company}
                    onChange={this.handleSelectChange}
                    valueKey="id"
                    labelKey="business_name"
                    filterOptions={options => options}
                    options={
                      !this.props.fetchLoading ? this.props.businesses : []
                    }
                    noResultsText={
                      !this.props.fetchLoading
                        ? "No Results Found"
                        : "Loading..."
                    }
                  />
                </Col>
                <Col>
                  <Select
                    placeholder="Select Industry"
                    value={this.state.industry}
                    onChange={industry => this.setState({ industry })}
                    valueKey="id"
                    labelKey="name"
                    options={this.props.industries}
                    noResultsText={
                      !this.props.fetchLoading
                        ? "No Results Found"
                        : "Loading..."
                    }
                  />
                </Col>
                <Col>
                  <Input
                    type="text"
                    required
                    placeholder="Designation"
                    value={this.state.designation}
                    onChange={this.onChange.bind(this, "designation")}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Start Date-Time</Label>
                    <Datetime
                      //disabled={this.props.loading}
                      value={this.state.start_date}
                      onChange={time => {
                        this.setState({
                          start_date: moment(time)
                        });
                      }}
                      // utc={true}
                      disableOnClickOutside={false}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>End Date-Time</Label>
                    <Datetime
                      //disabled={this.props.loading}
                      value={this.state.end_date}
                      onChange={time => {
                        this.setState({
                          end_date: moment(time)
                        });
                      }}
                      // utc={true}
                      disableOnClickOutside={false}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button color="primary">
                {this.props.onExperienceDetailsSubmit ? "Submit" : "Edit"}
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    ) : (
      <Redirect to="/404" />
    );
  }
}

export default ExperienceDetailsComponent;
