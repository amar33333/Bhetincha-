import React, { Component } from "react";
import { connect } from "react-redux";

import "../../minisite.css";

import { MAIN_URL } from "../../config/MINISITE_API";
import { onBusinessUpdate } from "../../actions";
import { CustomModal } from "../../../../../Common/components";

import { Button } from "reactstrap";

class CoverPhoto extends Component {
  state = { PhotoEditorComponent: null, isOpen: false };

  componentDidMount = () => {
    this.props.mainEdit && this.renderPhotoComponent();
  };

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
        <img
          src={`${MAIN_URL}${this.props.logo}`}
          alt="brand-logo"
          className=" navbar-brand main_nav__brand-logo"
        />
        {/* <div className="minisite_banner__img__text__overlay">
          <h1>We are best in Town,</h1>
          <h1>We get things Done!</h1>
          <p style={{ marginTop: 20 }}>
            We get things done in no time. Rember us for every digital needs.
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur quasi soluta dolorem, dignissimos nostrum voluptatibus
            et reiciendis quas cum. Sapiente a, enim molestiae cumque
            reprehenderit quos! Neque culpa dolor doloribus.
          </p>
          <Button outline color="warning" size="lg">
            Contact now
          </Button>
        </div> */}
        {this.props.mainEdit && (
          <div className="minisite_banner__img__change__overlay">
            <Button
              color="primary"
              onClick={() => this.setState({ isOpen: true })}
            >
              <i className="fa fa-camera" /> Open Image Editor
            </Button>
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
                key="cover"
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
  ({
    MinisiteContainer: {
      crud: { cover_photo, logo },
      edit
    }
  }) => ({
    cover_photo,
    logo,
    mainEdit: edit.main,
    loading: edit.imageEditorLoading
  }),
  { onBusinessUpdate }
)(CoverPhoto);
