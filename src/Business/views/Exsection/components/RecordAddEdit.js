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
      selectedOption: ""
      // parentSectionId: null
    };
    this.renderField = this.renderField.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.saveClick = this.saveClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log("THIS OLD PROPS", prevProps);
    console.log("componentDidUpdate", this.props);

    // var parentSaved;
    // if (this.props.activeSection !== prevProps.activeSection) {
    //   //console.log("Reached inside iff");
    //   //parentSaved = prevProps.activeSection;
    //   this.setState({
    //     // parentSectionId: parentSaved
    //     selectedOption: ""
    //   });
    //   //   //console.log("Parent Saved", prevProps.activeSection);
    // }
    if (
      this.props.attributes &&
      prevProps.attributes !== this.props.attributes
    ) {
      let testextra = this.getAttributesToState(this.props.attributes);
      //console.log("prevProps consoling", prevProps);
      //console.log("prevState consoling", prevState);
      this.setState({
        ...testextra,
        documents: [DocumentInput],
        inputValues: []
      });
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
    let inputValues = [...this.state.inputValues];
    inputValues[mykey] = value;
    this.setState({ inputValues });
    //console.log("FROM ONCHANGE", this.state);
  };

  addClick() {
    //console.log("Document Input", DocumentInput);
    const documents = this.state.documents.concat(DocumentInput);
    this.setState({ documents });
  }

  saveClick(event) {
    event.preventDefault();

    const { inputValues, parentSectionId } = this.state;

    inputValues.forEach(value => {
      //console.log("forEach:", value);
      const body = {
        asid: this.props.activeSection,
        parentsectionId: parentSectionId,
        name: value
      };
      this.props.onSubmit({ body });
    });
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
                value={this.state[attribute.name]}
                onChange={value => this.onChange(attribute.name, value)}
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
                value={this.state[attribute.name]}
                onChange={event =>
                  this.onChange(attribute.name, event.target.value)
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
                value={this.state[attribute.name]}
                onChange={event =>
                  this.onChange(attribute.name, event.target.value)
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
                  this.onChange(attribute.name, value ? value.value : "")
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
    //console.log("Rendering TEST");

    const { selectedOption } = this.state;
    const documents = this.state.documents.map((Element, index) => {
      //console.log("testing index", index);
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
          <strong>{"Add New"}</strong>
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.onFormSubmit}>
            {/* {this.createUI()} */}
            <FormGroup row>
              <Label sm={3}>Select</Label>

              <Col sm={9}>
                {this.props.parentSection.sections && (
                  <Select
                    value={
                      selectedOption === ""
                        ? this.props.parentSection.sections[0].id
                        : selectedOption
                    }
                    options={this.props.parentSection.sections.map(x => ({
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
              <Button sm={2} onClick={this.addClick.bind(this)}>
                +
              </Button>
            </FormGroup>
            <FormGroup>
              <Button onClick={this.saveClick.bind(this)}>Save</Button>&nbsp;
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default RecordAddEdit;
