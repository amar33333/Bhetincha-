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
              <div className="filter-each__wrapper" key={i}>
                <FilterRange
                  withTitle
                  unitLeft={false}
                  value={{ min: 0, max: 100 }}
                  name="Discount Percentage"
                  onChangeComplete={({ min, max }) =>
                    this.props.handleFilterChange({
                      lte: max,
                      gte: min,
                      fieldType: data.fieldType,
                      name: data.name
                    })
                  }
                  unit="%"
                />
              </div>
            );
          } else if (data.name === "price") {
            return null;
          } else if (
            data.fieldType &&
            ["Choices", "MultipleChoices"].includes(data.fieldType)
          ) {
            return (
              <div className="filter-each__wrapper" key={i}>
                <FilterChoice
                  unitLeft={
                    data.unit && data.unit.length
                      ? data.unit[0].indexOf("--") !== -1
                      : false
                  }
                  options={data.options}
                  name={data.name.split("_").join(" ")}
                  onChange={checked => {
                    this.props.handleFilterChange({
                      data: checked,
                      fieldType: data.fieldType,
                      name: `${data.name}${
                        data.unit && data.unit.length ? `--${data.unit[0]}` : ""
                      }`
                    });
                  }}
                  unit={
                    data.unit && data.unit.length ? data.unit[0] : undefined
                  }
                />
              </div>
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
              <div className="filter-each__wrapper" key={i}>
                <FilterRange
                  withTitle
                  unitLeft={
                    data.unit && data.unit.length
                      ? data.unit[0].indexOf("--") !== -1
                      : false
                  }
                  value={{ min: data.min, max: data.max }}
                  name={data.name
                    .split("--")[0]
                    .split("_")
                    .join(" ")}
                  onChangeComplete={({ min, max }) =>
                    this.props.handleFilterChange({
                      lte: max,
                      gte: min,
                      fieldType: data.fieldType,
                      name: `${data.name}${
                        data.unit && data.unit.length ? `--${data.unit[0]}` : ""
                      }`
                    })
                  }
                  unit={
                    data.unit && data.unit.length ? data.unit[0] : undefined
                  }
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }
}

export default Filters;
