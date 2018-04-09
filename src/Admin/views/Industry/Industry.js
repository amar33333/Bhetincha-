import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form
} from "reactstrap";
import { connect } from "react-redux";

import { onIndustrySubmit } from "../../../actions";

class Industry extends Component {
  state = { industry: "" };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { industry } = this.state;
    this.props.onIndustrySubmit({ industry });
  };

  render() {
    console.log("pdodfsdf indsudsd: ", this.props);
    return (
      <Form onSubmit={this.onFormSubmit}>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-user" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            autoFocus
            required
            type="text"
            placeholder="Type Industry Name"
            value={this.state.industry}
            onChange={this.onChange.bind(this, "industry")}
          />
        </InputGroup>
        <Row>
          <Col xs="6">
            <Button
              color="primary"
              className="px-4"
              //onClick={() => this.onLoginBtnClick()}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    industry: state.industry
  };
};

export default connect(mapStateToProps, { onIndustrySubmit })(Industry);
