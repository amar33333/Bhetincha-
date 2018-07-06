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
  onFormSubmit = e => {
    e.preventDefault();
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <strong>Compose SMS</strong>
          </CardHeader>
          <CardBody>
            <Form onSubmit={this.onFormSubmit}>
              <FormGroup>
                <Label for="message">Message</Label>
                <Input
                  type="textarea"
                  name="text"
                  id="message"
                  readOnly
                  value="Tech Kunja"
                />
                <FormText>Character Count: 300</FormText>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Two Way SMS
                </Label>
              </FormGroup>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ComposeSMS;
