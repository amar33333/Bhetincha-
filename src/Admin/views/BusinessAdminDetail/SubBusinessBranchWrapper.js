import React, { Component } from "react";

import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  Collapse
} from "reactstrap";

import SubBusinessBranch from "./SubBusinessBranch";

class SubBusinessBranchWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      branchAddress: []
    };
  }

  static getDerivedStateFromProps = nextProps => {
    // console.log("branchwrapper props: ", nextProps);
    return nextProps.branchAddress &&
      nextProps.branchAddress.length > 0 &&
      nextProps.edit
      ? { branchAddress: nextProps.branchAddress }
      : null;
  };

  clearState = () => {
    this.setState({
      branchAddress: []
    });
  };

  onBranchAddressAdd = () => {
    this.setState({
      branchAddress: [
        ...this.state.branchAddress,
        {
          country: "",
          state: "",
          district: "",
          city: "",
          area: "",
          email: "",
          landlineNumber: "",
          otherLandlineNumber: [],
          house_no: "",
          landmark: "",
          addressLine1: "",
          addressLine2: "",
          po_box: "",
          tollFreeNumber: "",
          latitude: 27.7172453,
          longitude: 85.32391758465576,
          contactPerson: []
        }
      ]
    });
  };

  onBranchChange = (index, data) => {
    console.log("branch change: ", index, data);
    const newBranchAddress = this.state.branchAddress.map(
      (branch, sub_index) => {
        return index !== sub_index ? branch : { ...branch, ...data };
      }
    );

    this.setState({ branchAddress: newBranchAddress });
  };

  onBranchDelete = index => () => {
    this.setState({
      branchAddress: this.state.branchAddress.filter(
        (branch, sub_index) => index !== sub_index
      )
    });
  };

  getState = () => {
    const branchAddress = this.state.branchAddress.map(eachItem => {
      console.log("eachItem: ", eachItem);
      let reformed = {};
      for (var property in eachItem) {
        console.log("property: ", property, eachItem[property]);

        reformed =
          eachItem[property] !== "" &&
          eachItem[property] !== null &&
          eachItem[property] !== undefined
            ? { ...reformed, [property]: eachItem[property] }
            : reformed;
      }
      console.log("branch address reformed: ", reformed);
      return reformed;
    });
    console.log("branch address reformed array: ", branchAddress);

    return {
      branchAddress
    };
  };

  render() {
    // console.log("branchWrapper props:", this.props);
    // console.log("branchWrapper state:", this.state);

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
              <strong>Business Branch Address</strong>
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
              {this.state.branchAddress.map((branch, index) => (
                <SubBusinessBranch
                  branch={branch}
                  key={index}
                  id={index}
                  onBranchChange={this.onBranchChange.bind(this, index)}
                  onBranchDelete={this.onBranchDelete(index)}
                  countries={this.props.countries}
                  cookies={this.props.cookies}
                  onAddressTreeList={this.props.onAddressTreeList}
                  edit={this.props.edit}
                />
              ))}
              <Row style={{ marginTop: 15 }}>
                <Col xs="6" md="6">
                  <Button color="primary" onClick={this.onBranchAddressAdd}>
                    <i className="fa fa-plus" /> Add New Branch
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default SubBusinessBranchWrapper;
