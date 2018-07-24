import React, { Component } from "react";
import { Icon, List } from "semantic-ui-react";

class ChildCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null
    };
  }
  render() {
    return (
      <div>
        <List>
          {this.props.categories.map(category => (
            <List.Item
              onClick={() => this.props.onSelectCategory(category.uid)}
              key={category.uid}
              icon="angle right"
              content={
                <span style={{ color: "blue", cursor: "pointer" }}>
                  {category.name}
                </span>
              }
            />
          ))}
        </List>
      </div>
    );
  }
}

export default ChildCategories;
