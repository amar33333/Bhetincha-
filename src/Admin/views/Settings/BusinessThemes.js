import React, { Component } from "react";
import { connect } from "react-redux";
import ColorPicker from "rc-color-picker";
import "rc-color-picker/assets/index.css";

import ThemeColorCard from "../../../Common/components/ThemeColorCard";

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

import { onBusinessThemesList, onBusinessThemeSubmit } from "../../actions";

class BusinessThemes extends Component {
  state = {
    themeTitle: "",
    brandPrimaryColor: { color: "#2e7a29", alpha: 100 },
    brandDarkColor: { color: "#12520e", alpha: 100 },
    brandLightColor: { color: "#25c11c", alpha: 100 },
    brandInfoColor: { color: "#fff", alpha: 100 },
    brandSuccessColor: { color: "#fff", alpha: 100 },
    brandDangerColor: { color: "#fff", alpha: 100 },
    brandWarningColor: { color: "#fff", alpha: 100 }
  };

  componentDidMount() {
    this.props.onBusinessThemesList();
  }

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  onFormSubmit = event => {
    event.preventDefault();

    const {
      themeTitle,
      brandPrimaryColor,
      brandInfoColor,
      brandWarningColor,
      brandSuccessColor,
      brandDangerColor,
      brandDarkColor,
      brandLightColor
    } = this.state;

    this.props.onBusinessThemeSubmit({
      body: {
        themeTitle,
        brandPrimaryColor,
        brandInfoColor,
        brandSuccessColor,
        brandDangerColor,
        brandWarningColor,
        brandDarkColor,
        brandLightColor
      }
    });
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
    const testTheme = {
      themeTitle: "Green Theme",
      brandPrimaryColor: { color: "#2e7a29", alpha: 100 },
      brandDarkColor: { color: "#12520e", alpha: 100 },
      brandLightColor: { color: "#25c11c", alpha: 100 },
      brandInfoColor: { color: "#fff111", alpha: 100 },
      brandSuccessColor: { color: "#fef89e", alpha: 100 },
      brandDangerColor: { color: "#fff78e", alpha: 100 },
      brandWarningColor: { color: "#d3d3d3", alpha: 100 }
    };
    console.log(this.state);
    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="10">
            {/* <PermissionProvider permission="CAN_ADD_INDUSTRY"> */}
            <Card>
              <CardHeader>
                <strong>Add Business Theme</strong>
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
                          value={this.state.themeTitle}
                          onChange={this.onChange.bind(this, "themeTitle")}
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
                        disabled={this.props.placeholderLoading}
                      >
                        <span className="fa fa-plus" /> Add
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
            {/* </PermissionProvider> */}
          </Col>
        </Row>
        <Row>
          <Col>
            <ThemeColorCard theme={testTheme} />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({
  AdminContainer: {
    settings: {
      businessThemes,
      businessThemeSubmitLoading,
      businessThemesFetchLoading
    }
  }
}) => ({
  businessThemes,
  businessThemeSubmitLoading,
  businessThemesFetchLoading
});

export default connect(
  mapStateToProps,
  { onBusinessThemesList, onBusinessThemeSubmit }
)(BusinessThemes);
