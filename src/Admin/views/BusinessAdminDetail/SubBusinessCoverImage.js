import React, { Component } from "react";

import FileBase64 from "react-file-base64";

import { Card, CardHeader, CardBody } from "reactstrap";

class SubBusinessCoverImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      business_cover_image: ""
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.onSubmit) this.props.onSubmit(nextState);
  }

  // Callback~
  getFiles = (key, files) => {
    this.setState({ [key]: files }, () => {
      console.log("files base64: ", this.state);
    });
  };

  clearState = () => {
    this.setState({
      business_cover_image: ""
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Upload Business Cover Image</strong>
          </CardHeader>
          <CardBody>
            <FileBase64
              required
              multiple={false}
              onDone={this.getFiles.bind(this, "business_cover_image")}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SubBusinessCoverImage;
