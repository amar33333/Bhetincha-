import React, { Component } from "react";
import { Card, CardHeader, CardBody, Nav, NavItem, NavLink } from "reactstrap";
import "./sectionListAdmin.css";

class SectionListAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = { activeIndex: 20, activeIndex2: 20 };

    this.renderSubSection = this.renderSubSection.bind(this);
    this.handleSectionClick = this.handleSectionClick.bind(this);
    this.handleSectionClick2 = this.handleSectionClick2.bind(this);
  }

  renderSubSection(options) {
    const menuOptions = options.map(option => {
      let subMenu;
      const className2 =
        this.state.activeIndex2 === this.props.activeSectionAdminId
          ? "bg-dark txtColorWhite"
          : "";
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
                    className={`navbar-light
                  bg-light ${className2}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      return this.handleSectionClick2(option.uid);
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

    this.setState({ activeIndex: uid, activeIndex2: 20 });
  }

  handleSectionClick2(uid) {
    this.props.onChangeActiveSectionByClick(uid);

    this.setState({ activeIndex: 20, activeIndex2: uid });
  }

  render() {
    const className =
      this.state.activeIndex === this.props.activeSectionAdminId
        ? "bg-dark txtColorWhite"
        : "";
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
                  className={`navbar-light
                  bg-light ${className}`}
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
