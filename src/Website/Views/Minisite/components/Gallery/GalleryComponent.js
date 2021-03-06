import React, { Component } from "react";
import GalleryGrid from "react-grid-gallery";
import FileInputComponent from "react-file-input-previews-base64";
import {
  Container,
  Card,
  CardBody,
  CardHeader,
  Input,
  Button
} from "reactstrap";
import { Button as SButton } from "semantic-ui-react";

import FontAwesome from "react-fontawesome";
import { CustomModal, PopoverDelete } from "../../../../../Common/components";

class GalleryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newAlbumName: "",
      albums: this.convertAlbumStructure(this.props.albums)
    };
  }

  convertAlbumStructure = albums =>
    albums.map(album => ({
      ...album,
      photos: album.photos.map(photo => ({
        src: `${this.props.MAIN_URL}${photo.photoURL}`,
        thumbnail: `${this.props.MAIN_URL}${photo.photoURL}`,
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        caption: photo.name,
        showLightboxThumbnails: true,
        photoID: photo.photoID,
        isSelected: false
      }))
    }));

  componentDidUpdate(prevProps) {
    if (prevProps.albums !== this.props.albums) {
      this.setState({
        albums: this.convertAlbumStructure(this.props.albums)
      });
    }
  }

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
    const selectedPhotos = album.photos
      .filter(photo => photo.isSelected)
      .map(photo => photo.photoID);

    if (selectedPhotos.length > 0) {
      return (
        <PopoverDelete
          // customStyle={{
          //   position: "absolute",
          //   top: "10px",
          //   right: "10px"
          // }}
          text={`Delete ${selectedPhotos.length} Item(s)`}
          id={album.albumID + "X"}
          onClick={() =>
            this.props.handlePhotoDelete({
              photos: selectedPhotos,
              album_id: album.albumID
            })
          }
          subtitle="This will delete all the selected photos"
        />
        // <Button
        //   color="danger"
        // onClick={() =>
        //   this.props.handlePhotoDelete({
        //     photos: selectedPhotos,
        //     album_id: album.albumID
        //   })
        // }
        // >
        //   {`Delete ${selectedPhotos.length} Item(s)`}
        // </Button>
      );
    }
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
            this.props.handlePhotoUpload({
              photos,
              album_id: albumID
            })
          }
          accept="image/*"
          buttonComponent={
            <SButton
              disabled={loading}
              data-tooltip="Maximum upload size 25 MB."
              data-position="bottom center"
              circular
              icon="camera"
              color="linkedin"
              size="big"
              style={{
                position: "absolute",
                top: "50%",
                marginLeft: "20px"
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
                  this.props.handleCreateAlbum(this.state.newAlbumName);
                  this.setState({ newAlbumName: "" });
                }}
              >
                <Input
                  autoFocus
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
      <div>
        <CustomModal
          isOpen={this.props.createModalOpened}
          toggle={this.props.toggleCreateModal}
          className="modal-md"
          title="Gallery | Create New"
        >
          {this.props.isEdit && this.renderAddNewGallery()}
        </CustomModal>
        {this.state.albums.length === 0 && "Comming Soon!"}
        {this.state.albums.map(album => (
          <Container key={album.albumID}>
            <Card>
              <CardBody>
                <div className="album-title">
                  <p className="album-title">{album.name}</p>
                  {this.props.isEdit && (
                    <PopoverDelete
                      customStyle={{
                        position: "absolute",
                        top: "10px",
                        right: "10px"
                      }}
                      id={album.albumID}
                      onClick={() =>
                        this.props.handleAlbumDelete({
                          album_id: album.albumID
                        })
                      }
                      subtitle="This will delete all the photos inside album"
                    />
                  )}
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
                      enableImageSelection={this.props.isEdit}
                      onSelectImage={this.onSelectImage.bind(
                        this,
                        album.albumID
                      )}
                    />
                  </div>
                  {this.props.isEdit && this.renderGalleryUpload(album.albumID)}
                </div>
              </CardBody>
            </Card>
          </Container>
        ))}
      </div>
    );
  }
}

export default GalleryComponent;
