import React, { Component } from "react";
import GalleryGrid from "react-grid-gallery";
import FileInputComponent from "react-file-input-previews-base64";
import { Button as SButton } from "semantic-ui-react";
import FontAwesome from "react-fontawesome";
import { Container, Row, Col } from "reactstrap";
import { PopoverDelete } from "../../../Common/components";
import { ROUTE_PARAMS_BUSINESS_NAME } from "../../../config/CONSTANTS";

import { MAIN_URL } from "../../../Common/utils/API";

class GalleryView extends Component {
  state = { album: null };

  componentDidMount() {
    this.setState({
      album: {
        ...this.props.album,
        photos: this.props.album.photos.map(photo => ({
          src: `${MAIN_URL}${photo.photoURL}`,
          thumbnail: `${MAIN_URL}${photo.photoURL}`,
          thumbnailWidth: 320,
          thumbnailHeight: 174,
          caption: photo.name,
          showLightboxThumbnails: true,
          photoID: photo.photoID,
          isSelected: false
        }))
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.album !== prevProps.album) {
      this.setState({
        album: {
          ...this.props.album,
          photos: this.props.album.photos.map(photo => ({
            src: `${MAIN_URL}${photo.photoURL}`,
            thumbnail: `${MAIN_URL}${photo.photoURL}`,
            thumbnailWidth: 320,
            thumbnailHeight: 174,
            caption: photo.name,
            showLightboxThumbnails: true,
            photoID: photo.photoID,
            isSelected: false
          }))
        }
      });
    }
  }

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

  renderGalleryUpload = albumID => {
    const loading = this.props.galleryLoading
      ? this.props.galleryLoading.filter(album => album.albumID === albumID)[0]
          .loading
      : false;

    return (
      <div>
        <FileInputComponent
          imagePreview={false}
          parentStyle={{ marginTop: "0px" }}
          // labelText="Maximum total size is 25MB"
          labelStyle={{ display: "none" }}
          multiple={true}
          callbackFunction={photos =>
            this.handlePhotoUpload({
              photos,
              album_id: albumID
            })
          }
          accept="image/*"
          buttonComponent={
            <SButton
              disabled={loading}
              data-tooltip="Maximum upload size 25 MB."
              data-position="left center"
              circular
              icon="camera"
              color="linkedin"
              size="big"
              style={{
                position: "absolute",
                top: "45%",
                right: "50px"
              }}
              onClick={this.toggleCreateModal}
            >
              {loading ? (
                <FontAwesome
                  className="super-crazy-colors"
                  name="spinner"
                  size="2x"
                  spin
                  style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
                />
              ) : null}
            </SButton>
            // <button disabled={loading} className="gallery_upload">
            //   {loading ? (
            //     <FontAwesome
            //       className="super-crazy-colors"
            //       name="spinner"
            //       size="2x"
            //       spin
            //       style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
            //     />
            //   ) : (
            //     <div>
            //       <span>Maximum upload size: 25MB</span>
            //       <br />
            //       <i className="fa fa-camera upload-camera" />
            //     </div>
            //   )}
            // </button>
          }
        />
      </div>
    );
  };

  onSelectImage = (albumID, index, image) =>
    this.setState({
      album: {
        ...this.state.album,
        photos: this.state.album.photos.map(
          photo =>
            photo.photoID !== image.photoID
              ? photo
              : { ...photo, isSelected: !image.isSelected }
        )
      }
    });

  renderDeleteButton = album => {
    const selectedPhotos = album.photos
      .filter(photo => photo.isSelected)
      .map(photo => photo.photoID);

    if (selectedPhotos.length > 0) {
      return (
        <PopoverDelete
          text={`Delete ${selectedPhotos.length} Photo(s)`}
          id={album.albumID + "X"}
          onClick={() =>
            this.handlePhotoDelete({
              photos: selectedPhotos,
              album_id: album.albumID
            })
          }
          subtitle="This will delete all the selected photos"
        />
      );
    }
  };

  renderEachGallery = () => {
    return (
      <div>
        <div className="album-title">
          <p className="album-title">
            {this.state.album && this.state.album.name}
          </p>
          {this.state.album &&
            this.state.album.albumID && (
              <PopoverDelete
                customStyle={{
                  position: "absolute",
                  top: "80px",
                  right: "10px"
                }}
                id={this.state.album.albumID}
                onClick={() =>
                  this.props.handleGalleryAlbumDelete({
                    album_id: this.state.album.albumID,
                    history: this.props.history,
                    url: `/${
                      this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]
                    }/dashboard/gallery`
                  })
                }
                subtitle="This will delete all the photos inside album"
              />
            )}
          <small className="mr-3">
            {this.state.album
              ? this.state.album.photos.length === 0
                ? `Created on: ${new Date(
                    this.state.album.created_date
                  ).toDateString()}`
                : `Updated on: ${new Date(
                    this.state.album.updated_date
                  ).toDateString()}`
              : null}
          </small>
          {this.state.album && this.renderDeleteButton(this.state.album)}
        </div>
        <Row>
          <Col xs="12">
            <div className="albums">
              <div className="gallery-list">
                {this.state.album && (
                  <GalleryGrid
                    images={this.state.album.photos}
                    backdropClosesModal
                    enableImageSelection
                    onSelectImage={this.onSelectImage.bind(
                      this,
                      this.state.album.albumID
                    )}
                  />
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    return (
      <div className="gallery-wrapper">
        <Container>
          {this.renderEachGallery()}
          {this.state.album &&
            this.renderGalleryUpload(this.state.album.albumID)}
        </Container>
        {/* {this.renderGalleryUpload()} */}
      </div>
    );
  }
}

export default GalleryView;
