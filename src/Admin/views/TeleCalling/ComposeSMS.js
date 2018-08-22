import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button
} from "reactstrap";

class ComposeSMS extends Component {
  state = { twoWay: false, composeSMSText: "" };

  onFormSubmit = e => {
    e.preventDefault();
    console.log("submitted");
    const type = this.state.twoWay ? "two-way" : "regular";
    const extra = { type };
    const { teleUser } = this.props;

    if (this.state.twoWay) {
      if (teleUser.at === "m") {
        extra.mobileNumber = teleUser.phone_number;
      } else {
        extra.mobileNumber = teleUser.mobileNumber;
      }
      if (teleUser.at === "c") {
        extra.name = teleUser.name;
      } else {
        extra.name = `${teleUser.first_name} ${teleUser.last_name}`;
      }
      if (teleUser.area || teleUser.city) {
        extra.address = `${teleUser.area ? teleUser.area.name : ""}${
          teleUser.area && teleUser.city ? ", " : ""
        }${teleUser.city ? teleUser.city.name : ""}`;
      } else if (teleUser.district) {
        extra.address = teleUser.district.name;
      } else if (teleUser.state) {
        extra.address = teleUser.state.name;
      } else if (teleUser.country) {
        extra.address = teleUser.country.name;
      }
    }

    this.props.onTeleUserSMSSubmit({
      body: {
        log: {
          date: new Date().toISOString(),
          message: this.props.composeSMSText,
          ...extra
        },
        at: this.props.teleUser.at
      },
      phone: teleUser.at === "m" ? teleUser.phone_number : teleUser.mobileNumber
    });
  };

  componentDidUpdate = prevProps => {
    if (prevProps.composeSMSText !== this.props.composeSMSText) {
      this.setState({
        composeSMSText: this.props.composeSMSText
      });
    }
  };

  render() {
    return (
      <Card>
        <CardHeader>
          <strong>Compose SMS</strong>
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.onFormSubmit}>
            <FormGroup>
              <Label for="message">Message</Label>
              <Input
                style={{ height: 200 }}
                type="textarea"
                name="text"
                id="message"
                // readOnly
                onChange={e => {
                  this.setState({
                    composeSMSText: e.target.value
                  });
                }}
                required
                value={this.state.composeSMSText}
              />
              <FormText>
                Character Count: {this.state.composeSMSText.length}
              </FormText>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  checked={this.state.twoWay}
                  onChange={({ target: { checked } }) =>
                    this.setState({ twoWay: checked })
                  }
                />{" "}
                Two Way SMS
              </Label>
            </FormGroup>
            <Button
              type="submit"
              color="primary"
              disabled={
                !(
                  this.props.valid &&
                  this.props.registered &&
                  this.props.composeSMSText.length
                )
              }
            >
              Submit
            </Button>
            {!this.props.valid ? (
              <p>Number is not valid</p>
            ) : (
              !this.props.registered && <p>Number is not registered</p>
            )}
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default ComposeSMS;
