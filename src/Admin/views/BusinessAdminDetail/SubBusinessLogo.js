import React, { Component } from "react";

import FileBase64 from "react-file-base64";

import { Card, CardHeader, CardBody, Button, Collapse } from "reactstrap";
import { FETCH_DISTRICT_PENDING } from "../../actions/types";

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

  getState = () => (this.state ? this.state : null);

  displayImage = () =>
    this.props.imagePath ? (
      <img
        alt=""
        width="100"
        height="100"
        src={`http://159.65.150.212:8025${this.props.imagePath}`}
      />
    ) : null;

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader onClick={this.props.toggleCollapse}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <strong>Upload Business Logo</strong>
              <Button
                color="primary"
                onClick={this.props.toggleCollapse}
                style={{
                  marginBottom: "0rem",
                  backgroundColor: "rgb(230, 228, 241)",
                  color: "black",
                  fontSize: "1.3rem",
                  border: "1px solid #2e219036",
                  borderRadius: "50%",
                  height: "30px",
                  width: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {!this.props.collapsed ? (
                  <i className="fa fa-angle-up" />
                ) : (
                  <i className="fa fa-angle-down" />
                )}
              </Button>
            </div>
          </CardHeader>
          <Collapse isOpen={!this.props.collapsed}>
            <CardBody>
              {this.displayImage()}

              <FileBase64
                multiple={false}
                onDone={this.getFiles.bind(this, "logo")}
              />
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default SubBusinessLogo;
