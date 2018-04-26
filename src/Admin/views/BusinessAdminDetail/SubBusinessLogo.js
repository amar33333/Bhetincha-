import React, { Component } from "react";

import FileBase64 from "react-file-base64";

import { Card, CardHeader, CardBody } from "reactstrap";

class SubBusinessLogo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      business_logo: ""
    };
  }

  // Callback~
  getFiles = (key, files) => {
    this.setState({ [key]: files }, () => {
      console.log("files base64: ", this.state);
    });
  };

  clearState = () => {
    this.setState({
      business_logo: ""
    });
  };

  getState = () => this.state;

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Upload Business Logo</strong>
          </CardHeader>
          <CardBody>
            <FileBase64
              required
              multiple={false}
              onDone={this.getFiles.bind(this, "business_logo")}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SubBusinessLogo;
