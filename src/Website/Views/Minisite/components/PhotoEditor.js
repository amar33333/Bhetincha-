import React, { Component } from "react";
import AvatarEditor from "react-avatar-editor";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

class PhotoEditor extends Component {
  state = { files: [], zoomSlider: 100, imageURL: "" };
  getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      console.log(reader.result);
    };
    reader.onerror = function(error) {
      console.log("Error: ", error);
    };
  }

  onImageSave = () => {
    if (this.imageEditor) {
      const imageEditor = this.imageEditor;
      const canvas = imageEditor.getImage().toDataURL();

      fetch(canvas).then(res => console.log(res));
    }
  };

  render() {
    return (
      <div>
        {this.state.files.length === 1 && (
          <div>
            <AvatarEditor
              ref={ref => (this.imageEditor = ref)}
              width={400}
              height={250}
              scale={this.state.zoomSlider / 100}
              image={this.state.files[0]}
              crossOrigin="anonymous"
            />
            <div style={{ margin: "20px", width: "160px" }}>
              <span>Zoom</span>
              <Slider
                min={100}
                max={300}
                onChange={value => this.setState({ zoomSlider: value })}
              />
            </div>
          </div>
        )}
        <img src={this.state.imageURL} alt="Cover Photo" />
        <input
          type="file"
          onChange={event => this.setState({ files: event.target.files })}
        />
        <button
          onClick={() => {
            this.getBase64(this.state.files[0]);
          }}
        >
          Get Base 64
        </button>
        {/* <div>
          <AvatarEditor
            ref={ref => (this.imageEditor = ref)}
            width={400}
            height={250}
            scale={this.state.zoomSlider / 100}
            image="https://upload.wikimedia.org/wikipedia/commons/7/79/Dampfturbine_Montage01.jpg"
          />
          <div style={{ margin: "20px", width: "160px" }}>
            <span>Zoom</span>
            <Slider
              min={100}
              max={300}
              onChange={value => this.setState({ zoomSlider: value })}
            />
          </div> */}
        <button onClick={this.onImageSave}>Save</button>
      </div>
    );
  }
}

export default PhotoEditor;
