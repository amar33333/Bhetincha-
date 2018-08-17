import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody } from "reactstrap";

class SectionListAdmin extends Component {
  constructor(props) {
    super(props);

    this.renderSubSection = this.renderSubSection.bind(this);
  }

  renderSubSection(options) {
    console.log(options);
    const menuOptions = options.map(option => {
      let subMenu;
      if (option.children && option.children.length > 0) {
        subMenu = this.renderSubSection(option.children);
      }
      return (
        <div key={option.uid}>
          {option.name && <li> {option.name} </li>}
          {subMenu && <li> {subMenu}</li>}
        </div>
      );
    });
    console.log("DUHHH", menuOptions);
    return menuOptions;
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <strong>"Placeholder" Section</strong>
          </CardHeader>
          <CardBody>
            <ul>
              <li>
                {this.props.rootSectionAdmin
                  ? this.props.rootSectionAdmin.name
                  : ""}
              </li>
              <li>{this.props.activeChildrenAdmin.name}</li>
              {this.renderSubSection(this.props.activeChildrenAdmin.children)}
            </ul>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SectionListAdmin;
