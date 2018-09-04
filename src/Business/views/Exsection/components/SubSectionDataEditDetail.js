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
import "./subSectionDataEditDetail.css";

import getBase64 from "../../../../Common/utils/getBase64";
import { MAIN_URL } from "../../../../Common/utils/API";

class SubSectionDataEditDetail extends Component {
  constructor(props) {
    super(props);

    let extra = this.getAttributesToState(props.attributes);
    if (props.defaultValue && props.attributes) {
      extra = {
        ...extra,
        ...this.getDefaultToState(props.attributes, props.defaultValue)
      };
    }

    this.state = {
      dropdownOpen: false,
      subSectionDataSubmit: false,
      imageFile: "",
      documentFile: "",
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

    if (prevState.subSectionDataSubmit && !this.props.loading) {
      let updates = { subSectionDataSubmit: false };
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
    const { subSectionDataSubmit, ...rest } = this.state;
    const { defaultValue } = this.props;

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
          : defaultValue[selectedKey] !== value)
      ) {
        const attribute = this.props.attributes.find(x => x.name === key);
        const attributeType = attribute.fieldType;
        if (key === "Name") {
          key = key.toLowerCase();
        }
        updates[key] = {
          attributeType,
          value:
            attributeType === "DateTime"
              ? value.toISOString()
              : attributeType === "MultipleChoices"
                ? value.map(({ value }) => value)
                : value
        };
      }
    });

    //For Image type attribute
    if (this.state.imageFile !== "") {
      let value = this.state.imageFile.base64;
      let attributeType = this.state.imageFile.name;
      updates["image"] = {
        name: attributeType,
        value
      };
    }
    //For File type attribute
    // if (this.state.documentFile) {
    //   let attributeType = "File";
    //   let value = this.state.documentFile.base64;
    //   updates["File"] = {
    //     attributeType,
    //     value
    //   };
    // } else {
    //   let attributeType = "File";
    //   let value = "";
    //   updates["File"] = {
    //     attributeType,
    //     value
    //   };
    // }

    //console.log("Update Data",updates);
    if (Object.keys(updates).length) {
      this.setState({ subSectionDataSubmit: true }, () =>
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
                {attribute.unit &&
                attribute.unit.length &&
                attribute.unit[0].indexOf("--") !== -1 ? (
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      {attribute.unit[0].split("--")[0]}
                    </InputGroupText>
                  </InputGroupAddon>
                ) : null}
                {/* <AboutUsEditor
                  readOnly={this.props.loading}
                  required={attribute.required}
                  placeholder={attribute.name}
                  value={this.state[attribute.name]}
                  onChange={value => this.onChange(attribute.name, value)}
                  // onChange={event =>
                  //   this.onChange(attribute.name, event.target.value)
                  // }
                /> */}

                <Input
                  type="textarea"
                  rows={6}
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

      case "Image":
        const imgTag = this.props.defaultValue.images.map((img, index) => {
          return (
            <img
              key={index}
              alt="main"
              style={{ width: 100, height: 100 }}
              src={`${MAIN_URL}${this.props.defaultValue.images[index].url}`}
            />
          );
        });
        return (
          <div key={attribute.uid}>
            {this.props.defaultValue.images && (
              <FormGroup row>
                <Label sm={3}>
                  Uploaded {`${attribute.name.split("_").join(" ")}`}
                </Label>
                <Col sm={9}>
                  {imgTag}
                  {/* <img
                    alt="main"
                    style={{ width: 100, height: 100 }}
                    src={`${MAIN_URL}${this.props.defaultValue.images[0].url}`}
                  /> */}
                </Col>
              </FormGroup>
            )}

            <FormGroup row>
              <Label sm={3}>
                Change{" "}
                {`${attribute.name.split("_").join(" ")} ${
                  attribute.required ? "*" : ""
                }`}
              </Label>
              <Col sm={4}>
                <Input
                  id="image"
                  //required={attribute.required ? "true" : "false"}
                  type="file"
                  //className="file-product-add"
                  accept="image/*"
                  onChange={event =>
                    getBase64(event.target.files[0]).then(file =>
                      this.setState({ imageFile: file })
                    )
                  }
                />
              </Col>
            </FormGroup>

            {this.state.imageFile && (
              <div>
                <h5>Selected {`${attribute.name.split("_").join(" ")}`}</h5>
                <img
                  alt={this.state.imageFile.name}
                  src={this.state.imageFile.base64}
                  key={this.state.imageFile.name}
                  style={{ width: 50, height: 50 }}
                />
              </div>
            )}
          </div>
        );

      case "File":
        return (
          <div key={attribute.uid}>
            <FormGroup row>
              <Label sm={3}>{`${attribute.name.split("_").join(" ")} ${
                attribute.required ? "*" : ""
              }`}</Label>
              <Col sm={6}>
                <InputGroup>
                  <Input
                    type="file"
                    required={attribute.required}
                    placeholder={attribute.placeholder}
                    accept="application/pdf"
                    onChange={event =>
                      getBase64(event.target.files[0]).then(file =>
                        this.setState({ documentFile: file })
                      )
                    }
                  />
                </InputGroup>
              </Col>
            </FormGroup>
          </div>
        );

      default:
        return null;
    }
  }

  render() {
    console.log("Props", this.props);
    return (
      <Card>
        <CardHeader>
          <strong>Edit Sub-Section</strong>
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

export default SubSectionDataEditDetail;
