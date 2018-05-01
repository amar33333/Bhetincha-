import React from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

class PopoverItem extends React.Component {
  state = { popoverOpen: false };

  toggle = () => this.setState({ popoverOpen: !this.state.popoverOpen });

  render() {
    return (
      <span>
        <Button
          className="mr-1"
          color="danger"
          id={"Popover-" + this.props.id}
          onClick={this.toggle}
        >
          {this.props.text || "Delete"}
        </Button>
        <Popover
          placement={this.props.placement || "right"}
          isOpen={this.state.popoverOpen}
          target={"Popover-" + this.props.id}
          toggle={this.toggle}
        >
          <PopoverHeader>Are You Sure</PopoverHeader>
          <PopoverBody>
            <div>Clicking yes will delete your data</div>
            <Button color="danger" onClick={this.props.onClick}>
              Yes
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              No
            </Button>
          </PopoverBody>
        </Popover>
      </span>
    );
  }
}

export default PopoverItem;
