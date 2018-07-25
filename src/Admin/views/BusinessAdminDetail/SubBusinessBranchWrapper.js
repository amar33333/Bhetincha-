import React, { Component } from "react";
import { toast } from "react-toastify";

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
    if (
      !nextProps.businessGet &&
      nextProps.branchAddress &&
      nextProps.branchAddress.length > 0 &&
      nextProps.EDIT
    ) {
      nextProps.onInitialPropsReceived();

      return {
        branchAddress: nextProps.branchAddress ? nextProps.branchAddress : []
      };
    }
    return null;
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

  onBranchSave = (index, data) => {
    const newBranchAddress = this.state.branchAddress.map(
      (branch, sub_index) => {
        return index !== sub_index ? branch : { ...branch, ...data };
      }
    );

    this.setState({ branchAddress: newBranchAddress }, () =>
      toast.success(` Branch - ${index + 1} Saved Successfully`)
    );
  };

  onBranchDelete = index => () => {
    this.setState(
      {
        branchAddress: this.state.branchAddress.filter(
          (branch, sub_index) => index !== sub_index
        )
      },
      () => toast.success(`Branch - ${index + 1} Deleted Successfully`)
    );
  };

  getState = () => {
    const branchAddress = this.state.branchAddress.map(eachItem => {
      let reformed = {};
      for (var property in eachItem) {
        const temp = {
          ...eachItem,
          country: eachItem.country ? eachItem.country.id : "",
          state: eachItem.state ? eachItem.state.id : "",
          district: eachItem.district ? eachItem.district.id : "",
          city: eachItem.city ? eachItem.city.id : "",
          area: eachItem.area ? eachItem.area.id : ""
        };

        reformed =
          temp[property] !== "" &&
          temp[property] !== null &&
          temp[property] !== undefined
            ? { ...reformed, [property]: temp[property] }
            : reformed;
      }
      return reformed;
    });

    return {
      branchAddress
    };
  };

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
                  onBranchSave={this.onBranchSave.bind(this, index)}
                  onBranchDelete={this.onBranchDelete(index)}
                  countries={this.props.countries}
                  cookies={this.props.cookies}
                  onAddressTreeList={this.props.onAddressTreeList}
                  EDIT={this.props.EDIT}
                  //edit={this.props.edit}
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
