import React from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

class PopoverItem extends React.Component {
  state = { popoverOpen: false };

  toggle = () => this.setState({ popoverOpen: !this.state.popoverOpen });

  render() {
    let popDetail;
    if (!this.props.childCountValue) {
      popDetail = (
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
      );
    } else {
      popDetail = (
        <Popover
          placement={this.props.placement || "bottom"}
          isOpen={this.state.popoverOpen}
          target={"Popover-" + this.props.id}
          toggle={this.toggle}
        >
          <PopoverHeader
            style={{ color: "red", fontWeight: "700", fontSize: "16px" }}
          >
            Review!!!
          </PopoverHeader>
          <PopoverBody>
            <div style={{ fontSize: "14px" }}>
              <span>You have </span>
              <span style={{ fontSize: "16px", fontWeight: "700" }}>
                {this.props.childCountValue}
              </span>
              <span> child elements for </span>
              <span style={{ fontSize: "16px", fontWeight: "700" }}>
                {this.props.parentNameText}
              </span>
            </div>
          </PopoverBody>
        </Popover>
      );
    }
    return (
      <span>
        <Button
          data-tooltip="Delete"
          data-position="bottom center"
          style={this.props.customStyle ? { ...this.props.customStyle } : {}}
          className="mr-1"
          color="danger"
          id={"Popover-" + this.props.id}
          onClick={this.toggle}
          disabled={this.props.disabled}
        >
          <i className="fa fa-close" />{" "}
          {this.props.text ? this.props.text || "Delete" : null}
        </Button>

        {popDetail}
        {/* <Popover
          placement={this.props.placement || "bottom"}
          isOpen={this.state.popoverOpen}
          target={"Popover-" + this.props.id}
          toggle={this.toggle}
        >
          
          
          
          <PopoverHeader>Are You Sure</PopoverHeader>
          <PopoverBody>
            <div style={{color:"red",fontWeight:"700"}}>
              {this.props.text1}
            </div>
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
        </Popover> */}
      </span>
    );
  }
}

export default PopoverItem;
