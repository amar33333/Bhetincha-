import React, { Component } from "react";
import FilterChoice from "./FilterChoice";
import FilterRange from "./FilterRange";

class Filters extends Component {
  render() {
    return (
      <div className="mt-5 pl-2">
        {this.props.filters.map((data, i) => {
          if (data.name === "discount") {
            return (
              <FilterRange
                withTitle
                key={i}
                value={{ min: data.min, max: data.max }}
                name="Discount"
                onChangeComplete={({ min, max }) =>
                  this.props.handleFilterChange({
                    lte: max,
                    gte: min,
                    fieldType: data.fieldType,
                    name: data.name
                  })
                }
              />
            );
          } else if (data.name === "price") {
            return null;
          } else if (
            data.fieldType &&
            ["Choices", "MultipleChoices"].includes(data.fieldType)
          ) {
            return (
              <FilterChoice
                key={i}
                options={data.options}
                name={data.name.split("_").join(" ")}
                onChange={checked => {
                  this.props.handleFilterChange({
                    data: checked,
                    fieldType: data.fieldType,
                    name: data.name
                  });
                }}
              />
            );
          } else if (
            data.fieldType &&
            [
              "Integer",
              "Float"
              //  "DateTime"
            ].includes(data.fieldType)
          ) {
            return (
              <FilterRange
                withTitle
                key={i}
                value={{ min: data.min, max: data.max }}
                name={data.name.split("_").join(" ")}
                onChangeComplete={({ min, max }) =>
                  this.props.handleFilterChange({
                    lte: max,
                    gte: min,
                    fieldType: data.fieldType,
                    name: data.name
                  })
                }
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
