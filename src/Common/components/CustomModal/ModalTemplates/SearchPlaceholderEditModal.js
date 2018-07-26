import React, { Component } from "react";
import { Button, Input, Form, FormGroup, Row, Col, Label } from "reactstrap";
import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import { ErrorHandling } from "../../../utils/Extras";

class SearchPlaceholderEditModal extends Component {
  state = {
    placeholder: "",
    start_date: "",
    end_date: "",
    placeholderSubmit: false
  };

  componentDidMount() {
    this.setState({
      placeholder: this.props.data.name,
      start_date: this.props.data.start_date,
      end_date: this.props.data.end_date
    });
  }

  componentWillUnmount() {
    this.props.resetSettingsErrors();
  }

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  onFormEdit = event => {
    event.preventDefault();

    const { placeholder, start_date, end_date } = this.state;

    this.props.onSearchPlaceholderEdit({
      id: this.props.data.id,
      body: {
        name: placeholder,
        start_date: moment(start_date).format("YYYY-MM-DDTHH:mmZ"),
        end_date: moment(end_date).format("YYYY-MM-DDTHH:mmZ")
      }
    });
  };

  render() {
    console.log("placeholder: ", this.props);
    return (
      <Form onSubmit={this.onFormEdit}>
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label>Placeholder</Label>
              <Input
                required
                disabled={this.props.loading}
                innerRef={ref => (this.focusableInput = ref)}
                type="text"
                placeholder="Type Search Placeholder Name"
                value={this.state.placeholder}
                onChange={this.onChange.bind(this, "placeholder")}
              />
            </FormGroup>
            <ErrorHandling
              error={
                this.props.settingsEditErrors &&
                this.props.settingsEditErrors.name
              }
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label>Start Date-Time</Label>
              <Datetime
                disabled={this.props.loading}
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
        </Row>
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label>End Date-Time</Label>
              <Datetime
                disabled={this.props.loading}
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
        <Row>
          <Col>
            <Button color="primary" disabled={this.props.placeholderLoading}>
              <span className="fa fa-plus" /> Edit
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default SearchPlaceholderEditModal;
