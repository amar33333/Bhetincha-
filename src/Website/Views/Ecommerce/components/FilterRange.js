import React, { Component } from "react";
import InputRange from "react-input-range";
import { Collapse } from "reactstrap";

class FilterRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      min: props.value.min,
      max: props.value.max,
      value: {
        max: props.value.max,
        min: props.value.min
      }
    };
  }

  componentDidUpdate(prevProps) {
    const extra = {};
    if (
      prevProps.value.min !== this.props.value.min ||
      prevProps.value.max !== this.props.value.max
    ) {
      extra.value = {};
      extra.value.min = this.props.value.min;
      extra.value.max = this.props.value.max;
      extra.max = this.props.value.max;
      extra.min = this.props.value.min;
    }
    if (Object.keys(extra).length) {
      this.setState({ ...extra });
    }
  }

  handleSetRange = ({ min, max }) => {
    this.setState({
      // value: { min, max }
      value: {
        min: min < this.props.value.min ? this.props.value.min : min,
        max: max > this.props.value.max ? this.props.value.max : max
      }
    });
  };

  handleSetRangeChange = value => {
    this.props.onChangeComplete(value);
  };

  togglecollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <div className="pl-2 mb-2 ecommerce-range-filter">
        {this.props.withTitle && (
          <div className="filter-header-wrapper" onClick={this.togglecollapsed}>
            <h4 className="filter-title">{this.props.name}</h4>

            {this.state.collapsed ? (
              <i className="fa fa-plus collapse-icon" />
            ) : (
              <i className="fa fa-minus collapse-icon" />
            )}
          </div>
        )}
        <Collapse isOpen={!this.state.collapsed}>
          <div className="pt-3 pb-3 pr-3 pl-3">
            {this.state.value.min !== undefined &&
              this.state.value.max !== undefined && (
                <InputRange
                  draggableTrack
                  name="filterRangeSlider"
                  allowSameValues
                  maxValue={this.state.max}
                  minValue={this.state.min}
                  // step={parseInt(
                  //   (this.props.value.max - this.props.value.min) / 100,
                  //   10
                  // )}
                  formatLabel={value =>
                    this.props.unit
                      ? this.props.unitLeft
                        ? `${this.props.unit.split("--")[0] || ""} ${value}`
                        : `${value} ${this.props.unit.split("--")[0] || ""}`
                      : value
                  }
                  onChange={value => this.handleSetRange(value)}
                  onChangeComplete={value => this.handleSetRangeChange(value)}
                  value={this.state.value}
                />
              )}
          </div>
        </Collapse>
      </div>
    );
  }
}

export default FilterRange;
