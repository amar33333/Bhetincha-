import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import FoodGroupList from "./components/FoodGroupList";
import FoodGroupAddNew from "./components/FoodGroupAddNew";

import { onFoodGroupList } from "../../actions";

class ManageSectionMenu extends Component {
  componentDidMount() {
    this.props.onFoodGroupList();
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Container fluid>
          <Row>
            <Col xs="12" md="3">
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
                    <strong>Food Group List</strong>
                  </div>
                </CardHeader>
                <CardBody>
                  <FoodGroupList foodGroups={this.props.foodGroups} />
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" md="9">
              <FoodGroupAddNew />
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
      exsection: { foodGroups }
    }
  }) => ({
    cookies,
    access_token: cookies.token_data.access_token,
    foodGroups
  }),
  {
    onFoodGroupList
  }
)(ManageSectionMenu);
