import React, { Component } from "react";

import FileBase64 from "react-file-base64";

import { Card, CardHeader, CardBody, Button, Collapse } from "reactstrap";
import { FETCH_DISTRICT_PENDING } from "../../actions/types";

import { MAIN_URL } from "../../../Common/utils/API";

class SubBusinessLogo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logo: ""
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
      logo: ""
    });
  };

  getState = () => ({
    logo: this.state.logo ? this.state.logo.base64 : undefined
  });

  displayImage = () =>
    this.props.imagePath ? (
      <img
        alt=""
        width="100"
        height="100"
        src={`${MAIN_URL}${this.props.imagePath}`}
      />
    ) : null;

  render() {
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
              <strong>Upload Business Logo</strong>
            </div>
          </CardHeader>
          <CardBody>
            {this.displayImage()}

            <FileBase64
              multiple={false}
              onDone={this.getFiles.bind(this, "logo")}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SubBusinessLogo;
