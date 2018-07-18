import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Card, CardBody, CardHeader, Col } from "reactstrap";

import { MAIN_URL } from "../../config/BUSINESS_API";
import {
  onBusinessLogoCoverImageList,
  onBusinessLogoCoverImageEdit
} from "../../actions";
import { CustomModal } from "../../../Common/components";
import PhotoEditorComponent from "../../../Website/Views/Minisite/components/CoverPhoto/PhotoEditor";
class BusinessLogoCoverImage extends Component {
  state = { isOpen: false };
  componentDidMount() {
    this.props.onBusinessLogoCoverImageList();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Button
          // className="pull-right"
          color="primary"
          onClick={() => this.setState({ isOpen: true })}
        >
          <i className="fa fa-camera" /> Upload New Image
        </Button>

        <CustomModal
          isOpen={this.state.isOpen}
          toggle={() => this.setState({ isOpen: !this.state.isOpen })}
          className="modal-lg"
          title="Image Editor"
        >
          <PhotoEditorComponent
            active="cover"
            logo={`${MAIN_URL}${this.props.logo}`}
            cover={`${MAIN_URL}${this.props.cover_image}`}
            loading={this.props.fetchLoading}
            onUpload={(key, file) => {
              this.props.onBusinessLogoCoverImageEdit({
                body: { [key === "cover" ? "cover_photo" : "logo"]: file }
                // id:
              });
            }}
          />
        </CustomModal>
        <br />
        <br />

        <Card>
          <CardHeader>
            <strong>Logo</strong>
          </CardHeader>
          <CardBody>
            <Col xs={12} sm={3}>
              {this.props.logo ? (
                <img
                  style={{ width: "100%" }}
                  alt="logo"
                  src={`${MAIN_URL}${this.props.logo}`}
                />
              ) : (
                "No Logo Found"
              )}
            </Col>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <strong>Cover Image</strong>
          </CardHeader>
          <CardBody>
            {this.props.cover_image ? (
              <img
                style={{ width: "100%" }}
                alt="cover"
                src={`${MAIN_URL}${this.props.cover_image}`}
              />
            ) : (
              "No Cover Found"
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = ({
  BusinessContainer: {
    business_reducer: { logo, cover_image, fetchLoading }
  }
}) => {
  return {
    logo,
    cover_image,
    fetchLoading
  };
};

export default connect(
  mapStateToProps,
  { onBusinessLogoCoverImageList, onBusinessLogoCoverImageEdit }
)(BusinessLogoCoverImage);
