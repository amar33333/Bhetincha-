import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

class BreadcrumbNav extends Component {
  render() {
    return (
      <Breadcrumb>
        {this.props.items
          .slice(0, -1)
          .reverse()
          .map((item, index) => {
            const last = index === this.props.items.length - 2;
            return (
              <BreadcrumbItem key={item.uid} active={last}>
                {last ? (
                  item.name
                ) : (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.props.onSelectCategory(item.uid);
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
