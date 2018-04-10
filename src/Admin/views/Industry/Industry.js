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
  FormGroup,
  Card,
  CardBody,
  CardHeader
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
    this.setState({ industry: "" });
  };

  render() {
    // console.log("pdodfsdf indsudsd: ", this.props);
    return (
      <Row className="hr-centered">
        <Col xs="12" md="6">
          <Card>
            <CardHeader>
              <strong>Add Industry</strong>
            </CardHeader>
            <CardBody>
              <Form onSubmit={this.onFormSubmit} inline>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-industry" />
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
                </FormGroup>
                <Button
                  color="primary"
                  //onClick={() => this.onLoginBtnClick()}
                >
                  <span className="fa fa-plus" /> Add
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    industry: state.industries
  };
};

export default connect(mapStateToProps, { onIndustrySubmit })(Industry);
