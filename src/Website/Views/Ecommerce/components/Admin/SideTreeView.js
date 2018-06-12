import React, { Component } from "react";
import { Treebeard } from "react-treebeard";

class SideTreeView extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: [], active: [], categories: {} };
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
      toggled: this.state.isOpen.includes(category.uid),
      active: this.state.active.includes(category.uid),
      ...extra
    };
  };

  componentDidUpdate(prevProps) {
    if (prevProps.categories !== this.props.categories) {
      this.setState({
        categories: this.updateCategories(this.props.categories)
      });
    }

    if (!prevProps.activeCategory && this.props.activeCategory) {
      this.setState(
        {
          active: [this.props.activeCategory],
          isOpen: [this.props.activeCategory]
        },
        () => {
          this.setState({
            categories: this.updateCategories(this.props.categories)
          });
        }
      );
    }
  }

  onToggle = (node, toggled) => {
    let active = this.props.activeCategory
      ? this.state.active.filter(uid => uid !== this.props.activeCategory)
      : this.state.active;

    if (active.includes(node.uid)) {
      active = active.filter(uid => uid !== node.uid);
    } else {
      active.push(node.uid);
    }

    let isOpen = this.state.isOpen;
    if (toggled) {
      isOpen.push(node.uid);
    } else {
      isOpen = isOpen.filter(uid => uid !== node.uid);
    }

    this.setState({ active, isOpen }, () => {
      this.setState({
        categories: this.updateCategories(this.state.categories)
      });
    });

    this.props.onChangeActiveCategory(node.uid);
  };

  render() {
    return <Treebeard data={this.state.categories} onToggle={this.onToggle} />;
  }
}

export default SideTreeView;
