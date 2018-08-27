import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Alert,
  Button,
  Row,
  Col
} from "reactstrap";

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
            <Alert color="warning">
              <Row className="ml-sm-2 mb-sm-1">
                {this.props.rootSectionAdmin && (
                  <Button
                    color="link"
                    onClick={() => {
                      return this.handleSectionClick(option.uid);
                    }}
                  >
                    {option ? option.name : ""}
                  </Button>
                )}
              </Row>
            </Alert>
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
            <strong>Edit Sub Section</strong>
          </CardHeader>
          <CardBody>
            <Alert color="warning">
              <Row className="ml-sm-2 mb-sm-1">
                {this.props.rootSectionAdmin && (
                  <Button
                    color="link"
                    onClick={() => {
                      return this.handleSectionClick(
                        this.props.rootSectionAdmin.uid
                      );
                    }}
                  >
                    {this.props.rootSectionAdmin
                      ? this.props.rootSectionAdmin.name
                      : ""}{" "}
                  </Button>
                )}
              </Row>
            </Alert>
            <Alert color="warning">
              <Row className="ml-sm-2 mb-sm-1">
                {this.props.activeChildrenAdmin && (
                  <Button
                    color="link"
                    onClick={() => {
                      return this.handleSectionClick(
                        this.props.activeChildrenAdmin.uid
                      );
                    }}
                  >
                    {this.props.activeChildrenAdmin
                      ? this.props.activeChildrenAdmin.name
                      : ""}{" "}
                  </Button>
                )}
              </Row>
            </Alert>
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
