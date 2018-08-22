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
  CardBody,
  CardHeader
} from "reactstrap";
import Select from "react-select";
import moment from "moment";
import Datetime from "react-datetime";
import { Redirect } from "react-router-dom";

const EducationLevelVars = [
  { value: "SLC", label: "SLC" },
  { value: "SEE", label: "SEE" },
  { value: "HSEB", label: "HSEB" },
  { value: "BACHELORS", label: "BACHELORS" }
];

class EducationDetailsComponent extends Component {
  state = {
    level_of_education: "",
    name_of_college: "",
    show: false,
    start_date: "",
    end_date: ""
  };

  // Used when page is refreshed
  componentDidMount() {
    this.props.data &&
      this.setState({
        level_of_education: {
          value: this.props.data.level_of_education,
          label: this.props.data.level_of_education
        },
        name_of_college: this.props.data.name_of_college,
        show: this.props.data.show,
        start_date: this.props.data.start_date,
        end_date: this.props.data.end_date
      });
  }

  // Used when data is updated within page without refresh
  componentDidUpdate = prevProps => {
    if (this.props.data !== prevProps.data) {
      this.props.data &&
        this.setState({
          level_of_education: {
            value: this.props.data.level_of_education,
            label: this.props.data.level_of_education
          },
          name_of_college: this.props.data.name_of_college,
          show: this.props.data.show,
          start_date: this.props.data.start_date,
          end_date: this.props.data.end_date
        });
    }
  };

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value
    });

  handleSelectChange = level_of_education =>
    this.setState({ level_of_education });

  onFormSubmit = event => {
    event.preventDefault();

    this.props.isParamsUserSameAsLoggedUser(
      this.props.username,
      this.props.individualName
    ) && this.props.onEducationDetailsSubmit
      ? this.props.onEducationDetailsSubmit({
          id: this.props.individual_id,
          body: {
            level_of_education: this.state.level_of_education
              ? this.state.level_of_education.label
              : null,
            start_date: moment(this.state.start_date).format(
              "YYYY-MM-DDTHH:mmZ"
            ),
            end_date: moment(this.state.end_date).format("YYYY-MM-DDTHH:mmZ"),
            name_of_college: this.state.name_of_college,
            show: this.state.show
          }
        })
      : this.props.onEducationDetailEdit({
          id: this.props.individual_id,
          username: this.props.username,
          history: this.props.history,
          itemId: this.props.data && this.props.data.educationID,
          body: {
            level_of_education: this.state.level_of_education
              ? this.state.level_of_education.label
              : null,
            start_date: moment(this.state.start_date).format(
              "YYYY-MM-DDTHH:mmZ"
            ),
            end_date: moment(this.state.end_date).format("YYYY-MM-DDTHH:mmZ"),
            name_of_college: this.state.name_of_college,
            show: this.state.show
          }
        });
  };

  render() {
    return this.props.isParamsUserSameAsLoggedUser(
      this.props.username,
      this.props.individualName
    ) ? (
      <div>
        <Card>
          <CardHeader>
            <strong>Add new Academic Qualification</strong>
          </CardHeader>
          <CardBody>
            <Form onSubmit={this.onFormSubmit}>
              <Row className="mb-3">
                <Col>
                  <Select
                    placeholder="Choose Education Level"
                    tabSelectsValue={false}
                    value={this.state.level_of_education}
                    onChange={this.handleSelectChange}
                    valueKey="value"
                    labelKey="label"
                    options={EducationLevelVars}
                  />
                </Col>
                <Col>
                  <Input
                    type="text"
                    required
                    placeholder="Name of Institution"
                    value={this.state.name_of_college}
                    onChange={this.onChange.bind(this, "name_of_college")}
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
                <Col
                  style={{
                    paddingTop: 30
                  }}
                >
                  <Label check style={{ marginLeft: "30px" }}>
                    <Input
                      type="checkbox"
                      checked={this.state.show}
                      onChange={() =>
                        this.setState({
                          show: !this.state.show
                        })
                      }
                    />
                    Show
                  </Label>
                </Col>
              </Row>
              <Button color="primary">
                {this.props.onEducationDetailsSubmit ? "Submit" : "Save"}
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

export default EducationDetailsComponent;
