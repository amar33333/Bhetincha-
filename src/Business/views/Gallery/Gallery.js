import React, { Component } from "react";
import { Container, Card, CardHeader, CardBody, Input } from "reactstrap";
import { connect } from "react-redux";
import GalleryView from "./GalleryView";
import GalleryList from "./GalleryList";

import { ROUTE_PARAMS_BUSINESS_NAME } from "../../../config/CONSTANTS";
import { onGalleryList, onGalleryEdit } from "../../actions";

class Gallery extends Component {
  state = { newAlbumName: "" };

  componentDidMount() {
    this.props.onGalleryList();
  }

  handleCreateAlbum = name =>
    this.props.onGalleryEdit({
      body: { albums: { name } }
    });

  render() {
    return (
      <div className="animated fadeIn">
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
        {!this.props.fetchLoading && this.props.match.params.albumID ? (
          <GalleryView />
        ) : (
          <GalleryList
            albums={this.props.albums}
            routeURL={`/${
              this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]
            }/dashboard/gallery`}
          />
        )}
      </div>
    );
  }
}

export default connect(
  ({
    BusinessContainer: {
      business_reducer: { albums, fetchLoading }
    }
  }) => ({ albums, fetchLoading }),
  {
    onGalleryList,
    onGalleryEdit
  }
)(Gallery);
