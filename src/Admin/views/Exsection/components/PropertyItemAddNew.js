import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Label
} from "reactstrap";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import { Select } from "../../../../Common/components";

class PropertyItemAddNew extends Component {
  constructor(props) {
    super(props);
    // this.state = {};

    this.state = {
      name: "",
      fieldType: null,
      required: false,
      defaultValueString: "",
      defaultValueLongString: "",
      defaultValueDateTime: new Date(),
      defaultValueChoices: null,
      defaultValueMultipleChoices: null,
      defaultValueInteger: 0,
      defaultValueFloat: 0,
      options: [],
      optionsMultiple: [],
      filterable: false,
      loading: false,
      error: false,
      propertySubmit: false,
      placeholder: "",
      showKey: false
    };
  }
  componentDidUpdate = (_, prevState) => {
    if (prevState.propertySubmit && !this.props.loading) {
      const updates = { propertySubmit: false };
      if (!this.props.error) {
        updates.name = "";
        updates.fieldType = null;
        updates.required = false;
        updates.defaultValueString = "";
        updates.defaultValueDateTime = new Date();
        updates.defaultValueChoices = null;
        updates.defaultValueMultipleChoices = null;
        updates.defaultValueInteger = 0;
        updates.defaultValueFloat = 0;
        updates.options = [];
        updates.filterable = false;
        updates.placeholder = "";
        updates.showKey = false;
      }
      this.setState(updates, () => this.focusableInput.focus());
    }
  };

  componentDidUpdate = (_, prevState) => {
    if (prevState.propertySubmit && !this.props.loading) {
      const updates = { propertySubmit: false };
      if (!this.props.error) {
        updates.name = "";
        updates.fieldType = null;
        updates.required = false;
        updates.defaultValueString = "";
        updates.defaultValueLongString = "";
        updates.defaultValueDateTime = new Date();
        updates.defaultValueChoices = null;
        updates.defaultValueMultipleChoices = null;
        updates.defaultValueInteger = 0;
        updates.defaultValueFloat = 0;
        updates.options = [];
        updates.filterable = false;
        updates.placeholder = "";
        updates.showKey = false;
      }
      this.setState(updates, () => this.focusableInput.focus());
    }
  };

  onChangeName = event =>
    this.onChange(
      "name",
      event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    );

  onChangePlaceholder = event =>
    this.onChange("placeholder", event.target.value);

  onChange = (key, value) => this.setState({ [key]: value });

