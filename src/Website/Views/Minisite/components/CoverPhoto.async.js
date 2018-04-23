import React, { Component } from "react";
import { connect } from "react-redux";
// import FileInputComponent from "react-file-input-previews-base64";

import "../minisite.css";

import { MAIN_URL } from "../config/MINISITE_API";
import { handleCoverPhotoChange } from "../actions";

class CoverPhoto extends Component {
  state = { FileInputComponent: null };

  renderUploadOverlay = () => {
    import("react-file-input-previews-base64").then(module =>
      this.setState({ FileInputComponent: module.default })
    );
  };

  componentDidUpdate(prevProps) {
    if (prevProps.mainEdit !== this.props.mainEdit) {
      if (this.props.mainEdit) this.renderUploadOverlay();
      else this.setState({ FileInputComponent: null });
    }
  }

  render() {
    const FileInputComponent = this.state.FileInputComponent;
    return (
      <div className="minisite_banner__wrapper">
        <img
          className="minisite_banner__img"
          src={`${MAIN_URL}${this.props.cover_photo}`}
          alt="banner"
        />
        {this.props.mainEdit &&
          FileInputComponent && (
            <div className="minisite_banner__img__change__overlay">
              <FileInputComponent
                labelText=""
                multiple={false}
                imagePreview={false}
                labelStyle={{ display: "none" }}
                parentStyle={{ margin: 0 }}
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
          )}
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
