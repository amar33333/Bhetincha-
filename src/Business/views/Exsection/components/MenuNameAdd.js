import React, { Component } from "react";
import { Form, Input, Button, Col, Row } from "reactstrap";

class MenuNameAdd extends Component {
  constructor(props) {
    super(props);
    //const { name } = props.menudata;
    this.state = {
      name: ""
    };
    this.onChangeName = this.onChangeName.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onChangeName = event =>
    this.setState({
      name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  onFormSubmit = event => {
    event.preventDefault();
    const { name } = this.state;
    let body = { name: this.state.name };

    if (Object.keys(body).length) {
      this.props.onMenuNameAdd({ body });
    }
  };

  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <Row>
          <Col xs="9" md="9">
            <Input
              innerRef={ref => (this.focusableInput = ref)}
              type="text"
              onChange={this.onChangeName}
              placeholder="Enter New Menu"
            />
          </Col>
          <Col xs="3" md="3">
            <Button color="primary" style={{ marginTop: 0 }}>
              <span className="fa fa-add" /> Save
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default MenuNameAdd;
