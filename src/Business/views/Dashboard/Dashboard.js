import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";
class Dashboard extends Component {
  render() {
    return (
      <div className="animated fadeIn joyride-dashboard">
        <Row>
          <Col className="d-flex justify-content-end">
            <Button color="link" onClick={this.props.handleTakeTour}>
              Take Tour
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  ({ BusinessContainer: { name_of_reducer } }) => ({ name_of_reducer }),
  {}
)(Dashboard);
