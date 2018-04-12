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
  Label,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import Select from "react-select";

import { connect } from "react-redux";

import {
  onCategorySubmit,
  onIndustryList,
  onUnmountIndustry,
  onUnmountCategory
} from "../../actions";

class Categories extends Component {
  state = {
    category: "",
    industry: ""
  };

  componentWillMount() {
    this.props.onIndustryList();
  }

  componentWillUnmount() {
    this.props.onUnmountIndustry();
  }

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { category, industry } = this.state;
    console.log("asdqwew;asdad;A: ", category, industry);
    this.props.onCategorySubmit({
      industry: industry.value,
      category
    });
    this.setState({ category: "", industry: "" });
  };

  handleIndustryChange = industry => {
    this.setState({ industry });
    // console.log(`Selected: ${industry.label}`);
  };

  render() {
    // console.log("cqeqweL: ", this.props);
    const industries = this.props.industries.data
      ? this.props.industries.data.map(industry => {
          return { value: industry.id, label: industry.name };
        })
      : null;

    // console.log("indsua: ", industries);

    // if (industries) {
    //   this.setState({ industries });
    // }

    // industries ? this.setState({ industries }) : null;
    // const industries = this.props.industries
    //   ? this.props.industries.map(industry => {
    //       return { value: industry.id, label: industry.name };
    //     })
    //   : null;

    // console.log("asdasds: ", industries);

    // this.setState({ industries }, () => {
    //   console.log("prin indsus: ", this.state);
    // });

    const { industry } = this.state;
    const value = industry && industry.value;

    return (
      <Row className="hr-centered">
        <Col xs="12" md="8">
          <Card>
            <CardHeader>
              <strong>Add Categories</strong>
            </CardHeader>
            <CardBody>
              <Form onSubmit={this.onFormSubmit}>
                <Row className="mb-3">
                  <Col xs="12" md="6">
                    <Label for="Industies">Industry</Label>
                    <Select
                      autoFocus
                      autosize
                      clearable
                      required
                      name="Industies"
                      className="select-industry"
                      value={value}
                      onChange={this.handleIndustryChange}
                      options={industries}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="4">
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          autoFocus
                          required
                          type="text"
                          placeholder="Type Category Name"
                          value={this.state.category}
                          onChange={this.onChange.bind(this, "category")}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="2">
                    <Button
                      color="primary"
                      //onClick={() => this.onLoginBtnClick()}
                    >
                      <span className="fa fa-plus" /> Add
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default connect(
  ({ AdminContainer: { industries } }) => ({ industries }),
  { onCategorySubmit, onIndustryList, onUnmountIndustry, onUnmountCategory }
)(Categories);
