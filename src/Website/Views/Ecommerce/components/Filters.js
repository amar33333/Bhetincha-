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
                withTitle={true}
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
                name={data.name.split("_").join(" ")}
              />
            );
          } else if (
            data.fieldType &&
            ["Integer", "Float", "DateTime"].includes(data.fieldType)
          ) {
            return (
              <FilterRange
                withTitle={true}
                key={data.uid}
                options={data.options}
                name={data.name.split("_").join(" ")}
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
