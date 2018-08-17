import React, { Component } from "react";
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
  Button
} from "reactstrap";
import Select from "react-select";

import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import getBase64 from "../../../../Common/utils/getBase64";
import { MAIN_URL } from "../../../../Common/utils/API";

import DocumentInput from "./DocumentInput";

class RecordAddEdit extends Component {
  constructor(props) {
    super(props);

    let extra = this.getAttributesToState(props.attributes);

    this.state = {
      ...extra,
      documents: [DocumentInput],
      inputValues: [],
      selectedOption: null,
      parentSectionId: null
    };
    this.renderField = this.renderField.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getFirstChildUid = this.getFirstChildUid.bind(this);
    this.handleNextSectionClick = this.handleNextSectionClick.bind(this);
    this.checkTopSectionAlreadyExists = this.checkTopSectionAlreadyExists.bind(
      this
    );
    this.checkSectionIsTop = this.checkSectionIsTop.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.attributes &&
      prevProps.attributes !== this.props.attributes
    ) {
      let testextra = this.getAttributesToState(this.props.attributes);
      this.setState({
        ...testextra,
        documents: [DocumentInput],
        inputValues: []
      });
    }
  }

  //check if top section has a initial entry for a particular business

  checkSectionIsTop() {
    if (Object.keys(this.props.parentSectionBiz).length === 0) {
      return true;
    }
  }
  checkTopSectionAlreadyExists() {
    if (Object.keys(this.props.parentSectionBiz).length !== 0) {
      return false;
    } else if (
      Object.keys(this.props.parentSectionBiz).length === 0 &&
      this.props.selectedSectionDetailBiz
        ? this.props.selectedSectionDetailBiz.sections.length === 0
        : ""
    ) {
      return false;
    } else return true;
  }

  // prepopulate states
  getAttributesToState = attributes => {
    const extra = {};
    attributes.forEach(attribute => {
      extra[attribute.name] = "";
    });

    return extra;
  };

  createUI() {
    return this.props.attributes.map((el, i) => {
      return (
        <div key={i}>
          <FormGroup className={"mb-2 mr-sm-2 -mb-sm-0"}>
            {this.renderField(el)}
          </FormGroup>
        </div>
      );
    });
  }

  handleChange = selectedOption => {
    console.log("Handle change", selectedOption);
    this.setState({ selectedOption });
  };

  onChange = (key, value, mykey) => {
    const newArray = Array.from(this.state.inputValues);
    newArray[mykey] = { ...newArray[mykey], ...{ [key]: value } };

    this.setState({ inputValues: newArray, [key]: value });

    //console.log("state", this.state);
  };

  addClick() {
    const documents = this.state.documents.concat(DocumentInput);
    this.setState({ documents });
  }

  saveClick(event) {
    event.preventDefault();

    console.log("this.props", this.props);
    const { inputValues } = this.state;

    const parentSectionId = this.state.selectedOption
      ? this.state.selectedOption.value
      : null || this.props.parentSectionBiz.sections
        ? this.props.parentSectionBiz.sections[0].id
        : null || 0;
    this.setState({ parentsectionId: parentSectionId });

    if (parentSectionId !== 0) {
      console.log("inputValues", inputValues);
      inputValues.forEach(value => {
        const obj = value;
        console.log("obj", obj);

        const body = {
          asid: this.props.activeSectionAdminId,
          parentsectionId: parentSectionId
        };
        console.log("this.props.attributes", this.props.attributes);
        //{start here}
        this.props.attributes.forEach(({ name, fieldType: attributeType }) => {
          for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
              const upperCaseProperty = property;
              property = property.charAt(0).toLowerCase() + property.slice(1);
              let value = obj[upperCaseProperty];
              //let propV = property;
              if (property === "name") {
                body[property] = obj[upperCaseProperty];
              } else if (
                attributeType === "DateTime" &&
                name === upperCaseProperty
              ) {
                value = value.toISOString();
                body[upperCaseProperty] = {
                  attributeType,
                  value
                };
              } else if (name === upperCaseProperty) {
                console.log("loggin value", value);
                body[upperCaseProperty] = {
                  attributeType,
                  value
                };
              }
            }
          }
        });
        //{end here}
        this.props.onSubmit({ body });
      });
    } else {
      inputValues.forEach(value => {
        const obj = value;
        console.log("forEach:", value);
        const body = {
          asid: this.props.activeSectionAdminId
        };
        for (let property in obj) {
          if (obj.hasOwnProperty(property)) {
            body.name = obj[property];
          }
        }

        this.props.onSubmit({ body });
      });
    }
  }

  getFirstChildUid() {
    return this.props.activeChildrenAdmin.uid;
  }

  handleNextSectionClick() {
    const uid = this.getFirstChildUid();

    var children;
    if (this.props.activeChildrenAdmin.children) {
      children = this.props.activeChildrenAdmin.children[0];
    } else children = {};

    if (uid) {
      this.props.onChangeActiveSectionByButton(
        uid,
        this.props.activeSectionAdminId,
        false,
        children
      );
    } else {
      console.log("Went here second");

      this.props.onChangeActiveSectionByButton(
        uid,
        this.props.activeSectionAdminId,
        false,
        {}
      );
    }
  }

  renderField(attribute, mykey) {
    if (this.state[attribute.name] === undefined) return null;

    switch (attribute.fieldType) {
      case "DateTime":
        return (
          <FormGroup row key={attribute.uid}>
            <Label sm={3}>{`${attribute.name} ${
              attribute.required ? "*" : ""
            }`}</Label>
            <Col sm={9}>
              <DateTime
                inputProps={{ required: attribute.required }}
                //value={this.state[attribute.name]}
                onChange={value => this.onChange(attribute.name, value, mykey)}
              />
            </Col>
          </FormGroup>
        );

      case "Float":
        return (
          <FormGroup row key={attribute.uid}>
            <Label sm={3}>{`${attribute.name} ${
              attribute.required ? "*" : ""
            }`}</Label>
            <Col sm={9}>
              <Input
                required={attribute.required}
                type="number"
                step="0.01"
                placeholder={attribute.name}
                // value={this.state[attribute.name]}
                onChange={event =>
                  this.onChange(attribute.name, event.target.value, mykey)
                }
              />
            </Col>
          </FormGroup>
        );

      case "Integer":
        return (
          <FormGroup row key={attribute.uid}>
            <Label sm={3}>{`${attribute.name} ${
              attribute.required ? "*" : ""
            }`}</Label>
            <Col sm={9}>
              <Input
                required={attribute.required}
                type="number"
                placeholder={attribute.name}
                // value={this.state[attribute.name]}
                onChange={event =>
                  this.onChange(attribute.name, event.target.value, mykey)
                }
              />
            </Col>
          </FormGroup>
        );

      case "String":
        // console.log("MYKEY", mykey);
        return (
          <FormGroup row key={attribute.uid}>
            <Label sm={3}>{`${attribute.name} ${
              attribute.required ? "*" : ""
            }`}</Label>
            <Col sm={6}>
              <Input
                required={attribute.required}
                placeholder={attribute.name}
                //value={this.state[attribute.name]}
                onChange={event =>
                  this.onChange(attribute.name, event.target.value, mykey)
                }
              />
            </Col>
          </FormGroup>
        );

      case "Choices":
        return (
          <FormGroup row key={attribute.uid}>
            <Label sm={3}>{`${attribute.name} ${
              attribute.required ? "*" : ""
            }`}</Label>
            <Col sm={9}>
              <Select
                options={attribute.options.map(x => ({ value: x, label: x }))}
                required={attribute.required}
                onChange={value =>
                  this.onChange(attribute.name, value ? value.value : "", mykey)
                }
                value={this.state[attribute.name]}
              />
            </Col>
          </FormGroup>
        );

      case "MultipleChoices":
        return (
          <FormGroup row key={attribute.uid}>
            <Label sm={3}>{`${attribute.name} ${
              attribute.required ? "*" : ""
            }`}</Label>
            <Col sm={9}>
              <Select
                multi
                tabSelectsValue={false}
                options={attribute.options.map(x => ({ value: x, label: x }))}
                required={attribute.required}
                onChange={value => this.onChange(attribute.name, value)}
                value={this.state[attribute.name]}
              />
            </Col>
          </FormGroup>
        );

      default:
        return null;
    }
  }

  render() {
    const { selectedOption } = this.state;
    const documents = this.state.documents.map((Element, index) => {
      return (
        <Element
          key={index}
          mykey={index}
          attributes={this.props.attributes}
          renderField={this.renderField}
        />
      );
    });
    return (
      <Card>
        <CardHeader>
          <strong>
            Add New &nbsp;
            {this.props.selectedSectionDetailAdmin.name
              ? this.props.selectedSectionDetailAdmin.name
              : ""}
          </strong>
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.onFormSubmit}>
            {/* {this.createUI()} */}
            {/* {console.log("consoling this.state", this.state)} */}
            <FormGroup row>
              {Object.keys(this.props.parentSectionBiz).length !== 0 && (
                <Label sm={3}>Select</Label>
              )}

              <Col sm={9}>
                {this.props.parentSectionBiz.sections && (
                  <Select
                    value={
                      selectedOption === null
                        ? this.props.parentSectionBiz.sections[0].id
                        : selectedOption
                    }
                    options={this.props.parentSectionBiz.sections.map(x => ({
                      value: x.id,
                      label: x.name
                    }))}
                    onChange={this.handleChange}
                    // selectedValue={this.props.parentSection.sections[0].id}
                  />
                )}
              </Col>
            </FormGroup>
            {documents}

            <FormGroup>
              {/* {console.log("Proppping", this.props)} */}
              {!this.checkSectionIsTop() && (
                <Button sm={2} onClick={this.addClick.bind(this)}>
                  + &nbsp;
                  {this.props.selectedSectionDetailAdmin.name
                    ? this.props.selectedSectionDetailAdmin.name
                    : ""}
                </Button>
              )}&nbsp;
              {this.props.activeChildrenAdmin &&
                Object.keys(this.props.activeChildrenAdmin).length !== 0 && (
                  <Button
                    sm={2}
                    onClick={this.handleNextSectionClick}
                    disabled={
                      this.props.selectedSectionDetailBiz &&
                      this.props.selectedSectionDetailBiz.sections.length === 0
                    }
                    title={
                      this.props.selectedSectionDetailBiz &&
                      this.props.selectedSectionDetailBiz.sections.length === 0
                        ? "First add " +
                          this.props.selectedSectionDetailAdmin.name
                        : ""
                    }
                  >
                    {this.props.activeChildrenAdmin.name}&nbsp;>>
                  </Button>
                )}
            </FormGroup>
            <FormGroup>
              <Button
                sm={2}
                //color="primary"
                onClick={this.saveClick.bind(this)}
                disabled={this.checkTopSectionAlreadyExists()}
              >
                <span className="fa fa-check" /> Save
              </Button>&nbsp;
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default RecordAddEdit;
