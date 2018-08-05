import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  Row,
  Col,
  Input,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { onFoodGroupSubmit } from "../../../actions";

class FoodGroupAddNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  onChangeName = event =>
    this.setState({
      name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onFoodGroupSubmit({
      body: {
        name: this.state.name
      }
    });
    this.setState({ name: "" });
  };

  render() {
    return (
      <Form
        onSubmit={this.onFormSubmit}
        style={{ paddingBottom: "20px", borderBottom: "2px solid #c2cfd6" }}
      >
        <Row>
          <Col xs="9" md="9">
            <Input
              required
              innerRef={ref => (this.focusableInput = ref)}
              type="text"
              placeholder="Enter Food Group"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </Col>
          <Col xs="3" md="3">
            <Button
              type="submit"
              color="primary"
              disabled={this.props.loading}
              style={{ float: "right" }}
            >
              <span className="fa fa-plus" /> Add
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default connect(
  ({
    auth: { cookies },
    BusinessContainer: {
      exsection: { foodgroup }
    }
  }) => ({
    cookies,
    access_token: cookies.token_data.access_token,
    foodgroup
  }),
  {
    onFoodGroupSubmit
  }
)(FoodGroupAddNew);
