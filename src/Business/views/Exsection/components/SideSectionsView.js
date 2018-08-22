import React, { Component } from "react";

import { ListGroup, ListGroupItem } from "reactstrap";

class SideSectionsView extends Component {
  constructor(props) {
    super(props);
    this.state = { sections: null, activeIndex: 20 };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sectionsAdmin !== this.props.sectionsAdmin) {
      this.setState({
        sections: this.props.sectionsAdmin
      });
    }
  }

  onSectionClick(index, { uid, name, children }) {
    const rootSectionAdmin = {};
    rootSectionAdmin.name = name;
    rootSectionAdmin.uid = uid;
    this.props.resetState();
    this.props.onChangeActiveSection(
      uid,
      //  this.props.topSectionAdminId, //this.props.activeSectionAdminId,
      children ? children[0] : null,
      rootSectionAdmin
    );
    this.setState({ activeIndex: index });
  }

  render() {
    let sectionsList;
    if (this.state.sections) {
      const { sections } = this.state;
      const sectionChildrens = sections.children;

      sectionsList = sectionChildrens
        .sort(function(a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        })
        .map((section, index) => {
          const className = this.state.activeIndex === index ? "active" : "";
          return (
            <ListGroupItem
              key={index}
              tag="a"
              href="#"
              action
              className={className}
              onClick={this.onSectionClick.bind(this, index, section)}
            >
              {section.name}
            </ListGroupItem>
          );
        });
    }
    return (
      <div>
        <ListGroup>{sectionsList ? sectionsList : ""}</ListGroup>
      </div>
    );
  }
}

export default SideSectionsView;
