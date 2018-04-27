import React, { Component } from "react";

import FileBase64 from "react-file-base64";

import { Card, CardHeader, CardBody, Button, Collapse } from "reactstrap";

class SubBusinessLogo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      business_logo: "",
      collapse: false
    };
  }
  toggleCollapse = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };
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
          <CardHeader onClick={this.toggleCollapse}>
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
                onClick={this.toggleCollapse}
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
                {this.state.collapse ? (
                  <i className="fa fa-angle-up" />
                ) : (
                  <i className="fa fa-angle-down" />
                )}
              </Button>
            </div>
          </CardHeader>
          <Collapse isOpen={this.state.collapse}>
            <CardBody>
              <FileBase64
                required
                multiple={false}
                onDone={this.getFiles.bind(this, "business_logo")}
              />
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default SubBusinessLogo;
