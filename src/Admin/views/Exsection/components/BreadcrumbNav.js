import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

class BreadcrumbNav extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
    // this.breadCrumbs = [{ name: "testtube", uid: "001" }];
  }

  render() {
    return (
      <Breadcrumb>
        {this.props.breadCrumbs
          .slice()
          .reverse()
          .map((item, index) => {
            const last = index === this.props.breadCrumbs.length - 1;
            return (
              <BreadcrumbItem key={item.uid} active={last}>
                {last ? (
                  item.name
                ) : (
                  <span style={{ cursor: "pointer" }}>{item.name}</span>
                )}
              </BreadcrumbItem>
            );
          })}
      </Breadcrumb>
    );
    // return "hello from breadcrumb";
  }
}

export default BreadcrumbNav;
