import React, { Component } from "react";
import { FormText } from "reactstrap";

// This is for mobile number
export const validatePhone = phoneNumber => {
  const phoneNumberPattern = /^\(?(9\d{2})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return phoneNumberPattern.test(phoneNumber);
};

export const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // console.log("email ; ", re.test(String(email).toLowerCase()));
  return re.test(String(email).toLowerCase());
};

export const validateWebsiteURL = websiteURL => {
  var re = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  // console.log("websiteURL ; ", re.test(websiteURL));
  return re.test(websiteURL);
};

export const FaIconURLjsx = (
  <FormText color="muted">
    <a href="https://fontawesome.com/v4.7.0/icons/" target="_blank">
      You can search icons here
    </a>
  </FormText>
);

export class ErrorHandling extends Component {
  renderError = () => {
    if (this.props.error && this.props.error.length)
      return <p style={{ color: "red" }}>{this.props.error[0]}</p>;
    else if (this.props.errors) {
      return (
        <p style={{ color: "red" }}>
          {Object.keys(this.props.errors).join(" & ")} syntax error occured in
          one of the above contacts
        </p>
      );
    }
  };

  render() {
    // console.log("extras error: ", this.props.error);
    return <div>{this.renderError()}</div>;
  }
}
