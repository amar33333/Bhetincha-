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
    // console.log(options);
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
                {/* <Link to="/">{option.name}</Link> */}
                {this.props.rootSectionAdmin && (
                  <Button
                    color="link"
                    onClick={() => {
                      return this.handleSectionClick(option.uid);
                    }}
                  >
                    {option ? option.name : ""}
                    <span className="fa fa-pencil" />&nbsp;
                  </Button>
                )}
              </Row>
              {/* <Row className="ml-sm-2">
                <span className="fa fa-plus" />&nbsp;
                <Link to="/">Add</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="fa fa-pencil" />&nbsp;
                <Link to="/">Change</Link>
              </Row> */}
            </Alert>
          )}
          {subMenu ? subMenu : ""}
        </div>
      );
    });
    //console.log("DUHHH", menuOptions);
    return menuOptions;
  }

  handleSectionClick(uid) {
    // console.log("uid SUnday", uid);

    this.props.onChangeActiveSectionByClick(uid);
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <strong>Edit Sub Section</strong>
          </CardHeader>
          {/* {console.log("SUNDAYYY", this.props)} */}
          <CardBody>
            <Alert color="warning">
              <Row className="ml-sm-2 mb-sm-1">
                {/* <Link to="/">
                  {this.props.rootSectionAdmin
                    ? this.props.rootSectionAdmin.name
                    : ""}
                </Link> */}
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
                    <span className="fa fa-pencil" />&nbsp;
                  </Button>
                )}
              </Row>
              {/* <Row className="ml-sm-2">
                <span className="fa fa-plus" />&nbsp;
                <Link to="/">Add</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="fa fa-pencil" />&nbsp;
                <Link to="/">Change</Link>
              </Row> */}
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
                    <span className="fa fa-pencil" />&nbsp;
                  </Button>
                )}
              </Row>
              {/* <Row className="ml-sm-2">
                <span className="fa fa-plus" />&nbsp;
                <Link to="/">Add</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="fa fa-pencil" />&nbsp;
                <Link to="/">Change</Link>
              </Row> */}
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
