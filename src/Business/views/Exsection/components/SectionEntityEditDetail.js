import React, { Component } from "react";
import AboutUsEditor from "../../../../Website/Views/Minisite/components/AboutUs/AboutUsEditor";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Row,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import Select from "react-select";

import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "./sectionEntityEditDetail.css";

import getBase64 from "../../../../Common/utils/getBase64";
import { MAIN_URL } from "../../../../Common/utils/API";

class SectionEntityEditDetail extends Component {
  constructor(props) {
    super(props);

    let extra = this.getAttributesToState(props.attributes);
    //console.log("consoling section entity props", this.props);
    if (props.defaultValue && props.attributes) {
      extra = {
        ...extra,
        ...this.getDefaultToState(props.attributes, props.defaultValue)
      };
    }

    this.state = {
      dropdownOpen: false,
      sectionEntitySubmit: false,
      ...extra
    };
  }
  toggleDropDown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      (this.props.defaultValue &&
        this.props.attributes &&
        prevProps.defaultValue !== this.props.defaultValue) ||
      prevProps.attributes !== this.props.attributes
    ) {
      this.setState({ ...this.getAttributesToState(this.props.attributes) });

      if (this.props.defaultValue && this.props.attributes) {
        this.setState({
          ...this.getDefaultToState(
            this.props.attributes,
            this.props.defaultValue
          )
        });
      }
    }

    if (prevState.sectionEntitySubmit && !this.props.loading) {
      let updates = { sectionEntitySubmit: false };
      if (!this.props.error) {
        if (!this.props.add) {
          this.props.routeToView();
        }
      }
      this.setState(updates, () => this.focusableInput.focus());
    }
  }

  // prepopulate states
  getAttributesToState = attributes => {
    const extra = {};
    attributes.forEach(attribute => {
      extra[attribute.name] = "";
      // attribute.defaultValue
      //   ? attribute.fieldType === "DateTime"
      //     ? new Date(attribute.defaultValue)
      //     : attribute.defaultValue
      //   : "";
    });

    return extra;
  };

  // for edit: set entered value
  getDefaultToState = (attributes, defaultValue) => {
    const extra = {};
    attributes.forEach(attribute => {
      let selectedKey = "";
      if (
        Object.keys(defaultValue).find(key => {
          let attributeNameUpper = attribute.name;
          if (attributeNameUpper === "Name") {
            attributeNameUpper =
              attributeNameUpper.charAt(0).toLowerCase() +
              attributeNameUpper.slice(1);
          }
          const found = key.split("--")[0] === attributeNameUpper;
          if (found) selectedKey = key;
          return found;
        })
      ) {
        extra[attribute.name] =
          attribute.fieldType === "DateTime"
            ? new Date(defaultValue[selectedKey])
            : defaultValue[selectedKey];
      }
    });

    return extra;
  };

  onChange = (key, value) => this.setState({ [key]: value });

  onFormSubmit = event => {
    event.preventDefault();
    const { sectionEntitySubmit, ...rest } = this.state;
    //console.log("sectionEntitySubmit",sectionEntitySubmit);
    //console.log("Rest Data",rest);

    const { defaultValue } = this.props;
    //console.log("Default Data",defaultValue);

    const updates = {};

    Object.entries(rest).forEach(([key, value]) => {
      let selectedKey = "";
      Object.keys(defaultValue).find(x => {
        const found = x.split("--")[0] === key;
        if (found) selectedKey = x;
        return found;
      });
      if (
        (defaultValue[selectedKey] !== undefined || value !== "") &&
        this.props.attributes.find(x => x.name === key) &&
        (this.props.attributes.find(x => x.name === key).fieldType !==
          "MultipleChoices" ||
          value
            .map(({ value }) => value)
            .sort()
            .join(",") !== defaultValue[selectedKey].sort().join(",")) &&
        (value instanceof Date
          ? defaultValue[selectedKey] !== value.toISOString()
          : defaultValue[selectedKey] != value)
      ) {
        const attribute = this.props.attributes.find(x => x.name === key);
        const attributeType = attribute.fieldType;
        if (key === "Name") {
          key = key.toLowerCase();
        }
        //const unit = attribute.unit;
        updates[key] = {
          attributeType,
          value:
            attributeType === "DateTime"
              ? value.toISOString()
              : attributeType === "MultipleChoices"
                ? value.map(({ value }) => value)
                : value
          //unit: unit && unit.length ? unit[0] : undefined
        };
      }
    });
    //console.log("Update Data",updates);
    if (Object.keys(updates).length) {
      this.setState({ sectionEntitySubmit: true }, () =>
        this.props.onSubmit({
          body: updates,
          uid: defaultValue.uid,
          routeToView: this.props.routeToView
        })
      );
    } else {
      console.log("no changes detected");
    }
  };

  renderField(attribute) {
    if (this.state[attribute.name] === undefined) return null;

    switch (attribute.fieldType) {
      case "DateTime":
        return (
          <FormGroup row key={attribute.uid}>
            <Label sm={3}>{`${attribute.name.split("_").join(" ")} ${
              attribute.required ? "*" : ""
            }`}</Label>
            <Col sm={4}>
              <InputGroup className="section-entity-edit-ecommerce-biz">
                {attribute.unit &&
                attribute.unit.length &&
                attribute.unit[0].indexOf("--") !== -1 ? (
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      {attribute.unit[0].split("--")[0]}
                    </InputGroupText>
                  </InputGroupAddon>
                ) : null}
                <DateTime
                  inputProps={{ required: attribute.required }}
                  value={this.state[attribute.name]}
                  onChange={value => this.onChange(attribute.name, value)}
                />
                {attribute.unit &&
                attribute.unit.length &&
                attribute.unit[0].indexOf("--") === -1 ? (
                  <InputGroupAddon addonType="append">
                    {attribute.unit[0].split("--")[0]}
                  </InputGroupAddon>
                ) : null}
              </InputGroup>
            </Col>
          </FormGroup>
        );

      case "Float":
        return (
          <FormGroup row key={attribute.uid}>
            <Label sm={3}>{`${attribute.name.split("_").join(" ")} ${
              attribute.required ? "*" : ""
            }`}</Label>
            <Col sm={4}>
              <InputGroup>
                {attribute.unit &&
                attribute.unit.length &&
                attribute.unit[0].indexOf("--") !== -1 ? (
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      {attribute.unit[0].split("--")[0]}
                    </InputGroupText>
                  </InputGroupAddon>
                ) : null}
                <Input
                  required={attribute.required}
                  type="number"
                  step="0.01"
                  placeholder={attribute.name}
                  value={this.state[attribute.name]}
                  onChange={event =>
                    this.onChange(attribute.name, event.target.value)
                  }
                />
                {attribute.unit &&
                attribute.unit.length &&
                attribute.unit[0].indexOf("--") === -1 ? (
                  <InputGroupAddon addonType="append">
                    {attribute.unit[0].split("--")[0]}
                  </InputGroupAddon>
                ) : null}
              </InputGroup>
            </Col>
          </FormGroup>
        );

      case "Integer":
        return (
          <FormGroup row key={attribute.uid}>
            <Label sm={3}>{`${attribute.name.split("_").join(" ")} ${
              attribute.required ? "*" : ""
            }`}</Label>
            <Col sm={4}>
              <InputGroup>
                {attribute.unit &&
                attribute.unit.length &&
                attribute.unit[0].indexOf("--") !== -1 ? (
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      {attribute.unit[0].split("--")[0]}
                    </InputGroupText>
                  </InputGroupAddon>
                ) : null}
                <Input
                  required={attribute.required}
                  type="number"
                  placeholder={attribute.name}
                  value={this.state[attribute.name]}
                  onChange={event =>
                    this.onChange(attribute.name, event.target.value)
                  }
                />
                {attribute.unit &&
                attribute.unit.length &&
                attribute.unit[0].indexOf("--") === -1 ? (
                  <InputGroupAddon addonType="append">
                    {attribute.unit[0].split("--")[0]}
                  </InputGroupAddon>
                ) : null}
              </InputGroup>
            </Col>
          </FormGroup>
        );

      case "String":
        return (
          <FormGroup row key={attribute.uid}>
            <Label sm={3}>{`${attribute.name.split("_").join(" ")} ${
              attribute.required ? "*" : ""
            }`}</Label>
            <Col sm={4}>
              <InputGroup>
                {attribute.unit &&
                attribute.unit.length &&
                attribute.unit[0].indexOf("--") !== -1 ? (
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      {attribute.unit[0].split("--")[0]}
                    </InputGroupText>
                  </InputGroupAddon>
                ) : null}
                <Input
                  required={attribute.required}
                  placeholder={attribute.name}
                  value={this.state[attribute.name]}
                  onChange={event =>
                    this.onChange(attribute.name, event.target.value)
                  }
                />
                {attribute.unit &&
                attribute.unit.length &&
                attribute.unit[0].indexOf("--") === -1 ? (
                  <InputGroupAddon addonType="append">
                    {attribute.unit[0].split("--")[0]}
                  </InputGroupAddon>
                ) : null}
              </InputGroup>
            </Col>
          </FormGroup>
        );

      case "LongString":
        return (
          <FormGroup row key={attribute.uid}>
            <Label sm={3}>{`${attribute.name.split("_").join(" ")} ${
              attribute.required ? "*" : ""
            }`}</Label>
            <Col sm={9}>
              <InputGroup>
                {/* {attribute.unit &&
                attribute.unit.length &&
                attribute.unit[0].indexOf("--") !== -1 ? (
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      {attribute.unit[0].split("--")[0]}
                    </InputGroupText>
                  </InputGroupAddon>
                ) : null} */}
                <AboutUsEditor
                  readOnly={this.props.loading}
                  required={attribute.required}
                  placeholder={attribute.name}
                  value={this.state[attribute.name]}
                  onChange={value => this.onChange(attribute.name, value)}
                  // onChange={event =>
                  //   this.onChange(attribute.name, event.target.value)
                  // }
                />

                {/* <Input
                  type="textarea"
                  rows={6}
                  required={attribute.required}
                  placeholder={attribute.name}
                  value={this.state[attribute.name]}
                  onChange={event =>
                    this.onChange(attribute.name, event.target.value)
                  }
                /> */}
                {/* {attribute.unit &&
                attribute.unit.length &&
                attribute.unit[0].indexOf("--") === -1 ? (
                  <InputGroupAddon addonType="append">
                    {attribute.unit[0].split("--")[0]}
                  </InputGroupAddon>
                ) : null} */}
              </InputGroup>
            </Col>
          </FormGroup>
        );

      case "Choices":
        return (
          <FormGroup row key={attribute.uid}>
            <Label sm={3}>{`${attribute.name.split("_").join(" ")} ${
              attribute.required ? "*" : ""
            }`}</Label>
            <Col sm={4}>
              <InputGroup className="section-entity-edit-ecommerce-biz">
                {attribute.unit &&
                attribute.unit.length &&
                attribute.unit[0].indexOf("--") !== -1 ? (
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      {attribute.unit[0].split("--")[0]}
                    </InputGroupText>
                  </InputGroupAddon>
                ) : null}
                <Select
                  options={attribute.options.map(x => ({ value: x, label: x }))}
                  required={attribute.required}
                  onChange={value =>
                    this.onChange(attribute.name, value ? value.value : "")
                  }
                  value={this.state[attribute.name]}
                />
                {attribute.unit &&
                attribute.unit.length &&
                attribute.unit[0].indexOf("--") === -1 ? (
                  <InputGroupAddon addonType="append">
                    {attribute.unit[0].split("--")[0]}
                  </InputGroupAddon>
                ) : null}
              </InputGroup>
            </Col>
          </FormGroup>
        );

      case "MultipleChoices":
        return (
          <FormGroup row key={attribute.uid}>
            <Label sm={3}>{`${attribute.name.split("_").join(" ")} ${
              attribute.required ? "*" : ""
            }`}</Label>
            <Col sm={4}>
              <InputGroup className="section-entity-edit-ecommerce-biz">
                {attribute.unit &&
                attribute.unit.length &&
                attribute.unit[0].indexOf("--") !== -1 ? (
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      {attribute.unit[0].split("--")[0]}
                    </InputGroupText>
                  </InputGroupAddon>
                ) : null}
                <Select
                  multi
                  tabSelectsValue={false}
                  options={attribute.options.map(x => ({ value: x, label: x }))}
                  required={attribute.required}
                  onChange={value => this.onChange(attribute.name, value)}
                  value={this.state[attribute.name]}
                />
                {attribute.unit &&
                attribute.unit.length &&
                attribute.unit[0].indexOf("--") === -1 ? (
                  <InputGroupAddon addonType="append">
                    {attribute.unit[0].split("--")[0]}
                  </InputGroupAddon>
                ) : null}
              </InputGroup>
            </Col>
          </FormGroup>
        );

      default:
        return null;
    }
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <strong>Edit Section Entity</strong>
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.onFormSubmit}>
            {this.props.attributes.map(attribute =>
              this.renderField(attribute)
            )}
            <br />
            <br />
            <Row>
              <Col sm={4}>
                <Button
                  type="submit"
                  color="primary"
                  disabled={this.props.loading}
                >
                  <span className="fa fa-floppy-o" /> Save Changes
                </Button>{" "}
                <Button onClick={() => this.props.routeToView()}>Cancel</Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default SectionEntityEditDetail;
