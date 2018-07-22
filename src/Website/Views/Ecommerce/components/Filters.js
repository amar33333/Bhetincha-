import React, { Component } from "react";
import FilterChoice from "./FilterChoice";
import FilterRange from "./FilterRange";

class Filters extends Component {
  render() {
    return (
      <div className="mt-5">
        <h4 className="filter-title">Price</h4>
        {this.props.filters.map((data, i) => {
          if (data.name === "discount") {
            return (
              <FilterRange
                key={i}
                min={data.min}
                max={data.max}
                name="Discount"
              />
            );
          } else if (
            data.fieldType &&
            ["Choices", "MultipleChoices"].includes(data.fieldType)
          ) {
            return (
              <FilterChoice
                key={data.uid}
                options={data.options}
                name={data.name}
              />
            );
          } else if (
            data.fieldType &&
            ["Integer", "Float", "DateTime"].includes(data.fieldType)
          ) {
            return (
              <FilterRange
                key={data.uid}
                options={data.options}
                name={data.name}
              />
            );
          }

          return null;
        })}
      </div>
    );
  }
}

export default Filters;
