import React, { Component } from "react";
import { Treebeard } from "react-treebeard";
import debounce from "lodash.debounce";
import * as filters from "../../../../Admin/config/filterTreeView";

class SideTreeView extends Component {
  constructor(props) {
    super(props);
    this.state = { sections: {} };
  }

  updateSections = section => {
    const { children, ...rest } = section;
    const extra = {};
    if (children && children.length) {
      extra.children = children.map(subSection =>
        this.updateSections(subSection)
      );
    }

    return {
      ...rest,
      toggled: this.props.isOpen.includes(section.uid),
      active: this.props.activeSection === section.uid,
      ...extra
    };
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.sections !== this.props.sections ||
      (!prevProps.activeSection && this.props.activeSection) ||
      prevProps.isOpen !== this.props.isOpen
    ) {
      this.setState({
        sections: this.updateSections(this.props.sections)
      });
    }
  }

  onToggle = ({ uid, children }) => {
    // console.log(this.props);
    //console.log("toggle clicked"); //ok

    this.props.onChangeActiveSection(
      uid,
      this.props.activeSection,
      this.props.leafDetect ? !(children && children.length) : false,
      children ? children[0] : null
    );
  };

  render() {
    return (
      <div>
        <Treebeard data={this.state.sections} onToggle={this.onToggle} />
      </div>
    );
  }
}

export default SideTreeView;
