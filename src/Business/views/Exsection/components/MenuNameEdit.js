import React, { Component } from "react";
import { Form, Input, Button, Col, Row } from "reactstrap";

class MenuNameEdit extends Component {
  constructor(props) {
    super(props);
    //const { name } = props.menudata;
    this.state = {
      name: ""
    };
    this.onChangeName = this.onChangeName.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.menudata !== this.props.menudata) {
      const { name } = this.props.menudata;
      this.setState({
        name
      });
    }
  }

  onChangeName = event =>
    this.setState({
      name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  onFormSubmit = event => {
    event.preventDefault();
    const { name } = this.state;
    let body = {};
    if (name !== this.props.menudata.name) {
      body.name = name;
    }
    if (Object.keys(body).length) {
      this.props.onMenuNameUpdate({ body });
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
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </Col>
          <Col xs="3" md="3">
            <Button color="primary" style={{ marginTop: 0 }}>
              <span className="fa fa-check" /> Update
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default MenuNameEdit;
