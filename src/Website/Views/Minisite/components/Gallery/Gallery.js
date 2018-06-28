import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Button, Image, Label, Segment } from "semantic-ui-react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Input
} from "reactstrap";
import {
  handleGalleryPhotoUpload,
  onBusinessUpdate,
  handleGalleryPhotoDelete,
  handleGalleryAlbumDelete
} from "../../actions";
// import GalleryComponent from "./GalleryComponent";
import { MAIN_URL } from "../../config/MINISITE_API";
import { ROUTE_PARAMS_BUSINESS_NAME } from "../../../../../config/CONSTANTS";
import { CustomModal } from "../../../../../Common/components";

import defaultThumbnail from "../../../../../static/img/defaultThumbnail.jpg";
class Gallery extends Component {
  state = { newAlbumName: "", createModalOpened: false };

  toggleCreateModal = () =>
    this.setState({ createModalOpened: !this.state.createModalOpened });

  handlePhotoDelete = ({ photos, album_id }) => {
    this.props.handleGalleryPhotoDelete({
      body: { photos },
      album_id
    });
  };

  handleAlbumDelete = ({ album_id }) => {
    this.props.handleGalleryAlbumDelete({ album_id });
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
                  this.handleCreateAlbum(this.state.newAlbumName);
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
    console.log("albums:, ", this.props.albums);
    return (
      <div className="gallery-wrapper">
        <CustomModal
          isOpen={this.state.createModalOpened}
          toggle={this.toggleCreateModal}
          className="modal-md"
          title="Gallery | Create New"
        >
          {this.renderAddNewGallery()}
        </CustomModal>
        <Container>
          <Row>
            {this.props.albums.length === 0 ? `No Galleries found!` : null}
            {this.props.albums &&
              this.props.albums.map(album => {
                var src =
                  (album.photos[0] &&
                    `${MAIN_URL}${album.photos[0].photoURL}`) ||
                  defaultThumbnail;
                return (
                  <Col xs="12" md="3" key={album.albumID}>
                    <Segment
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0px",
                        minHeight: "200px"
                      }}
                    >
                      <Link
                        to={`/${
                          this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]
                        }/gallery/${album.albumID}`}
                      >
                        <Image
                          src={src}
                          className="minisite__album-thumbnail"
                        />
                      </Link>
                      {/* <Image
                        as="a"
                        href={`/${
                          this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]
                        }/gallery/${album.albumID}`}
                        src={src}
                        className="minisite__album-thumbnail"
                      /> */}

                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          padding: "5px 5px 5px 12px",
                          backgroundColor: "rgba(0,0,0,0.7)",
                          borderRadius: ".28571429rem 0 0 0",
                          color: "white"
                        }}
                      >
                        {album.name}
                      </div>
                    </Segment>
                  </Col>
                );
              })}
          </Row>
        </Container>
        {/* <GalleryComponent
          isEdit={this.props.mainEdit}
          createModalOpened={this.state.createModalOpened}
          toggleCreateModal={this.toggleCreateModal}
          albums={this.props.albums}
          MAIN_URL={MAIN_URL}
          handlePhotoDelete={this.handlePhotoDelete}
          handleAlbumDelete={this.handleAlbumDelete}
          handlePhotoUpload={this.handlePhotoUpload}
          handleCreateAlbum={this.handleCreateAlbum}
          // optional
          galleryLoading={this.props.galleryLoading}
        /> */}
        {this.props.mainEdit && (
          <Button
            data-tooltip="Add New Album"
            data-position="left center"
            circular
            icon="add"
            color="linkedin"
            size="big"
            style={{
              position: "absolute",
              right: "20px",
              bottom: "50px"
            }}
            onClick={this.toggleCreateModal}
          />
        )}
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
  {
    handleGalleryPhotoUpload,
    onBusinessUpdate,
    handleGalleryPhotoDelete,
    handleGalleryAlbumDelete
  }
)(Gallery);
