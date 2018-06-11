import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";
import { SideTreeView } from "./components/Admin";

import { onCategoriesList } from "./actions";

class EcommerceAdmin extends Component {
  componentDidMount() {
    this.props.onCategoriesList();
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs="12" md="3">
            <SideTreeView categories={this.props.categories} />
          </Col>
          <Col xs="12" md="9">
            <div>Detail View</div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(
  ({
    EcommerceContainer: {
      admin: { categories }
    }
  }) => ({
    categories
  }),
  { onCategoriesList }
)(EcommerceAdmin);
