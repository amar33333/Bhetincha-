import React, { Component } from "react";

import { Input, Button, Row, Col } from "reactstrap";

import { ON_KEY_PRESS_ENTER } from "../../../config/CONSTANTS";

class SubBusinessAlbum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      album: "",
      key_press: null
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      nextState.key_press === ON_KEY_PRESS_ENTER &&
      this.props.onValueChange
    ) {
      console.log("willUpdate called: ", nextState);
      this.props.onValueChange(nextState, this.props.id);
      this.setState({ key_press: null });
    } else {
      console.log(" NOO willUpdate: ", nextState);
    }
  }

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  onDelete = () => {
    this.clearState();
    this.props.onDelete(this.props.id);
  };

  clearState = () => {
    this.setState({
      album: ""
    });
  };

  _handleKeyPress = event => {
    if (event.keyCode === ON_KEY_PRESS_ENTER) {
      console.log("enter entered");
      // form.elements[index + 1].focus();
      event.preventDefault();
      this.setState({ key_press: ON_KEY_PRESS_ENTER });
    }
  };

  render() {
    return (
      <Row style={{ marginBottom: 15 }}>
        <Col xs="6" md="6">
          <Input
            required
            placeholder="Album Name"
            type="text"
            value={this.state.album}
            onChange={this.onChange.bind(this, "album")}
            onKeyDown={this._handleKeyPress}
          />
        </Col>
        <Col xs="6" md="6">
          <Button color="primary" onClick={this.onDelete}>
            DELETE
          </Button>
        </Col>
      </Row>
    );
  }
}

export default SubBusinessAlbum;
