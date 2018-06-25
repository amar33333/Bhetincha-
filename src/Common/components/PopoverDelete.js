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
          disabled={this.props.disabled}
        >
          <i className="fa fa-close" /> {this.props.text || "Delete"}
        </Button>
        <Popover
          placement={this.props.placement || "bottom"}
          isOpen={this.state.popoverOpen}
          target={"Popover-" + this.props.id}
          toggle={this.toggle}
        >
          <PopoverHeader>Are You Sure</PopoverHeader>
          <PopoverBody>
            <div>
              {this.props.subtitle || "Clicking yes will delete your data"}
            </div>
            <Button
              color="danger"
              className="mr-2"
              onClick={() => {
                this.props.onClick();
                this.toggle();
              }}
            >
              Yes
            </Button>
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
