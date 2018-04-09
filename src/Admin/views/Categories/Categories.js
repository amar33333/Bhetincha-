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
  Label
} from "reactstrap";
import Select from "react-select";

import { connect } from "react-redux";

import { onCategorySubmit, onIndustryList } from "../../../actions";

class Categories extends Component {
  state = {
    category: "",
    industry: ""
  };

  componentWillMount() {
    this.getIndustriesList();
  }

  getIndustriesList = () => {
    this.props.onIndustryList();
  };

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
  };

  handleIndustryChange = industry => {
    this.setState({ industry });
    // console.log(`Selected: ${industry.label}`);
  };

  render() {
    console.log("cqeqweL: ", this.props);
    const industries = this.props.industries.data
      ? this.props.industries.data.map(industry => {
          return { value: industry.id, label: industry.name };
        })
      : null;

    console.log("indsua: ", industries);

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
      <Form onSubmit={this.onFormSubmit}>
        <Label for="group">Group</Label>
        <Select
          autoFocus
          required
          name="Industies"
          value={value}
          onChange={this.handleIndustryChange}
          options={industries}
        />
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
            placeholder="Type Category Name"
            value={this.state.category}
            onChange={this.onChange.bind(this, "category")}
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
    industries: state.industry
  };
};
export default connect(mapStateToProps, { onCategorySubmit, onIndustryList })(
  Categories
);
