import React, { Component } from "react";
import { Row, Col, ListGroupItem } from "reactstrap";
import AvatarEditor from "react-avatar-editor";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

class PhotoEditor extends Component {
  state = {
    active: "cover",
    logo: { files: [], zoomSlider: 100, imageURL: "", WIDTH: 500, HEIGHT: 500 },
    cover: { files: [], zoomSlider: 100, imageURL: "", WIDTH: 800, HEIGHT: 500 }
  };
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

      fetch(canvas).then(res => {
        console.log(res);
        this.state.active === "cover"
          ? this.props.onUploadCover(res.url)
          : console.log("logo");
        // return res.blob();
      });
      // .then(blob => {
      //   const imageURL = window.URL.createObjectURL(blob);
      //   console.log(blob, "asdf", "\n", imageURL);
      //   this.setState({ imageURL });
      // });
    }
  };

  componentDidMount = () => this.handleItemChange(this.state.active);

  handleItemChange = item => {
    const bodyWidth = this.editorBody.offsetWidth;
    const logo = { WIDTH: bodyWidth / 2, HEIGHT: bodyWidth / 2 };
    const cover = { WIDTH: bodyWidth * 0.9, HEIGHT: bodyWidth * 0.9 / 3 };
    this.setState({
      active: item,
      logo: { ...this.state.logo, ...logo },
      cover: { ...this.state.cover, ...cover }
    });
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
              <div>
                <button onClick={() => this.fileUploadEl.click()}>
                  Upload New Photo
                </button>
                <input
                  style={{ display: "none" }}
                  ref={ref => (this.fileUploadEl = ref)}
                  type="file"
                  onChange={this.handleUploadPhoto}
                />
              </div>
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
              <div style={{ margin: "20px", width: "160px" }}>
                <span>Zoom</span>
                <Slider
                  min={100}
                  max={300}
                  value={this.state[this.state.active].zoomSlider}
                  onChange={this.handleSliderChange}
                />
              </div>
            </div>
            <button onClick={this.onImageSave}>Upload</button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PhotoEditor;
