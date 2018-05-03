import React, { Component } from "react";
import GalleryGrid from "react-grid-gallery";
import FileInputComponent from "react-file-input-previews-base64";
import { connect } from "react-redux";
import { Container, Card, CardBody, CardHeader, Input } from "reactstrap";

import { handleGalleryPhotoUpload, createNewAlbum } from "../../actions";

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

  state = { newAlbumName: "" };

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
        {/* <div>
          <AvatarEditor
            image={image}
            width={1200}
            height={400}
            border={10}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1.3}
            rotate={0}
          />
        </div> */}
        {this.props.albums.map(album => (
          <Container>
            <Card>
              <CardBody>
                <div className="album-title">
                  <p className="album-title">{album.name}</p>
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