import React, { Component } from "react";
import ColorPicker from "rc-color-picker";
import "rc-color-picker/assets/index.css";

import {
  Button,
  Col,
  Row,
  Input,
  Form,
  FormGroup,
  Label,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";
import { toast } from "react-toastify";

class BusinessThemeComponent extends Component {
  state = {
    title: "",
    brandPrimaryColor: { color: "#fff", alpha: 100 },
    brandDarkColor: { color: "#fff", alpha: 100 },
    brandLightColor: { color: "#fff", alpha: 100 },
    brandInfoColor: { color: "#fff", alpha: 100 },
    brandSuccessColor: { color: "#fff", alpha: 100 },
    brandDangerColor: { color: "#fff", alpha: 100 },
    brandWarningColor: { color: "#fff", alpha: 100 }
  };

  componentDidUpdate = prevProps => {
    if (this.props.businessTheme !== prevProps.businessTheme) {
      const {
        title,
        brandPrimaryColor,
        brandInfoColor,
        // brandWarningColor,
        brandSuccessColor,
        brandDangerColor,
        brandDarkColor,
        brandLightColor
      } = this.props.businessTheme;

      this.setState({
        title,
        brandPrimaryColor,
        brandInfoColor,
        // brandWarningColor,
        brandSuccessColor,
        brandDangerColor,
        brandDarkColor,
        brandLightColor
      });
    }
  };

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  onFormSubmit = event => {
    event.preventDefault();

    const {
      title,
      brandPrimaryColor,
      brandInfoColor,
      brandWarningColor,
      brandSuccessColor,
      brandDangerColor,
      brandDarkColor,
      brandLightColor
    } = this.state;

    this.props.onBusinessThemeSubmit
      ? this.props.onBusinessThemeSubmit({
          body: {
            title,
            brandPrimaryColor,
            brandInfoColor,
            brandSuccessColor,
            brandDangerColor,
            brandWarningColor,
            brandDarkColor,
            brandLightColor
          }
        })
      : this.props.businessTheme
        ? this.props.onBusinessThemeEdit({
            id: this.props.businessTheme.id,
            body: {
              title,
              brandPrimaryColor,
              brandInfoColor,
              brandSuccessColor,
              brandDangerColor,
              brandWarningColor,
              brandDarkColor,
              brandLightColor
            }
          })
        : toast.error("No Business Theme Found");
  };

  onColorChange = (name, color) => {
    this.setState({
      [name]: {
        color: color.color,
        alpha: color.alpha
      }
    });
  };

  render() {
    console.log("compop: ", this.props);
    const testTheme = {
      title: "Green Theme",
      brandPrimaryColor: { color: "#2e7a29", alpha: 100 },
      brandDarkColor: { color: "#12520e", alpha: 100 },
      brandLightColor: { color: "#25c11c", alpha: 100 },
      brandInfoColor: { color: "#fff", alpha: 100 },
      brandSuccessColor: { color: "#fff", alpha: 100 },
      brandDangerColor: { color: "#fff", alpha: 100 },
      brandWarningColor: { color: "#fff", alpha: 100 }
    };

    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="10">
            {/* <PermissionProvider permission="CAN_ADD_INDUSTRY"> */}
            <Card>
              <CardHeader>
                <strong>
                  {this.props.onBusinessThemeSubmit
                    ? `Add Business Theme`
                    : `Edit Business Theme`}
                </strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Theme Title</Label>
                        <Input
                          required
                          //disabled={this.props.loading}
                          type="text"
                          placeholder="Type Theme Title"
                          value={this.state.title}
                          onChange={this.onChange.bind(this, "title")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="d-flex flex-column">
                      <ColorPicker
                        color={this.state.brandPrimaryColor.color}
                        alpha={this.state.brandPrimaryColor.alpha}
                        onChange={color =>
                          this.onColorChange("brandPrimaryColor", color)
                        }
                        placement="topLeft"
                      >
                        <span className="rc-color-picker-trigger" />
                      </ColorPicker>
                      <p>
                        <strong>Brand Primary</strong>
                      </p>
                    </Col>
                    <Col className="d-flex flex-column">
                      <ColorPicker
                        color={this.state.brandDarkColor.color}
                        alpha={this.state.brandDarkColor.alpha}
                        onChange={color =>
                          this.onColorChange("brandDarkColor", color)
                        }
                        placement="topLeft"
                      >
                        <span className="rc-color-picker-trigger" />
                      </ColorPicker>
                      <p>
                        <strong>Brand Primary Dark</strong>
                      </p>
                    </Col>
                    <Col className="d-flex flex-column">
                      <ColorPicker
                        color={this.state.brandLightColor.color}
                        alpha={this.state.brandLightColor.alpha}
                        onChange={color =>
                          this.onColorChange("brandLightColor", color)
                        }
                        placement="topLeft"
                      >
                        <span className="rc-color-picker-trigger" />
                      </ColorPicker>
                      <p>
                        <strong>Brand Primary Light</strong>
                      </p>
                    </Col>
                    <Col className="d-flex flex-column">
                      <ColorPicker
                        color={this.state.brandInfoColor.color}
                        alpha={this.state.brandInfoColor.alpha}
                        onChange={color =>
                          this.onColorChange("brandInfoColor", color)
                        }
                        placement="topLeft"
                      >
                        <span className="rc-color-picker-trigger" />
                      </ColorPicker>
                      <p>
                        <strong>Brand Info Color</strong>
                      </p>
                    </Col>
                    <Col className="d-flex flex-column">
                      <ColorPicker
                        color={this.state.brandSuccessColor.color}
                        alpha={this.state.brandSuccessColor.alpha}
                        onChange={color =>
                          this.onColorChange("brandSuccessColor", color)
                        }
                        placement="topLeft"
                      >
                        <span className="rc-color-picker-trigger" />
                      </ColorPicker>
                      <p>
                        <strong>Brand Success Color</strong>
                      </p>
                    </Col>
                    <Col className="d-flex flex-column">
                      <ColorPicker
                        color={this.state.brandWarningColor.color}
                        alpha={this.state.brandWarningColor.alpha}
                        onChange={color =>
                          this.onColorChange("brandWarningColor", color)
                        }
                        placement="topLeft"
                      >
                        <span className="rc-color-picker-trigger" />
                      </ColorPicker>
                      <p>
                        <strong>Brand Warning Color</strong>
                      </p>
                    </Col>
                    <Col className="d-flex flex-column">
                      <ColorPicker
                        color={this.state.brandDangerColor.color}
                        alpha={this.state.brandDangerColor.alpha}
                        onChange={color =>
                          this.onColorChange("brandDangerColor", color)
                        }
                        placement="topLeft"
                      >
                        <span className="rc-color-picker-trigger" />
                      </ColorPicker>
                      <p>
                        <strong>Brand Danger Color</strong>
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        color="primary"
                        disabled={
                          this.props.businessThemeSubmitLoading ||
                          this.props.businessThemesFetchLoading
                        }
                      >
                        <span className="fa fa-plus" />{" "}
                        {this.props.onBusinessThemeSubmit ? `Add` : `Edit`}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
            {/* </PermissionProvider> */}
          </Col>
        </Row>
      </div>
    );
  }
}
export default BusinessThemeComponent;
