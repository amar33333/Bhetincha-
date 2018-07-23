import React, { Component } from "react";
import InputRange from "react-input-range";

class FilterRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        max: props.max,
        min: props.min
      }
    };
  }

  componentDidUpdate(prevProps) {
    const value = {};
    if (prevProps.min !== this.props.min) {
      value.min = this.props.min;
    }
    if (prevProps.max !== this.props.max) {
      value.max = this.props.max;
    }
    if (Object.keys(value).length) {
      this.setState({ value });
    }
  }

  handleSetRange = value => {
    this.setState({ value: value });
  };

  handleSetRangeChange = value => {
    console.log("slide complete with value:", value);
  };

  render() {
    return (
      <div className="mt-2 pl-2 mb-3 ecommerce-range-filter">
        {this.props.withTitle && (
          <h4 className="filter-title mt-2">{this.props.name}</h4>
        )}
        <div className="pt-3 pb-3 pr-3 pl-3">
          <InputRange
            draggableTrack
            name="filterRangeSlider"
            maxValue={this.props.max}
            minValue={this.props.min}
            step={parseInt((this.props.max - this.props.min) / 100, 10)}
            formatLabel={value => `Rs. ${value}`}
            onChange={value => this.handleSetRange(value)}
            onChangeComplete={value => this.handleSetRangeChange(value)}
            value={this.state.value}
          />
        </div>
      </div>
    );
  }
}

export default FilterRange;
