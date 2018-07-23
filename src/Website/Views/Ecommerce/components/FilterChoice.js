import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Checkbox } from "semantic-ui-react";

class FilterChoice extends Component {
  render() {
    return (
      <div className="mb-3">
        <h4 className="filter-title mt-2">{this.props.name}</h4>
        {this.props.options.map(opt => {
          return (
            <Row key={opt}>
              <Col>
                <Checkbox label={opt} />
              </Col>
            </Row>
          );
        })}
      </div>
    );
  }
}

export default FilterChoice;
