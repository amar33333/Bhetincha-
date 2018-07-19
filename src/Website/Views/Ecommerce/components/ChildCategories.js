import React, { Component } from "react";

class ChildCategories extends Component {
  render() {
    return (
      <div>
        Child
        <ul>
          {this.props.categories.map(category => (
            <li
              key={category.uid}
              style={{ cursor: "pointer" }}
              onClick={() => this.props.onSelectCategory(category.uid)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ChildCategories;
