import React, { Component } from "react";
import InputRange from "react-input-range";

class FilterRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    return (
      <div className="mt-1 pl-2">
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
    );
  }
}

export default FilterRange;
