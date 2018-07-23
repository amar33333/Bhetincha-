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
  InputGroup,
  InputGroupDropdown,
  InputGroupButtonDropdown,
  InputGroupAddon,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Select from "react-select";

import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import getBase64 from "../../../../Common/utils/getBase64";
import { MAIN_URL } from "../../../../Common/utils/API";

class ProductAddEdit extends Component {
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
      productSubmit: false,
      name: "",
      price: "",
      profilePictureFile: "",
      profilePicture: "",
      picturesFile: [],
      pictures: [],
      discount: 0,
      photoInvalid: false,
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

    if (prevState.productSubmit && !this.props.loading) {
      let updates = { productSubmit: false };
      if (!this.props.error) {
        const file = document.querySelector(".file-product-add");
        file.value = "";

        updates.name = "";
        updates.price = "";
        updates.profilePictureFile = "";
        updates.pictures = "";
        updates.picturesFile = "";
        updates.discount = 0;
        updates = {
          ...updates,
          ...this.getAttributesToState(this.props.attributes)
        };
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
      if (defaultValue[attribute.name] !== undefined) {
        extra[attribute.name] =
          attribute.fieldType === "DateTime"
            ? new Date(defaultValue[attribute.name])
            : defaultValue[attribute.name];
      }
    });
    if (defaultValue.name) {
      extra.name = defaultValue.name;
    }
    if (defaultValue.discount) {
      extra.discount = defaultValue.discount;
    }
    if (defaultValue.profilePicture) {
      extra.profilePicture = defaultValue.profilePicture;
    }
    if (defaultValue.price) {
      extra.price = defaultValue.price;
    }
    return extra;
  };

  onChangeName = event =>
    this.onChange(
      "name",
      event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    );

  onChange = (key, value) => this.setState({ [key]: value });

  onFormSubmit = event => {
    event.preventDefault();
    const {
      name,
      price,
      profilePictureFile,
      profilePicture,
      picturesFile,
      pictures,
      discount,
      photoInvalid,
      productSubmit,
      ...rest
    } = this.state;

    if (this.props.add) {
      if (!profilePictureFile) {
        this.setState({ photoInvalid: true });
        // console.log("photo is required");
      } else {
        const extra = {};

        if (picturesFile.length) {
          extra.pictures = picturesFile.map(picture => ({
            name: picture.name,
            value: picture.base64
          }));
        }

        const body = {
          name,
          price: parseFloat(price),
          discount: parseFloat(discount),
          profilePicture: profilePictureFile.base64,
          ...extra
        };

        this.props.attributes.forEach(({ name, fieldType: attributeType }) => {
          let value = "";
          if (attributeType === "DateTime") {
            if (rest[name]) {
              value = rest[name].toISOString();
            } else {
              value = rest[name];
            }
          } else if (attributeType === "MultipleChoices") {
            if (rest[name] && rest[name].length) {
              value = rest[name].map(({ value }) => value);
            } else {
              value = rest[name];
            }
          } else {
            value = rest[name];
          }
          if (rest[name]) {
            body[name] = {
              attributeType,
              value
            };
          }
        });

        this.setState({ productSubmit: true }, () =>
          this.props.onSubmit({ body })
        );
      }
    } else {
      const { defaultValue } = this.props;

      const updates = {};

      if (defaultValue.name && defaultValue.name != name) {
        updates.name = name;
      }
      if (defaultValue.price != price) {
        updates.price = parseFloat(price);
      }
      if (defaultValue.discount != discount) {
        updates.discount = parseFloat(discount);
      }
      if (profilePictureFile) {
        updates.profilePicture = profilePictureFile.base64;
      }

      Object.entries(rest).forEach(([key, value]) => {
        if (
          (defaultValue[key] !== undefined || value !== "") &&
          this.props.attributes.find(x => x.name === key) &&
          (this.props.attributes.find(x => x.name === key).fieldType !==
            "MultipleChoices" ||
            value
              .map(({ value }) => value)
              .sort()
              .join(",") !== defaultValue[key].sort().join(",")) &&
          (value instanceof Date
            ? defaultValue[key] !== value.toISOString()
            : defaultValue[key] != value)
        ) {
          const attributeType = this.props.attributes.find(x => x.name === key)
            .fieldType;
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

      if (Object.keys(updates).length) {
        this.props.onSubmit({
          body: updates,
          categoryId: defaultValue.categoryId,
          uid: defaultValue.uid
        });
      } else {
        console.log("no changes detected");
      }
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
            <Label sm={3}>{`${attribute.name.split("_").join(" ")} ${
              attribute.required ? "*" : ""
            }`}</Label>
            <Col sm={9}>
              <InputGroup>
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
                <Input type="select" name="select" id="exampleSelect">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
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
        return (
          <FormGroup row key={attribute.uid}>
            <Label sm={3}>{`${attribute.name.split("_").join(" ")} ${
              attribute.required ? "*" : ""
            }`}</Label>
            <Col sm={9}>
              <Input
                required={attribute.required}
                placeholder={attribute.name}
                value={this.state[attribute.name]}
                onChange={event =>
                  this.onChange(attribute.name, event.target.value)
                }
              />
            </Col>
          </FormGroup>
        );

      case "Choices":
        return (
          <FormGroup row key={attribute.uid}>
            <Label sm={3}>{`${attribute.name.split("_").join(" ")} ${
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
            <Label sm={3}>{`${attribute.name.split("_").join(" ")} ${
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
    return (
      <Card>
        <CardHeader>
          <strong>{this.props.add ? "Add New Product" : "Edit Product"}</strong>
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.onFormSubmit}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <FormGroup row>
                <Label sm={3}>Name *</Label>
                <Col sm={9}>
                  <Input
                    autoFocus={!this.props.add}
                    required
                    innerRef={ref => (this.focusableInput = ref)}
                    placeholder="Product Name"
                    type="text"
                    value={this.state.name}
                    onChange={this.onChangeName}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Price *</Label>
                <Col sm={9}>
                  <Input
                    required
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={this.state.price}
                    onChange={event =>
                      this.onChange("price", event.target.value)
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Discount Percentage</Label>
                <Col sm={9}>
                  <Input
                    type="number"
                    step="0.01"
                    max="100"
                    min="0"
                    placeholder="Discount"
                    value={this.state.discount}
                    onChange={event =>
                      this.onChange("discount", event.target.value)
                    }
                  />
                </Col>
              </FormGroup>

              {!this.props.add &&
                this.state.profilePicture && (
                  <FormGroup row>
                    <Label sm={3}>Uploaded Photo</Label>
                    <Col sm={9}>
                      <img
                        alt="main"
                        style={{ width: 100, height: 100 }}
                        src={`${MAIN_URL}${this.state.profilePicture}`}
                      />
                    </Col>
                  </FormGroup>
                )}

              <FormGroup row>
                <Label sm={3}>Photo *</Label>
                <Col sm={9}>
                  <Input
                    id="image"
                    required={this.props.add}
                    type="file"
                    className="file-product-add"
                    accept="image/*"
                    onChange={event =>
                      getBase64(event.target.files[0]).then(file =>
                        this.setState({ profilePictureFile: file })
                      )
                    }
                  />
                </Col>
              </FormGroup>

              {this.state.profilePictureFile && (
                <div>
                  <h5>Selected Photo</h5>
                  <img
                    alt={this.state.profilePictureFile.name}
                    src={this.state.profilePictureFile.base64}
                    key={this.state.profilePictureFile.name}
                    style={{ width: 50, height: 50 }}
                  />
                </div>
              )}

              {this.props.attributes.map(attribute =>
                this.renderField(attribute)
              )}

              <FormGroup row>
                <Label sm={3}>Images</Label>
                <Col sm={9}>
                  <Input
                    id="image"
                    multiple
                    type="file"
                    className="file-product-add"
                    accept="image/*"
                    onChange={event =>
                      getBase64(event.target.files, true).then(picturesFile => {
                        this.setState({ picturesFile });
                      })
                    }
                  />
                </Col>
              </FormGroup>

              {this.state.picturesFile.length ? (
                <div>
                  <h5>Selected Images</h5>
                  <Row>
                    {this.state.picturesFile.map(file => (
                      <Col key={file.name}>
                        <img
                          alt={file.name}
                          src={file.base64}
                          style={{ width: 50, height: 50 }}
                        />
                      </Col>
                    ))}
                  </Row>
                </div>
              ) : null}

              {this.props.add ? (
                <Button
                  type="submit"
                  color="primary"
                  disabled={this.props.loading}
                >
                  <span className="fa fa-plus" /> Add
                </Button>
              ) : (
                <div>
                  <Button
                    type="submit"
                    color="primary"
                    disabled={this.props.loading}
                  >
                    <span className="fa fa-floppy-o" /> Save Changes
                  </Button>{" "}
                  <Button onClick={() => this.props.routeToView()}>
                    Cancel
                  </Button>
                </div>
              )}
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default ProductAddEdit;
