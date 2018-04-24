import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Media } from "reactstrap";

import avatar from "../../static/img/avatar.jpg";

class BusinessList extends Component {
  render() {
    return (
      <div className="body-wrapper">
        <Container>
          <Row>
            <Col xs="12" md="8">
              <Media>
                <Media left href="#">
                  <Media
                    object
                    // data-src={avatar}
                    src={avatar}
                    className="result-page__thumbnail"
                    alt="Generic placeholder image"
                  />
                </Media>
                <Media body>
                  <Media heading className="result-header__text">
                    Tech Kunja
                  </Media>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                  scelerisque ante sollicitudin commodo. Cras purus odio,
                  vestibulum in vulputate at, tempus viverra turpis. Fusce
                  condimentum nunc ac nisi vulputate fringilla. Donec lacinia
                  congue felis in faucibus.
                </Media>
              </Media>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(({ auth: { cookies } }) => ({
  cookies
}))(BusinessList);
