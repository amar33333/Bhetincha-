import React, { Component } from "react";
import { Treebeard } from "react-treebeard";
import debounce from "lodash.debounce";
import * as filters from "../../../config/filterTreeView";

class SideTreeView extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: {}, searchKeyword: "" };
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
        categories: this.filterUsingSearch(
          this.updateCategories(this.props.categories),
          this.state.searchKeyword
        )
      });
    }
  }

  filterUsingSearch = (categories, keyword) => {
    if (!this.state.searchKeyword) {
      return categories;
    }
    return filters.filterTree(categories, keyword);
  };

  onSearchKeywordChange = debounce(() => {
    const { searchKeyword } = this.state;
    let categories = this.filterUsingSearch(
      this.props.categories,
      searchKeyword
    );
    this.props.openAllOnSearch(
      filters.expandFilteredNodes(categories, searchKeyword)
    );
    // this.setState({ searchKeyword });
  }, 100);

  onToggle = ({ uid, children }) => {
    this.props.onChangeActiveCategory(
      uid,
      this.props.activeCategory,
      this.props.leafDetect ? !(children && children.length) : false
    );
  };

  render() {
    return (
      <div>
        <input
          value={this.state.searchKeyword}
          onChange={event =>
            this.setState(
              { searchKeyword: event.target.value },
              this.onSearchKeywordChange
            )
          }
          placeholder="Search Here..."
        />
        <Treebeard data={this.state.categories} onToggle={this.onToggle} />
      </div>
    );
  }
}

export default SideTreeView;
