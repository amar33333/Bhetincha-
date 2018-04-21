import React, { Component } from "react";
import PhotoGallery from "react-photo-gallery";
import SelectedImage from "./SelectedImage";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: photos,
      selected: false
    };
    this.toggleSelected = this.toggleSelected.bind(this);
    this.renderViewer = this.renderViewer.bind(this);
  }

  toggleSelected() {
    this.setState({
      selected: !this.state.selected
    });
  }

  renderViewer = () => {
    return (
      <div className="image-viewer__wrapper">
        <ImageGallery items={photos} />
      </div>
    );
  };

  render() {
    return (
      <div className="gallery-wrapper">
        <PhotoGallery
          photos={this.state.photos}
          columns={6}
          margin={10}
          onClick={this.toggleSelected}
          ImageComponent={SelectedImage}
        />
        {this.state.selected ? this.renderViewer() : ""}
      </div>
    );
  }
}

const photos = [
  {
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    original: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    thumbnail: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    width: 4,
    height: 3

    // sizes: ["100px", "100px"]
  },
  {
    src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    width: 1,
    height: 1,
    original: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    thumbnail: "https://source.unsplash.com/Dm-qxdynoEc/800x799"
  },
  {
    src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
    width: 3,
    height: 4,
    original: "https://source.unsplash.com/qDkso9nvCg0/600x799",
    thumbnail: "https://source.unsplash.com/qDkso9nvCg0/600x799"
  },
  {
    src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
    width: 3,
    height: 4,
    original: "https://source.unsplash.com/iecJiKe_RNg/600x799",
    thumbnail: "https://source.unsplash.com/iecJiKe_RNg/600x799"
  }
];
export default Gallery;
