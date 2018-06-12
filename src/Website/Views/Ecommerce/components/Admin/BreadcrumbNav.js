import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

class BreadcrumbNav extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                console.log("clicked home");
              }}
            >
              Home
            </span>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <span>Library</span>
          </BreadcrumbItem>
          <BreadcrumbItem active>Data</BreadcrumbItem>
        </Breadcrumb>
      </div>
    );
  }
}

export default BreadcrumbNav;
