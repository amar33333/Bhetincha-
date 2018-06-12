import React, { Component } from "react";
import { Treebeard } from "react-treebeard";

class SideTreeView extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: {} };
  }

  updateCategories = category => {
    const { children, ...rest } = category;
    const extra = {};
    if (children && children.length) {
      extra.children = children.map(subCategory =>
        this.updateCategories(subCategory)
      );
    }
    return {
      ...rest,
      toggled: this.props.isOpen.includes(category.uid),
      active: this.props.activeCategory === category.uid,
      ...extra
    };
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.categories !== this.props.categories ||
      (!prevProps.activeCategory && this.props.activeCategory) ||
      prevProps.isOpen !== this.props.isOpen
    ) {
      // console.log("called", this.props.activeCategory);
      this.setState({
        categories: this.updateCategories(this.props.categories)
      });
    }
  }

  onToggle = ({ uid }) => {
    this.props.onChangeActiveCategory(uid, this.props.activeCategory);
  };

  render() {
    return <Treebeard data={this.state.categories} onToggle={this.onToggle} />;
  }
}

export default SideTreeView;
