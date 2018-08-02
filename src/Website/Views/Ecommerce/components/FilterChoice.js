import React, { Component } from "react";
import { Row, Col, Button, Collapse } from "reactstrap";
import { Checkbox } from "semantic-ui-react";

class FilterChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      checked: []
    };
  }

  togglecollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <div>
        <div className="filter-header-wrapper" onClick={this.togglecollapsed}>
          <h4 className="filter-title ">{this.props.name}</h4>
          {this.state.collapsed ? (
            <i className="fa fa-plus collapse-icon" />
          ) : (
            <i className="fa fa-minus collapse-icon" />
          )}
        </div>
        <Collapse isOpen={!this.state.collapsed}>
          {this.props.options.map(opt => {
            return (
              <Row key={opt}>
                <Col>
                  <Checkbox
                    label={
                      this.props.unit
                        ? this.props.unitLeft
                          ? `${this.props.unit.split("--")[0] || ""} ${opt}`
                          : `${opt} ${this.props.unit.split("--")[0] || ""}`
                        : opt
                    }
                    value={opt}
                    checked={this.state.checked.includes(opt)}
                    onChange={(_, { checked, value: label }) =>
                      this.setState(
                        {
                          checked: checked
                            ? [...this.state.checked, label]
                            : this.state.checked.filter(
                                value => value !== label
                              )
                        },
                        () => this.props.onChange(this.state.checked)
                      )
                    }
                  />
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
