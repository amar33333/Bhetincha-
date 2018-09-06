import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  Alert,
  InputGroup
} from "reactstrap";
import Select from "react-select";

import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import SubSectionDataInput from "./SubSectionDataInput";

import { SectionLoadingEffect } from "../../../../Common/components";

import getBase64 from "../../../../Common/utils/getBase64";

class RecordAddEdit extends Component {
  constructor(props) {
    super(props);

    let extra = this.getAttributesToState(props.attributes);

    this.state = {
      ...extra,
      subSectionDataInputs: [SubSectionDataInput],
      inputValues: [],
      selectedOption: null,
      parentSectionId: null,
      imageFile: "",
      documentFile: ""
    };
    this.renderField = this.renderField.bind(this);
    this.onChange = this.onChange.bind(this);
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
        subSectionDataInputs: [SubSectionDataInput],
        inputValues: [],
        imageFile: "",
        documentFile: ""
      });
    }
  }

  //check if top section has a initial entry for a particular business
  checkSectionIsTop() {
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
    const newArray = Array.from(this.state.inputValues);
    newArray[mykey] = { ...newArray[mykey], ...{ [key]: value } };

    this.setState({ inputValues: newArray, [key]: value });
    // console.log("coling this state inputValues", this.state.inputValues);
  };

  addClick() {
    const subSectionDataInputs = this.state.subSectionDataInputs.concat(
      SubSectionDataInput
    );
    this.setState({ subSectionDataInputs });
  }

  removeClick(i) {
    let subSectionDataInputs = [...this.state.subSectionDataInputs];
    subSectionDataInputs.splice(i, 1);
    this.setState({ subSectionDataInputs });
  }

  saveClick(event) {
    event.preventDefault();
    const { inputValues } = this.state;
    let parentSectionId;
    //** comment not to be deleted
    //if parentselectbox is not present use the parentSectionBiz props
    if (this.props.parentSectionBiz && this.props.parentSectionBiz.sections) {
      parentSectionId = this.state.selectedOption
        ? this.state.selectedOption.value
        : null || this.props.parentSectionBiz.sections
          ? this.props.parentSectionBiz.sections[0].id
          : null || 0;
      this.setState({ parentsectionId: parentSectionId });
    }

    if (parentSectionId) {
      const body = {
        asid: this.props.activeSectionAdminId,
        parentsectionId: parentSectionId
      };

      // console.log("initially body", body);
      //console.log("this props attributes", this.props.attributes);
      //console.log("this props input values", inputValues);

      inputValues.forEach(value => {
        const obj = value;
        this.props.attributes.forEach(({ name, fieldType: attributeType }) => {
          //console.log("soling object", obj);
          //console.log("soling name", name);
          // console.log("soling attributeType", attributeType);

          if (name in obj) {
            //  console.log("true", name);
            for (var property in obj) {
              let bodyValue = obj[property];
              if (property === "Name") {
                const lowerCaseProperty =
                  property.charAt(0).toLowerCase() + property.slice(1);
                //  console.log("breached here in name if");
                body[lowerCaseProperty] = obj[property];
              } else if (attributeType === "Float") {
                //  console.log("breached hre in else if float");
                body[name] = {
                  attributeType,
                  value: bodyValue
                };
              } else if (attributeType === "DateTime") {
                bodyValue = bodyValue.toISOString();
                body[name] = {
                  attributeType,
                  value: bodyValue
                };
              } else if (attributeType === "MultipleChoices") {
                bodyValue = bodyValue.map(({ value }) => value);
                body[name] = {
                  attributeType,
                  value: bodyValue
                };
              } else if (attributeType === "Image") {
                if (this.state.imageFile !== "") {
                  let imgvalue = this.state.imageFile.base64;
                  let attributeType = this.state.imageFile.name;
                  body["image"] = {
                    name: attributeType,
                    imgvalue
                  };
                }
              } else if (attributeType === "File") {
                if (this.state.documentFile !== "") {
                  let bodyValue = this.state.documentFile.base64;
                  body["File"] = {
                    attributeType,
                    bodyValue
                  };
                } else {
                  let bodyValue = "";
                  body["File"] = {
                    attributeType,
                    bodyValue
                  };
                }
              }
              //for any other attributeType beside above mentioned do this
              else {
                body[name] = {
                  attributeType,
                  value: bodyValue
                };
              }
            }
          }
        });
        console.log("Body from if", body);
        this.props.onSubmit({ body });
      });
    }
    // for top section if there is no parentSectionId use this
    else {
      inputValues.forEach(value => {
        const obj = value;
        const body = {
          asid: this.props.activeSectionAdminId
        };
        for (let property in obj) {
          if (obj.hasOwnProperty(property)) {
            body.name = obj[property];
          }
        }
        console.log(" from else Body", body);
        this.props.onSubmit({ body });
      });
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
                placeholder={attribute.placeholder}
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
                placeholder={attribute.placeholder}
                onChange={event =>
                  this.onChange(attribute.name, event.target.value, mykey)
                }
              />
            </Col>
          </FormGroup>
        );

      case "String":
        return (
          <FormGroup row key={attribute.uid}>
            <Label sm={3}>{`${attribute.name} ${
              attribute.required ? "*" : ""
            }`}</Label>
            <Col sm={6}>
              <Input
                required={attribute.required}
                placeholder={attribute.placeholder}
                onChange={event =>
                  this.onChange(attribute.name, event.target.value, mykey)
                }
              />
            </Col>
          </FormGroup>
        );

      case "LongString":
        return (
          <FormGroup row key={attribute.uid}>
            <Label sm={3}>{`${attribute.name.split("_").join(" ")} ${
              attribute.required ? "*" : ""
            }`}</Label>
            <Col sm={6}>
              <InputGroup>
                <Input
                  type="textarea"
                  rows={8}
                  required={attribute.required}
                  placeholder={attribute.placeholder}
                  onChange={event =>
                    this.onChange(attribute.name, event.target.value, mykey)
                  }
                />
              </InputGroup>
            </Col>
          </FormGroup>
        );

      case "URL":
        return (
          <FormGroup row key={attribute.uid}>
            <Label sm={3}>{`${attribute.name.split("_").join(" ")} ${
              attribute.required ? "*" : ""
            }`}</Label>
            <Col sm={6}>
              <InputGroup>
                <Input
                  type="text"
                  required={attribute.required}
                  placeholder={attribute.placeholder}
                  onChange={event =>
                    this.onChange(attribute.name, event.target.value, mykey)
                  }
                />
              </InputGroup>
            </Col>
          </FormGroup>
        );

      case "Image":
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
                    accept="image/*"
                    onChange={event =>
                      getBase64(event.target.files[0]).then(file =>
                        this.setState({ imageFile: file })
                      )
                    }
                  />
                </InputGroup>
              </Col>
            </FormGroup>
            {/* selected image preview section */}
            {this.state.imageFile && (
              <div>
                <h5>Selected Photo</h5>
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
                value={
                  this.state["inputValues"][mykey] &&
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
                onChange={value => this.onChange(attribute.name, value, mykey)}
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
    const subSectionDataInputs = this.state.subSectionDataInputs.map(
      (Element, index) => {
        return (
          <Element
            key={index}
            mykey={index}
            attributes={this.props.attributes}
            renderField={this.renderField}
            removeClick={this.removeClick}
          />
        );
      }
    );
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
                        <Label sm={3}>
                          Select {this.props.activeParentAdmin.name}
                        </Label>
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
                      {subSectionDataInputs}

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
