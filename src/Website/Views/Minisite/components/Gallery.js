import React, { Component } from "react";
import GalleryGrid from "react-grid-gallery";
import FileInputComponent from "react-file-input-previews-base64";
import { connect } from "react-redux";
import { Container, Card, CardBody, CardHeader, Input } from "reactstrap";

import { handleGalleryPhotoUpload, createNewAlbum } from "../actions";

import { MAIN_URL } from "../config/MINISITE_API";
import FontAwesome from "react-fontawesome";

class Gallery extends Component {
  state = { newAlbumName: "" };

  renderGalleryUpload = albumID => {
    const loading = this.props.galleryLoading.filter(
      album => album.albumID === albumID
    )[0].loading;
    return (
      <div>
        <FileInputComponent
          imagePreview={false}
          parentStyle={{ marginTop: "0px" }}
          // labelText="Maximum total size is 25MB"
          labelStyle={{ display: "none" }}
          multiple={true}
          callbackFunction={photos =>
            this.props.handleGalleryPhotoUpload({
              photos,
              business_id: this.props.id,
              album_id: albumID,
              access_token: this.props.cookies.token_data.access_token,
              username: this.props.username
            })
          }
          accept="image/*"
          buttonComponent={
            <button disabled={loading} className="gallery_upload">
              {loading ? (
                <FontAwesome
                  className="super-crazy-colors"
                  name="spinner"
                  size="2x"
                  spin
                  style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
                />
              ) : (
                <div>
                  <span>Maximum upload size: 25MB</span>
                  <br />
                  <i className="fa fa-camera upload-camera" />
                </div>
              )}
            </button>
          }
        />
      </div>
    );
  };

  renderAddNewGallery = () => {
    return (
      <div>
        <Container>
          <Card>
            <CardHeader style={{ backgroundColor: "#21a8d8", color: "#fff" }}>
              <strong>Create New Album</strong>
            </CardHeader>
            <CardBody>
              <form
                action=""
                onSubmit={event => {
                  event.preventDefault();
                  this.props.createNewAlbum({
                    id: this.props.id,
                    access_token: this.props.cookies.token_data.access_token,
                    username: this.props.username,
                    data: { albums: { name: this.state.newAlbumName } }
                  });
                }}
              >
                <Input
                  placeholder="Album Name"
                  value={this.state.newAlbumName}
                  onChange={event =>
                    this.setState({ newAlbumName: event.target.value })
                  }
                />
              </form>
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  };

  render() {
    return (
      <div className="gallery-wrapper">
        {this.props.mainEdit && this.renderAddNewGallery()}
        {/* <p> Create New Album: </p>
         <form
          action=""
          onSubmit={event => {
            event.preventDefault();
            this.props.createNewAlbum({
              id: this.props.id,
              access_token: this.props.cookies.token_data.access_token,
              username: this.props.username,
              data: { albums: { name: this.state.newAlbumName } }
            });
          }}
        >
          <input
            placeholder="Album Name"
            value={this.state.newAlbumName}
            onChange={event =>
              this.setState({ newAlbumName: event.target.value })
            }
          />
        </form> */}
        {this.props.albums.map(album => (
          <Container>
            <Card>
              <CardBody>
                <div className="album-title">
                  <p className="album-title">{album.name}</p>
                  <small>Updated at March 2018</small>
                </div>
                <div className="albums" key={album.albumID}>
                  <div className="gallery-list">
                    <GalleryGrid
                      images={album.photos.map(photo => ({
                        src: `${MAIN_URL}${photo.photoURL}`,
                        thumbnail: `${MAIN_URL}${photo.photoURL}`,
                        thumbnailWidth: 320,
                        thumbnailHeight: 174,
                        caption: photo.name,
                        showLightboxThumbnails: true,
                        // isSelected: true,
                        onSelectImage: () => {
                          console.log(this);
                        },
                        enableImageSelection: true,
                        id: photo.photoID
                      }))}
                      backdropClosesModal={true}
                    />
                  </div>
                  {this.props.mainEdit &&
                    this.renderGalleryUpload(album.albumID)}
                </div>
              </CardBody>
            </Card>
          </Container>
        ))}
      </div>
    );
  }
}

export default connect(
  ({
    auth: { cookies },
    MinisiteContainer: { crud: { cover_photo, id, username, albums }, edit }
  }) => ({
    id,
    username,
    cookies,
    mainEdit: edit.main,
    galleryLoading: edit.galleryLoading,
    albums
  }),
  { handleGalleryPhotoUpload, createNewAlbum }
)(Gallery);
