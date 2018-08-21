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
      active: this.props.activeSectionAdminId === section.uid,
      ...extra
    };
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.sectionsAdmin !== this.props.sectionsAdmin ||
      (!prevProps.activeSectionAdminId && this.props.activeSectionAdminId) ||
      prevProps.isOpen !== this.props.isOpen
    ) {
      this.setState({
        sections: this.updateSections(this.props.sectionsAdmin)
      });
    }
  }

  onToggle = ({ uid, name, children }) => {
    //console.log("toogled now");
    const rootSectionAdmin = {};
    rootSectionAdmin.name = name;
    rootSectionAdmin.uid = uid;
    this.props.resetState();
    this.props.onChangeActiveSection(
      uid,
      this.props.activeSectionAdminId,
      children ? children[0] : null,
      rootSectionAdmin
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
