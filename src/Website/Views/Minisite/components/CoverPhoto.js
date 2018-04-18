import React, { Component } from "react";
import { connect } from "react-redux";
import FileBase64 from "react-file-base64";

import "../minisite.css";

import { MAIN_URL } from "../config/MINISITE_API";
import { handleCoverPhotoChange } from "../actions";

class CoverPhoto extends Component {
  renderUploadOverlay = () => (
    <div className="minisite_banner__img__change__overlay">
      <span className="fa fa-camera">
        <FileBase64
          onDone={file =>
            this.props.handleCoverPhotoChange({
              id: this.props.id,
              access_token: this.props.cookies.token_data.access_token,
              username: this.props.username,
              data: { cover_photo: file.base64 }
            })
          }
        />
        {/* <strong> Upload New Banner</strong> */}
      </span>
    </div>
  );

  render() {
    return (
      <div className="minisite_banner__wrapper">
        <img
          className="minisite_banner__img"
          src={`${MAIN_URL}${this.props.cover_photo}`}
          alt="banner"
        />
        {this.props.mainEdit && this.renderUploadOverlay()}
      </div>
    );
  }
}

export default connect(
  ({
    auth: { cookies },
    MinisiteContainer: { crud: { cover_photo, id, username }, edit }
  }) => ({
    cover_photo,
    id,
    username,
    cookies,
    mainEdit: edit.main
  }),
  { handleCoverPhotoChange }
)(CoverPhoto);
