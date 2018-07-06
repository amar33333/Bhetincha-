import React, { Component } from "react";
import { Row, Col, ListGroupItem, Button, Input, FormGroup } from "reactstrap";
import AvatarEditor from "react-avatar-editor";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

class PhotoEditor extends Component {
  state = {
    active: "cover",
    logo: { files: [], zoomSlider: 100, imageURL: "", WIDTH: 500, HEIGHT: 500 },
    cover: { files: [], zoomSlider: 100, imageURL: "", WIDTH: 800, HEIGHT: 500 }
  };

  // TBN: Base64
  // getBase64(file) {
  //   var reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function() {
  //     console.log(reader.result);
  //   };
  //   reader.onerror = function(error) {
  //     console.log("Error: ", error);
  //   };
  // }

  onImageSave = () => {
    if (this.imageEditorEl) {
      const canvas = this.imageEditorEl.getImage().toDataURL();

      fetch(canvas).then(res =>
        this.props.onUpload(this.state.active, res.url)
      );
    }
  };

  componentDidMount = () => {
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ active: this.props.active || "logo" }, () =>
      this.handleItemChange(this.state.active)
    );
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
  };

  updateDimensions = () => {
    const bodyWidth = this.editorBody.offsetWidth;
    const logo = { WIDTH: bodyWidth / 2, HEIGHT: bodyWidth / 2 };
    const cover = { WIDTH: bodyWidth * 0.9, HEIGHT: (bodyWidth * 0.9) / 3 };
    this.setState({
      logo: { ...this.state.logo, ...logo },
      cover: { ...this.state.cover, ...cover }
    });
  };

  handleItemChange = item => {
    this.updateDimensions();
    this.setState({ active: item });
  };

  renderListGroupItem = () =>
    ["logo", "cover"].map(item => (
      <ListGroupItem
        key={item}
        active={item === this.state.active}
        onClick={this.handleItemChange.bind(this, item)}
        tag="button"
        style={{ width: "100%" }}
      >
        {item === "logo" ? "Business Logo" : "Cover Photo"}
      </ListGroupItem>
    ));

  handleUploadPhoto = event =>
    this.setState({
      [this.state.active]: {
        ...this.state[this.state.active],
        files: event.target.files
      }
    });

  handleSliderChange = value =>
    this.setState({
      [this.state.active]: {
        ...this.state[this.state.active],
        zoomSlider: value
      }
    });

  render() {
    return (
      <div>
        <Row>
          <Col xs="12" md="3">
            {this.renderListGroupItem()}
          </Col>
          <Col xs="12" md="9">
            <div ref={ref => (this.editorBody = ref)}>
              <Row>
                <FormGroup>
                  <Button
                    color="primary"
                    data-tooltip="Add new photo to edit"
                    onClick={() => this[`${this.state.active}UploadEl`].click()}
                  >
                    Add New Photo
                  </Button>
                </FormGroup>
                <FormGroup>
                  <input
                    style={{ display: "none" }}
                    ref={ref => (this.logoUploadEl = ref)}
                    type="file"
                    onChange={this.handleUploadPhoto}
                  />
                  <input
                    style={{ display: "none" }}
                    ref={ref => (this.coverUploadEl = ref)}
                    type="file"
                    onChange={this.handleUploadPhoto}
                  />
                </FormGroup>
              </Row>
              <div>
                <AvatarEditor
                  ref={ref => (this[`imageEditorEl`] = ref)}
                  width={this.state[this.state.active].WIDTH}
                  height={this.state[this.state.active].HEIGHT}
                  scale={this.state[this.state.active].zoomSlider / 100}
                  image={
                    this.state[this.state.active].files.length === 0
                      ? this.props[this.state.active]
                      : this.state[this.state.active].files[0]
                  }
                  //crossOrigin="anonymous"
                />
                {this.state[this.state.active].files.length !== 0 && (
                  <div style={{ margin: "20px", width: "160px" }}>
                    <span>Zoom</span>
                    <Slider
                      min={80}
                      max={300}
                      value={this.state[this.state.active].zoomSlider}
                      onChange={this.handleSliderChange}
                    />
                  </div>
                )}
              </div>
            </div>
            <Button
              color="success"
              disabled={
                this.props.loading ||
                this.state[this.state.active].files.length === 0
              }
              onClick={this.onImageSave}
            >
              Upload
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PhotoEditor;
