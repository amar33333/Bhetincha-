import React, { Component } from "react";
import { connect } from "react-redux";

import "../minisite.css";

import { MAIN_URL } from "../config/MINISITE_API";
import { handleCoverPhotoChange } from "../actions";
import { CustomModal } from "../../../../Common/components";

class CoverPhoto extends Component {
  state = { PhotoEditorComponent: null, isOpen: false };

  componentDidUpdate(prevProps) {
    if (prevProps.mainEdit !== this.props.mainEdit) {
      if (this.props.mainEdit) this.renderPhotoComponent();
      else this.setState({ PhotoEditorComponent: null });
    }
  }

  renderPhotoComponent = () => {
    import("./PhotoEditor").then(module =>
      this.setState({ PhotoEditorComponent: module.default })
    );
  };

  render() {
    const PhotoEditorComponent = this.state.PhotoEditorComponent;
    return (
      <div className="minisite_banner__wrapper">
        <img
          className="minisite_banner__img"
          src={`${MAIN_URL}${this.props.cover_photo}`}
          alt="banner"
        />
        {this.props.mainEdit && (
          <div className="minisite_banner__img__change__overlay">
            <button onClick={() => this.setState({ isOpen: true })}>
              Open Image Editor
            </button>
          </div>
        )}
        {this.props.mainEdit && (
          <CustomModal
            isOpen={this.state.isOpen}
            toggle={() => this.setState({ isOpen: !this.state.isOpen })}
            className="modal-lg"
            title="Image Editor"
          >
            {PhotoEditorComponent && <PhotoEditorComponent />}
          </CustomModal>
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
