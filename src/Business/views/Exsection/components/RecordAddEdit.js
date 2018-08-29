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
  Button,
  Alert
} from "reactstrap";
import Select from "react-select";

import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import DocumentInput from "./DocumentInput";

import { SectionLoadingEffect } from "../../../../Common/components";

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
    this.removeClick = this.removeClick.bind(this);
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
    console.log("breached", this.props);
    if (!this.props.parentSectionBiz) {
      return true;
    }
  }
  checkTopSectionAlreadyExists() {
    if (this.props.parentSectionBiz) {
      return false;
    } else if (
      !this.props.parentSectionBiz && this.props.selectedSectionDetailBiz
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
    this.setState({ selectedOption });
  };

  onChange = (key, value, mykey) => {
    //console.log("key", key);
    //console.log("value", value);
    //console.log("mykey", mykey);
    const newArray = Array.from(this.state.inputValues);
    //console.log(newArray);
    newArray[mykey] = { ...newArray[mykey], ...{ [key]: value } };

    this.setState({ inputValues: newArray, [key]: value });
  };

  addClick() {
    const documents = this.state.documents.concat(DocumentInput);
    this.setState({ documents });
  }

  removeClick(i) {
    let documents = [...this.state.documents];
    documents.splice(i, 1);
    this.setState({ documents });
  }

  saveClick(event) {
    event.preventDefault();

    //console.log("this.props", this.props);
    const { inputValues } = this.state;

    console.log("soling inputValues", inputValues);
    let parentSectionId;
    if (this.props.parentSectionBiz && this.props.parentSectionBiz.sections) {
      parentSectionId = this.state.selectedOption
        ? this.state.selectedOption.value
        : null || this.props.parentSectionBiz.sections
          ? this.props.parentSectionBiz.sections[0].id
          : null || 0;
      this.setState({ parentsectionId: parentSectionId });
    }

    if (parentSectionId !== 0) {
      //console.log("inputValues", inputValues);
      inputValues.forEach(value => {
        const obj = value;
        // console.log("obj", obj);

        const body = {
          asid: this.props.activeSectionAdminId,
          parentsectionId: parentSectionId
        };
        // console.log("this.props.attributes", this.props.attributes);
        //{start here}
        this.props.attributes.forEach(({ name, fieldType: attributeType }) => {
          for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
              const upperCaseProperty = property;
              property = property.charAt(0).toLowerCase() + property.slice(1);
              let value = obj[upperCaseProperty];

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
              } else if (
                attributeType === "MultipleChoices" &&
                name === upperCaseProperty
              ) {
                value = value.map(({ value }) => value);
                console.log("for case is multi choice breached", value);
                body[upperCaseProperty] = {
                  attributeType,
                  value
                };
              } else if (name === upperCaseProperty) {
                // console.log("loggin value", value);
                body[upperCaseProperty] = {
                  attributeType,
                  value
                };
              }
            }
          }
        });
        //{end here}
        //console.log("your body is a wonderland", { body });
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
                // required={attribute.required}
                onChange={value =>
                  this.onChange(attribute.name, value ? value.value : "", mykey)
                }
                //value={this.state[attribute.name]}
                value={
                  //this.state["inputValues"] &&
                  this.state["inputValues"][mykey] &&
                  //this.state["inputValues"][mykey].Name &&
                  this.state["inputValues"][mykey][attribute.name]
                    ? this.state["inputValues"][mykey][attribute.name]
                    : ""
                }
                //this.state[inputValues][mykey].attributeName
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
                // required={attribute.required}
                onChange={value => this.onChange(attribute.name, value, mykey)}
                //value={this.state[attribute.name]}
                value={
                  this.state["inputValues"][mykey] &&
                  this.state["inputValues"][mykey][attribute.name]
                    ? this.state["inputValues"][mykey][attribute.name]
                    : ""
                }
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
          removeClick={this.removeClick}
        />
      );
    });
    return (
      <div>
        {!this.checkTopSectionAlreadyExists() && (
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
              {this.props.loading && <SectionLoadingEffect />}
              {!this.props.loading && (
                <Form onSubmit={this.onFormSubmit}>
                  {!(
                    this.props.activeParentAdminId ===
                    this.props.topSectionAdmin.uid
                  ) && (
                    <FormGroup row>
                      {this.props.parentSectionBiz && (
                        <Label sm={3}>Select</Label>
                      )}

                      <Col sm={9}>
                        {this.props.parentSectionBiz &&
                          this.props.parentSectionBiz.sections && (
                            <Select
                              value={
                                selectedOption === null
                                  ? this.props.parentSectionBiz.sections[0].id
                                  : selectedOption
                              }
                              options={this.props.parentSectionBiz.sections.map(
                                x => ({
                                  value: x.id,
                                  label: x.name
                                })
                              )}
                              onChange={this.handleChange}
                            />
                          )}
                      </Col>
                    </FormGroup>
                  )}

                  {this.props.activeSectionAdminId !==
                    this.props.topSectionAdmin.uid &&
                    !this.props.parentSectionBizFlag && (
                      <Alert color="danger">
                        Missing {this.props.topSectionAdmin.name} data or other
                        Section Data. Please add them first.
                      </Alert>
                    )}
                  {this.checkTopSectionAlreadyExists() && (
                    <Alert color="danger">Can only add one Top Section</Alert>
                  )}

                  {(this.props.activeSectionAdminId ===
                    this.props.topSectionAdmin.uid ||
                    this.props.parentSectionBizFlag) && (
                    <div>
                      {documents}

                      {!(
                        this.props.activeSectionAdminId ===
                        this.props.topSectionAdmin.uid
                      ) && (
                        <FormGroup>
                          <Button sm={2} onClick={this.addClick.bind(this)}>
                            + &nbsp;
                            {this.props.selectedSectionDetailAdmin.name
                              ? this.props.selectedSectionDetailAdmin.name
                              : ""}
                          </Button>
                        </FormGroup>
                      )}

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
                    </div>
                  )}
                </Form>
              )}
            </CardBody>
          </Card>
        )}
      </div>
    );
  }
}

export default RecordAddEdit;
