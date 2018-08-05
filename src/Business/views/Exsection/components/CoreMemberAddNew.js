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
import { connect } from "react-redux";
import { onCoreMemberNameSubmit } from "../../../actions";

class CoreMemberAddNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  //state = { name: "" };

  onChangeName = event =>
    this.setState({
      name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  onFormSubmit = event => {
    event.preventDefault();
    console.log("Before set state = " + this.state.name);
    this.props.onCoreMemberNameSubmit({
      //name: this.state.name,
      body: {
        name: this.state.name
      },
      business_slug: this.props.cookies.user_data.slug
    });
    this.setState({ name: "" });
    console.log("After set state = " + this.state.name);
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <strong>Add New Core Member</strong>
            </div>
          </CardHeader>
          <CardBody>
            <Form onSubmit={this.onFormSubmit}>
              <Row>
                <Col xs="5" md="5">
                  <Input
                    required
                    innerRef={ref => (this.focusableInput = ref)}
                    type="text"
                    placeholder="Enter Core Member Name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                  />
                </Col>
                <Col xs="1" md="1">
                  <Button
                    type="submit"
                    color="primary"
                    disabled={this.props.loading}
                  >
                    <span className="fa fa-plus" /> Add
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default connect(
  ({
    auth: { cookies },
    BusinessContainer: {
      exsection: { coremember }
    }
  }) => ({
    cookies,
    access_token: cookies.token_data.access_token,
    coremember
  }),
  {
    onCoreMemberNameSubmit
  }
)(CoreMemberAddNew);
