import React, { Component } from "react";
import { connect } from "react-redux";
import FileInputComponent from "react-file-input-previews-base64";

import "../minisite.css";

import { MAIN_URL } from "../config/MINISITE_API";
import { handleCoverPhotoChange } from "../actions";

class CoverPhoto extends Component {
  renderUploadOverlay = () => (
    <div className="minisite_banner__img__change__overlay">
      <FileInputComponent
        labelText=""
        multiple={false}
        imagePreview={false}
        labelStyle={{ display: "none" }}
        parentStyle={{ margin: 0 }}
        buttonComponent={<span className="fa fa-camera" />}
        callbackFunction={file =>
          this.props.handleCoverPhotoChange({
            id: this.props.id,
            access_token: this.props.cookies.token_data.access_token,
            username: this.props.username,
            data: { cover_photo: file.base64 }
          })
        }
        accept="image/*"
      />
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
