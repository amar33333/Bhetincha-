import React, { Component } from "react";
import { Form, Row, Col, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import { onFoodGroupItemSubmit, onFoodGroupFetchList } from "../../../actions";

class FoodGroupItemAddNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: ""
    };
  }

  onChangeName = event =>
    this.setState({
      name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  onChangePrice = event =>
    this.setState({
      price: event.target.value
    });

  onFormSubmit = event => {
    event.preventDefault();
    //console.log("Selected Food Group Id = "+this.props.selectedFoodGroupId);
    this.props.onFoodGroupItemSubmit({
      body: {
        name: this.state.name,
        price: this.state.price
      },
      uid: this.props.selectedFoodGroupId
    });
    this.setState({ name: "", price: "" });
  };

  componentDidMount() {
    this.props.onFoodGroupFetchList({ uid: this.props.selectedFoodGroupId });
  }

  render() {
    return (
      <Form
        onSubmit={this.onFormSubmit}
        style={{ paddingBottom: "20px", borderBottom: "2px solid #c2cfd6" }}
      >
        <Row>
          <Col xs="7" md="7">
            <Input
              required
              innerRef={ref => (this.focusableInput = ref)}
              type="text"
              placeholder="Enter Food Item Name"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </Col>
          <Col xs="3" md="3">
            <Input
              required
              type="number"
              placeholder="Enter Price"
              value={this.state.price}
              onChange={this.onChangePrice}
            />
          </Col>
          <Col xs="2" md="2">
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
      exsection: { selectedFoodGroupId }
    }
  }) => ({
    cookies,
    access_token: cookies.token_data.access_token,
    selectedFoodGroupId
  }),
  {
    onFoodGroupItemSubmit,
    onFoodGroupFetchList
  }
)(FoodGroupItemAddNew);
