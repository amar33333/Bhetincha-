import React, { Component } from "react";
import { Accordion, Icon } from "semantic-ui-react";

class ChildCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null
    };
  }
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };
  render() {
    const { activeIndex } = this.state;
    return (
      <div>
        <Accordion>
          {this.props.categories.map(category => (
            <div>
              <Accordion.Title
                active={activeIndex === category.uid}
                index={0}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                {category.name}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === category.uid}>
                <p>nice</p>
              </Accordion.Content>
            </div>
          ))}
        </Accordion>
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
