import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Card, CardBody, CardHeader, Row, Col } from "reactstrap";

import { MAIN_URL } from "../../config/BUSINESS_API";
import {
  onBusinessLogoCoverImageList,
  onBusinessLogoCoverImageEdit
} from "../../actions";
import { CustomModal } from "../../../Common/components";
import PhotoEditorComponent from "../../../Website/Views/Minisite/components/CoverPhoto/PhotoEditor";

class BusinessLogoCoverImage extends Component {
  // state = { isOpen: false };
  componentDidMount() {
    this.props.onBusinessLogoCoverImageList();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="4">
            <Card>
              <CardHeader>
                <strong>Logo</strong>
              </CardHeader>
              <CardBody>
                <PhotoEditorComponent
                  active="logo"
                  hideSidebar
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
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" md="8">
            <Card>
              <CardHeader>
                <strong>Cover Image</strong>
              </CardHeader>
              <CardBody>
                <PhotoEditorComponent
                  active="cover"
                  hideSidebar
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
              </CardBody>
            </Card>
          </Col>
        </Row>
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
