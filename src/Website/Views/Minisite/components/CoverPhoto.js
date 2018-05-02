import React, { Component } from "react";
import { connect } from "react-redux";

import "../minisite.css";

import { MAIN_URL } from "../config/MINISITE_API";
import { onBusinessUpdate } from "../actions";
import { CustomModal } from "../../../../Common/components";

class CoverPhoto extends Component {
  state = { PhotoEditorComponent: null, isOpen: false };

  componentDidMount = () => this.props.mainEdit && this.renderPhotoComponent();

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
            {PhotoEditorComponent && (
              <PhotoEditorComponent
                active="cover"
                logo={`${MAIN_URL}${this.props.logo}`}
                cover={`${MAIN_URL}${this.props.cover_photo}`}
                loading={this.props.loading}
                onUpload={(key, file) =>
                  this.props.onBusinessUpdate({
                    body: { [key === "cover" ? "cover_photo" : "logo"]: file }
                  })
                }
              />
            )}
          </CustomModal>
        )}
      </div>
    );
  }
}

export default connect(
  ({ MinisiteContainer: { crud: { cover_photo, logo }, edit } }) => ({
    cover_photo,
    logo,
    mainEdit: edit.main,
    loading: edit.imageEditorLoading
  }),
  { onBusinessUpdate }
)(CoverPhoto);
