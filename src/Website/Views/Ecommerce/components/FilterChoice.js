import React, { Component } from "react";
import { Row, Col, Button, Collapse } from "reactstrap";
import { Checkbox } from "semantic-ui-react";

class FilterChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  togglecollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    return (
      <div className="mb-3">
        <div className="filter-header-wrapper" onClick={this.togglecollapsed}>
          <h4 className="filter-title mt-2">{this.props.name}</h4>
          {this.state.collapsed ? (
            <i className="fa fa-plus mt-2 pt-3 collapse-icon" />
          ) : (
            <i className="fa fa-minus mt-2 pt-3 collapse-icon" />
          )}
        </div>
        <Collapse isOpen={!this.state.collapsed}>
          {this.props.options.map(opt => {
            return (
              <Row>
                <Col>
                  <Checkbox label={opt} />
                </Col>
              </Row>
            );
          })}
        </Collapse>
      </div>
    );
  }
}

export default FilterChoice;
