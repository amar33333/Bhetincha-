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
  }

  toggleSelected = () => {
    this.setState({
      selected: !this.state.selected
    });
  };

  renderViewer = SelectedImage => {
    return (
      <div>
        <div className="image-viewer__wrapper">
          <ImageGallery items={photos} />
        </div>
        <div
          className="minisite_gallery__slider__close__overlay"
          onClick={this.toggleSelected}
        >
          <i className="fa fa-close" />
        </div>
      </div>
    );
  };

  renderGallery = () => {
    return (
      <PhotoGallery
        photos={this.state.photos}
        columns={6}
        margin={10}
        onClick={this.toggleSelected}
        ImageComponent={SelectedImage}
      />
    );
  };

  render() {
    return (
      <div className="gallery-wrapper">
        {this.state.selected ? this.renderViewer() : this.renderGallery()}
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
