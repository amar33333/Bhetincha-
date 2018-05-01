import React from "react";
import { Tooltip } from "reactstrap";

class TooltipItem extends React.Component {
  state = { tooltipOpen: false };

  toggle = () => this.setState({ tooltipOpen: !this.state.tooltipOpen });

  render() {
    return (
      <span>
        {this.props.children}
        <Tooltip
          placement={this.props.placement || "bottom"}
          isOpen={this.state.tooltipOpen}
          target={this.props.id}
          toggle={this.toggle}
        >
          {this.props.content}
        </Tooltip>
      </span>
    );
  }
}

export default TooltipItem;
