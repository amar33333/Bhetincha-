import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

class BreadcrumbNav extends Component {
  render() {
    return (
      <Breadcrumb className={this.props.className}>
        {this.props.items
          .slice()
          // .slice(0, -1)
          .reverse()
          .map((item, index) => {
            const last = index === this.props.items.length - 1;
            return (
              <BreadcrumbItem key={item.uid} active={last}>
                {last ? (
                  item.name
                ) : (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.props.onSelectCategory(
                        index === 0 ? undefined : item.uid
                      );
                    }}
                  >
                    {item.name}
                    {/* {item.name === "Shop" ? "Home" : item.name} */}
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