  onFormSubmit = event => {
    event.preventDefault();

    const {
      name,
      fieldType,
      required,
      defaultValueDateTime,
      defaultValueFloat,
      defaultValueInteger,
      defaultValueChoices,
      defaultValueMultipleChoices,
      defaultValueString,
      defaultValueLongString,
      options,
      optionsMultiple,
      filterable,
      placeholder,
      showKey
    } = this.state;

    const body = {
      name,
      attributeTypeId: fieldType.uid,
      sectionId: this.props.activeSection,
      required,
      filterAble: filterable,
      placeholder,
      showKey: showKey
    };

    if (fieldType.name === "Choices") {
      body.options = options.map(({ value }) => value);
    }

    if (fieldType.name === "MultipleChoices") {
      body.options = optionsMultiple.map(({ value }) => value);
    }

    if (required) {
      switch (fieldType.name) {
        case "Integer":
          body.defaultValue = defaultValueInteger;
          break;
        case "String":
          body.defaultValue = defaultValueString;
          break;
        case "Choices":
          body.defaultValue = defaultValueChoices.value;
          break;
        case "Float":
          body.defaultValue = defaultValueFloat;
          break;
        case "DateTime":
          body.defaultValue = defaultValueDateTime;
          break;
        case "MultipleChoices":
          body.defaultValue = defaultValueMultipleChoices.value;
          break;
        case "LongString":
          body.defaultValue = defaultValueLongString;
          break;
        default:
          break;
      }
    }

    this.setState({ propertySubmit: true }, () =>
      this.props.onPropertySubmit({ body })
    );
  };
  render() {
    //console.log("Show Key",showKey);
    return (
      <div>
        <Card>
          <CardHeader>
            <strong>Add New Property</strong>
          </CardHeader>
          <CardBody>
            <Form onSubmit={this.onFormSubmit}>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <FormGroup row>
                  <Label sm={3}>Name</Label>
                  <Col sm={9}>
                    <Input
                      required
                      innerRef={ref => (this.focusableInput = ref)}
                      placeholder="Property Name"
                      type="text"
                      value={this.state.name}
                      onChange={this.onChangeName}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={3}>Placeholder</Label>
                  <Col sm={9}>
                    <Input
                      required
                      placeholder="Placeholder Text"
                      type="text"
                      value={this.state.placeholder}
                      onChange={this.onChangePlaceholder}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="fieldType" sm={3}>
                    Field Type
                  </Label>
                  <Col sm={9}>
                    <Select
                      autosize
                      clearable
                      required
                      name="fieldType"
                      value={this.state.fieldType}
                      onChange={fieldType =>
                        this.onChange("fieldType", fieldType)
                      }
                      options={this.props.attributes}
                      valueKey="uid"
                      labelKey="name"
                    />
                  </Col>
                </FormGroup>

                {this.state.fieldType && (
                  <div>
                    {this.state.fieldType.name === "Choices" && (
                      <FormGroup row>
                        <Label for="options" sm={3}>
                          Options
                        </Label>
                        <Col sm={9}>
                          <Select.Creatable
                            multi
                            onChange={options =>
                              this.onChange("options", options)
                            }
                            value={this.state.options}
                            noResultsText="Type option and press tab or enter"
                            placeholder="Create options"
                          />
                        </Col>
                      </FormGroup>
                    )}
                    {this.state.fieldType.name === "MultipleChoices" && (
                      <FormGroup row>
                        <Label for="optionsMultiple" sm={3}>
                          Options
                        </Label>
                        <Col sm={9}>
                          <Select.Creatable
                            multi
                            onChange={optionsMultiple =>
                              this.onChange("optionsMultiple", optionsMultiple)
                            }
                            value={this.state.optionsMultiple}
                            noResultsText="Type option and press tab or enter"
                            placeholder="Create options"
                          />
                        </Col>
                      </FormGroup>
                    )}
                    <FormGroup row>
                      <Col sm={4}>
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="checkbox"
                              checked={this.state.required}
                              onClick={event => {
                                const extra = {};
                                if (!event.target.checked) {
                                  extra.filterable = false;
                                }
                                this.setState({
                                  required: event.target.checked,
                                  ...extra
                                });
                              }}
                            />
                            Required
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col sm={4}>
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="checkbox"
                              checked={this.state.filterable}
                              onClick={event => {
                                const extra = {};
                                if (event.target.checked) {
                                  extra.required = true;
                                }
                                this.setState({
                                  filterable: event.target.checked,
                                  ...extra
                                });
                              }}
                            />
                            Filterable
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col sm={4}>
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="checkbox"
                              checked={this.state.showKey}
                              onChange={event =>
                                this.setState({ showKey: event.target.checked })
                              }
                            />
                            Show Key
                          </Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                    {this.state.required && (
                      <div>
                        {this.state.fieldType.name === "Choices" && (
                          <FormGroup row>
                            <Label sm={3}>Default Value</Label>
                            <Col sm={9}>
                              <Select
                                options={this.state.options}
                                required
                                onChange={defaultValueChoices =>
                                  this.onChange(
                                    "defaultValueChoices",
                                    defaultValueChoices
                                  )
                                }
                                value={this.state.defaultValueChoices}
                              />
                            </Col>
                          </FormGroup>
                        )}
                        {this.state.fieldType.name === "MultipleChoices" && (
                          <FormGroup row>
                            <Label sm={3}>Default Value</Label>
                            <Col sm={9}>
                              <Select
                                options={this.state.optionsMultiple}
                                required
                                onChange={defaultValueMultipleChoices =>
                                  this.onChange(
                                    "defaultValueMultipleChoices",
                                    defaultValueMultipleChoices
                                  )
                                }
                                value={this.state.defaultValueMultipleChoices}
                              />
                            </Col>
                          </FormGroup>
                        )}
                        {this.state.fieldType.name === "String" && (
                          <FormGroup row>
                            <Label sm={3}>Default Value</Label>
                            <Col sm={9}>
                              <Input
                                required
                                placeholder="Default Value"
                                value={this.state.defaultValueString}
                                onChange={event =>
                                  this.onChange(
                                    "defaultValueString",
                                    event.target.value
                                  )
                                }
                              />
                            </Col>
                          </FormGroup>
                        )}

                        {/* start */}
                        {this.state.fieldType.name === "LongString" && (
                          <FormGroup row>
                            <Label sm={3}>Default Value</Label>
                            <Col sm={9}>
                              <Input
                                required
                                type="textarea"
                                placeholder="Default Value"
                                value={this.state.defaultValueLongString}
                                onChange={event =>
                                  this.onChange(
                                    "defaultValueLongString",
                                    event.target.value
                                  )
                                }
                              />
                            </Col>
                          </FormGroup>
                        )}
                        {/* end */}
                        {this.state.fieldType.name === "Integer" && (
                          <FormGroup row>
                            <Label sm={3}>Default Value</Label>
                            <Col sm={9}>
                              <Input
                                required
                                type="number"
                                placeholder="Default Value"
                                value={this.state.defaultValueInteger}
                                onChange={event =>
                                  this.onChange(
                                    "defaultValueInteger",
                                    event.target.value
                                  )
                                }
                              />
                            </Col>
                          </FormGroup>
                        )}
                        {this.state.fieldType.name === "Float" && (
                          <FormGroup row>
                            <Label sm={3}>Default Value</Label>
                            <Col sm={9}>
                              <Input
                                required
                                type="number"
                                step="0.01"
                                placeholder="Default Value"
                                value={this.state.defaultValueFloat}
                                onChange={event =>
                                  this.onChange(
                                    "defaultValueFloat",
                                    event.target.value
                                  )
                                }
                              />
                            </Col>
                          </FormGroup>
                        )}
                        {this.state.fieldType.name === "DateTime" && (
                          <FormGroup row>
                            <Label sm={3}>Default Value</Label>
                            <Col sm={9}>
                              <DateTime
                                inputProps={{ required: true }}
                                value={this.state.defaultValueDateTime}
                                onChange={defaultValueDateTime =>
                                  this.onChange(
                                    "defaultValueDateTime",
                                    defaultValueDateTime
                                  )
                                }
                              />
                            </Col>
                          </FormGroup>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </FormGroup>
              <Button color="primary">
                <span className="fa fa-plus" /> Add
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default PropertyItemAddNew;
