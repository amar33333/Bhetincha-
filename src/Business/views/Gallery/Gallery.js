import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";
import GalleryView from "./GalleryView";
import GalleryList from "./GalleryList";

import { onGalleryList } from "../../actions";

class Gallery extends Component {
  componentDidMount() {
    this.props.onGalleryList();
  }

  render() {
    return (
      <div className="animated fadeIn">
        Create new album
        {!this.props.fetchLoading && this.props.match.params.albumID ? (
          <GalleryView />
        ) : (
          <GalleryList />
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
    onGalleryList
  }
)(Gallery);
