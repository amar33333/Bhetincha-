import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

class BreadcrumbNav extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
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
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.props.onChangeActiveCategory(item.uid);
                    }}
                  >
                    {item.name}
                  </span>
                )}
              </BreadcrumbItem>
            );
          })}
      </Breadcrumb>
    );
  }
}

export default BreadcrumbNav;
