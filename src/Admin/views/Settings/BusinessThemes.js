import React, { Component } from "react";
import { connect } from "react-redux";

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
    brandPrimaryColor: "",
    brandInfoColor: "",
    brandSuccessColor: "",
    brandDangerColor: "",
    brandWarningColor: "",
    brandDarkColor: "",
    brandLightColor: ""
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
        brandDarkColor,
        brandLightColor
      }
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="6">
            {/* <PermissionProvider permission="CAN_ADD_INDUSTRY"> */}
            <Card>
              <CardHeader>
                <strong>Add Business Theme</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit}>
                  <Row>
                    <Col xs="12">
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
                      {/* <ErrorHandling
                        error={
                          this.props.settingsErrors &&
                          this.props.settingsErrors.name
                        }
                      /> */}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label for="brandPrimaryColor">
                          Brand Primary Color
                        </Label>
                        <Input
                          type="color"
                          name="brandPrimaryColor"
                          id="brandPrimaryColor"
                          placeholder="Brand Primary Color"
                          onChange={this.onChange.bind(
                            this,
                            "brandPrimaryColor"
                          )}
                        />
                      </FormGroup>
                      {/* <ErrorHandling
                        error={
                          this.props.settingsErrors &&
                          this.props.settingsErrors.name
                        }
                      /> */}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label for="brandInfoColor">Brand Info Color</Label>
                        <Input
                          type="color"
                          name="brandInfoColor"
                          id="brandInfoColor"
                          placeholder="Brand Info Color"
                          onChange={this.onChange.bind(this, "brandInfoColor")}
                        />
                      </FormGroup>
                      {/* <ErrorHandling
                        error={
                          this.props.settingsErrors &&
                          this.props.settingsErrors.name
                        }
                      /> */}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label for="brandSuccessColor">
                          Brand Success Color
                        </Label>
                        <Input
                          type="color"
                          name="brandSuccessColor"
                          id="brandSuccessColor"
                          placeholder="Brand Success Color"
                          onChange={this.onChange.bind(
                            this,
                            "brandSuccessColor"
                          )}
                        />
                      </FormGroup>
                      {/* <ErrorHandling
                        error={
                          this.props.settingsErrors &&
                          this.props.settingsErrors.name
                        }
                      /> */}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label for="brandDangerColor">Brand Danger Color</Label>
                        <Input
                          type="color"
                          name="brandDangerColor"
                          id="brandDangerColor"
                          placeholder="Brand Danger Color"
                          onChange={this.onChange.bind(
                            this,
                            "brandDangerColor"
                          )}
                        />
                      </FormGroup>
                      {/* <ErrorHandling
                        error={
                          this.props.settingsErrors &&
                          this.props.settingsErrors.name
                        }
                      /> */}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label for="brandWarningColor">
                          Brand Warning Color
                        </Label>
                        <Input
                          type="color"
                          name="brandWarningColor"
                          id="brandWarningColor"
                          placeholder="Brand Warning Color"
                          onChange={this.onChange.bind(
                            this,
                            "brandWarningColor"
                          )}
                        />
                      </FormGroup>
                      {/* <ErrorHandling
                        error={
                          this.props.settingsErrors &&
                          this.props.settingsErrors.name
                        }
                      /> */}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label for="brandDarkColor">Brand Dark Color</Label>
                        <Input
                          type="color"
                          name="brandDarkColor"
                          id="brandDarkColor"
                          placeholder="Brand Dark Color"
                          onChange={this.onChange.bind(this, "brandDarkColor")}
                        />
                      </FormGroup>
                      {/* <ErrorHandling
                        error={
                          this.props.settingsErrors &&
                          this.props.settingsErrors.name
                        }
                      /> */}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label for="brandLightColor">Brand Light Color</Label>
                        <Input
                          type="color"
                          name="brandLightColor"
                          id="brandLightColor"
                          placeholder="Brand Light Color"
                          onChange={this.onChange.bind(this, "brandLightColor")}
                        />
                      </FormGroup>
                      {/* <ErrorHandling
                        error={
                          this.props.settingsErrors &&
                          this.props.settingsErrors.name
                        }
                      /> */}
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
