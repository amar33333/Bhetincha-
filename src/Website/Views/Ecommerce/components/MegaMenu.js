import React, { Component } from "react";

class MegaMenu extends Component {
  render() {
    return (
      <div>
        {this.props.categories.name ? (
          <div>{this.props.categories.name}</div>
        ) : (
          <div>loding</div>
        )}
        <div>
          Mega Menu.. This contains list of categories upto three level{" "}
        </div>
      </div>
    );
  }
}

export default MegaMenu;
