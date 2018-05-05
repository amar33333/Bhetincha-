import React, { Component } from "react";
import GalleryGrid from "react-grid-gallery";
import FileInputComponent from "react-file-input-previews-base64";
import { connect } from "react-redux";
import { Container, Card, CardBody, CardHeader, Input } from "reactstrap";

import { handleGalleryPhotoUpload, onBusinessUpdate } from "../../actions";

import { MAIN_URL } from "../../config/MINISITE_API";
import FontAwesome from "react-fontawesome";

class Gallery extends Component {
  static getDerivedStateFromProps = nextProps => ({
    albums: nextProps.albums.map(album => ({
      ...album,
      photos: album.photos.map(photo => ({
        src: `${MAIN_URL}${photo.photoURL}`,
        thumbnail: `${MAIN_URL}${photo.photoURL}`,
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        caption: photo.name,
        showLightboxThumbnails: true,
        photoID: photo.photoID,
        isSelected: false
      }))
    }))
  });

  state = { newAlbumName: "", albums: [] };

  onSelectImage = (albumID, index, image) =>
    this.setState({
      albums: this.state.albums.map(
        album =>
          album.albumID !== albumID
            ? album
            : {
                ...album,
                photos: album.photos.map(
                  photo =>
                    photo.photoID !== image.photoID
                      ? photo
                      : { ...photo, isSelected: !image.isSelected }
                )
              }
      )
    });

  renderDeleteButton = album => {
    const selectedLength = album.photos.filter(photo => photo.isSelected)
      .length;
    if (selectedLength > 0) {
      return (
        <button onClick={() => console.log("delete pressed")}>
          {`Delete ${selectedLength} Items`}
        </button>
      );
    }
  };

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
              body: {
                photos: photos.map(photo => ({
                  name: photo.name,
                  data: photo.base64
                }))
              },
              album_id: albumID
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
                  this.props.onBusinessUpdate({
                    body: { albums: { name: this.state.newAlbumName } }
                  });
                  this.setState({ newAlbumName: "" });
                }}
              >
                <Input
                  placeholder="Album Name"
                  value={this.state.newAlbumName}
                  onChange={event =>
                    this.setState({ newAlbumName: event.target.value })
                  }
                />
                <small>Type Album name and Press Enter.</small>
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
        {this.state.albums.length === 0 && "Comming Soon!"}
        {this.state.albums.map(album => (
          <Container key={album.albumID}>
            <Card>
              <CardBody>
                <div className="album-title">
                  <p className="album-title">{album.name}</p>
                  {this.renderDeleteButton(album)}
                  <small>
                    {album.photos.length === 0
                      ? `Created at: ${new Date(
                          album.created_date
                        ).toDateString()}`
                      : `Updated at: ${new Date(
                          album.updated_date
                        ).toDateString()}`}
                  </small>
                </div>
                <div className="albums">
                  <div className="gallery-list">
                    <GalleryGrid
                      images={album.photos}
                      backdropClosesModal={true}
                      enableImageSelection={true}
                      onSelectImage={this.onSelectImage.bind(
                        this,
                        album.albumID
                      )}
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
  ({ MinisiteContainer: { crud: { cover_photo, albums }, edit } }) => ({
    mainEdit: edit.main,
    galleryLoading: edit.galleryLoading,
    albums
  }),
  { handleGalleryPhotoUpload, onBusinessUpdate }
)(Gallery);
