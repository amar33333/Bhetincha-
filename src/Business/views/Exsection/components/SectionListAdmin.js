import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Nav, NavItem, NavLink } from "reactstrap";

class SectionListAdmin extends Component {
  constructor(props) {
    super(props);

    this.renderSubSection = this.renderSubSection.bind(this);
    this.handleSectionClick = this.handleSectionClick.bind(this);
  }

  renderSubSection(options) {
    const menuOptions = options.map(option => {
      let subMenu;
      if (option.children && option.children.length > 0) {
        subMenu = this.renderSubSection(option.children);
      }
      return (
        <div key={option.uid}>
          {option.name && (
            <Nav vertical style={{ marginTop: 10 }}>
              <NavItem>
                {this.props.topSectionAdmin && (
                  <NavLink
                    className="navbar-light bg-light"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      return this.handleSectionClick(option.uid);
                    }}
                  >
                    {option ? option.name : ""}
                  </NavLink>
                )}
              </NavItem>
            </Nav>
          )}
          {subMenu ? subMenu : ""}
        </div>
      );
    });
    return menuOptions;
  }

  handleSectionClick(uid) {
    this.props.onChangeActiveSectionByClick(uid);
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <strong>
              {this.props.topSectionAdmin
                ? this.props.topSectionAdmin.name
                : ""}
            </strong>
          </CardHeader>
          <CardBody>
            <Nav vertical>
              <NavItem>
                <NavLink
                  className="navbar-light
                  bg-light"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    return this.handleSectionClick(
                      this.props.activeChildrenAdmin.uid
                    );
                  }}
                >
                  {this.props.activeChildrenAdmin
                    ? this.props.activeChildrenAdmin.name
                    : ""}
                </NavLink>
              </NavItem>
            </Nav>
            {this.props.activeChildrenAdmin &&
            this.props.activeChildrenAdmin.children
              ? this.renderSubSection(this.props.activeChildrenAdmin.children)
              : ""}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SectionListAdmin;
