import React, { Component } from "react";
import InputRange from "react-input-range";
import { Button, Collapse } from "reactstrap";

class FilterRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      maxValue: 10000,
      minValue: 50,
      value: {
        max: 8000,
        min: 5000
      }
    };
  }
  handleSetRange = value => {
    this.setState({ value: value });
  };

  handleSetRangeChange = value => {
    console.log("slide complete with value:", value);
  };

  togglecollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <div className="mt-2 pl-2 mb-3 ecommerce-range-filter">
        {this.props.withTitle && (
          <div className="filter-header-wrapper" onClick={this.togglecollapsed}>
            <h4 className="filter-title mt-1">{this.props.name}</h4>

            {this.state.collapsed ? (
              <i className="fa fa-plus mt-2 pt-3 collapse-icon" />
            ) : (
              <i className="fa fa-minus mt-2 pt-3 collapse-icon" />
            )}
          </div>
        )}
        <Collapse isOpen={!this.state.collapsed}>
          <div className="pt-3 pb-3 pr-3 pl-3">
            <InputRange
              draggableTrack
              name="filterRangeSlider"
              maxValue={this.state.maxValue}
              minValue={this.state.minValue}
              step={500}
              formatLabel={value => `Rs. ${value}`}
              onChange={value => this.handleSetRange(value)}
              onChangeComplete={value => this.handleSetRangeChange(value)}
              value={this.state.value}
            />
          </div>
        </Collapse>
      </div>
    );
  }
}

export default FilterRange;
