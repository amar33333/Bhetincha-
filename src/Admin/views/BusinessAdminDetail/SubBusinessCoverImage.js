import React, { Component } from "react";

import FileBase64 from "react-file-base64";

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Collapse
} from "reactstrap";

import { MAIN_URL } from "../../../Common/utils/API";

class SubBusinessCoverImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cover_photo: ""
      // collapsed: true
    };
  }
  // toggleCollapse = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed
  //   });
  // };

  // Callback~
  getFiles = (key, files) => {
    this.setState({ [key]: files }, () => {
      console.log("files base64: ", this.state);
    });
  };

  clearState = () => {
    this.setState({
      cover_photo: ""
    });
  };

  getState = () => ({
    cover_photo: this.state.cover_photo
      ? this.state.cover_photo.base64
      : undefined
  });

  displayImage = () =>
    this.props.imagePath ? (
      <img
        alt=""
        width="840"
        height="360"
        src={`${MAIN_URL}${this.props.imagePath}`}
      />
    ) : null;

  render() {
    // console.log("logo: ", this.props);
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <strong>Upload Business Cover Image</strong>
            </div>
          </CardHeader>
          <CardBody>
            {this.displayImage()}

            <Row>
              <Col>
                <FileBase64
                  multiple={false}
                  onDone={this.getFiles.bind(this, "cover_photo")}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SubBusinessCoverImage;
