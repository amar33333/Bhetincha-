import React, { Component } from "react";

import { Input, Button, Row, Col } from "reactstrap";

class SubBusinessAlbum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      album: ""
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.onValueChange)
      this.props.onValueChange(nextState, this.props.id);
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
