import React, { Component } from "react";
import { Treebeard } from "react-treebeard";
import debounce from "lodash.debounce";
import * as filters from "../../../config/filterTreeView";

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

  componentDidMount() {
    //console.log("FROM SIDE TREE componentDidMount");
    //console.log(this.state.sections); //ok
  }

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
    //console.log("FROM SIDE TREE componentDidUpdate");
    //console.log(this.state.sections); //ok
  }

  onToggle = ({ uid, children }) => {
    // console.log("toggle clicked"); //ok
    // console.log(uid); //ok
    // console.log(children); //ok
    // console.log(this.props.activeSection); //ok
    this.props.onChangeActiveSection(
      uid,
      this.props.activeSection,
      this.props.leafDetect ? !(children && children.length) : false
    );
  };

  render() {
    console.log("Sections render");
    console.log(this.state.sections);
    return (
      <div>
        <Treebeard data={this.state.sections} onToggle={this.onToggle} />
      </div>
    );
  }
}

export default SideTreeView;
