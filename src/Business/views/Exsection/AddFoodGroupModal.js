import React, { Component } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Form,
  Row,
  Col,
  Input,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { onFoodGroupSubmit } from "../../actions";

class AddFoodGroupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  onChangeName = event =>
    this.setState({
      name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onFoodGroupSubmit({
      body: {
        name: this.state.name
      }
    });
    this.setState({ name: "" });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Container fluid>
          <Row>
            <Col xs="12" md="12">
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
                    <strong>Add New Food Group</strong>
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
                          placeholder="Enter Food Group"
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
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  ({
    auth: { cookies },
    BusinessContainer: {
      exsection: { foodgroup }
    }
  }) => ({
    cookies,
    access_token: cookies.token_data.access_token,
    foodgroup
  }),
  {
    onFoodGroupSubmit
  }
)(AddFoodGroupModal);
