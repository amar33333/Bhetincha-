import React, { Component } from "react";
import { connect } from "react-redux";

import { Button } from "semantic-ui-react";

import {
  handleGalleryPhotoUpload,
  onBusinessUpdate,
  handleGalleryPhotoDelete
} from "../../actions";
import GalleryComponent from "./GalleryComponent";
import { MAIN_URL } from "../../config/MINISITE_API";

class Gallery extends Component {
  handlePhotoDelete = ({ photos, album_id }) => {
    this.props.handleGalleryPhotoDelete({
      body: { photos },
      album_id
    });
  };

  handlePhotoUpload = ({ photos, album_id }) => {
    this.props.handleGalleryPhotoUpload({
      body: {
        photos: photos.map(photo => ({ name: photo.name, data: photo.base64 }))
      },
      album_id
    });
  };

  handleCreateAlbum = name =>
    this.props.onBusinessUpdate({
      body: { albums: { name } }
    });

  render() {
    return (
      <div className="gallery-wrapper">
        <GalleryComponent
          isEdit={this.props.mainEdit}
          albums={this.props.albums}
          MAIN_URL={MAIN_URL}
          handlePhotoDelete={this.handlePhotoDelete}
          handlePhotoUpload={this.handlePhotoUpload}
          handleCreateAlbum={this.handleCreateAlbum}
          // optional
          galleryLoading={this.props.galleryLoading}
        />
        <Button
          circular
          icon="add"
          color="linkedin"
          size="big"
          style={{
            position: "absolute",
            right: "20px",
            bottom: "50px"
          }}
        />
      </div>
    );
  }
}

export default connect(
  ({
    MinisiteContainer: {
      crud: { cover_photo, albums },
      edit
    }
  }) => ({
    mainEdit: edit.main,
    galleryLoading: edit.galleryLoading,
    albums
  }),
  { handleGalleryPhotoUpload, onBusinessUpdate, handleGalleryPhotoDelete }
)(Gallery);
