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
      branchComponentList: [],
      branchs: []
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.branchAddress && nextProps.edit) {
      return {
        branchComponentList: nextProps.branchAddress.map((each, index) => (
          <SubBusinessBranch
            key={each.addressID}
            serial_num={index}
            id={each.addressID}
            branch={each}
            edit
          />
        )),

        branchs: nextProps.branchAddress
      };
    }
    return {
      branchComponentList: prevState.branchComponentList.map(
        branchComponent => {
          return {
            ...branchComponent,
            props: { ...branchComponent.props, ...nextProps }
          };
        }
      )
    };
  };

  clearState = () => {
    this.setState({
      branchComponentList: [],
      branchs: []
    });
    if (this.subBusinessBranchRef) this.subBusinessBranchRef.clearState();
  };

  getState = () => {
    const branchs = this.state.branchs.map(eachItem => {
      console.log("eachItem: ", eachItem);
      let reformed = {};
      for (var property in eachItem) {
        reformed =
          (eachItem[property] !== "" &&
            eachItem[property] !== null &&
            eachItem[property] !== undefined) ||
          (eachItem[property].constructor === Array &&
            eachItem[property].length > 0)
            ? { ...reformed, [property]: eachItem[property] }
            : reformed;
      }
      console.log("branch address reformed: ", reformed);
      return reformed;
    });
    console.log("branch address reformed array: ", branchs);

    return {
      branchs
    };
  };

  onBranchAddressAdd = () => {
    this.setState({
      branchComponentList: [
        ...this.state.branchComponentList,
        <SubBusinessBranch
          ref={ref => (this.subBusinessBranchRef = ref)}
          {...this.props}
          key={new Date().getTime()}
          id={new Date().getTime()}
          serial_num={this.state.branchComponentList.length}
          onAdd={(value, id, contacts) => {
            let branchs = [...this.state.branchs];
            let index = null;

            branchs.map((branch, i) => {
              if (id === Number(branch.key)) {
                index = i;
              }
            });

            if (branchs.length > 0 && index !== null) {
              branchs[index].addressLine1 = value.addressLine1;
              branchs[index].addressLine2 = value.addressLine2;
              branchs[index].house_no = value.house_no;
              branchs[index].landlineNumber = value.landlineNumber;
              branchs[index].landmark = value.landmark;
              branchs[index].otherLandlineNumber = value.otherLandlineNumber;
              branchs[index].po_box = value.po_box;
              branchs[index].email = value.email;

              branchs[index].area = value.area ? value.area.id : "";
              branchs[index].city = value.city ? value.city.id : "";
              branchs[index].country = value.country ? value.country.id : "";
              branchs[index].district = value.district ? value.district.id : "";
              branchs[index].state = value.state ? value.state.id : "";

              branchs[index].tollFreeNumber = value.tollFreeNumber;

              branchs[index].contactPerson = contacts
                ? contacts.contactPerson
                : [];
              console.log("update branch: ", [...branchs, ...contacts]);
              this.setState({ branchs }, () => {});
            } else {
              this.setState(
                {
                  branchs: [
                    ...this.state.branchs,
                    {
                      ...value,
                      area: value.area ? value.area.id : "",
                      city: value.city ? value.city.id : "",
                      country: value.country ? value.country.id : "",
                      state: value.state ? value.state.id : "",
                      district: value.district ? value.district.id : "",
                      key: id,
                      ...contacts
                    }
                  ]
                },
                () => {}
              );
            }
          }}
          onDelete={id => {
            this.setState({
              branchComponentList: this.state.branchComponentList.filter(
                branchList => id !== Number(branchList.key)
              ),
              branchs: this.state.branchs.filter(
                branch => id !== Number(branch.key)
              )
            });
          }}
        />
      ]
    });
  };

  render() {
    console.log("branchWrapper props:", this.props);
    console.log("branchWrapper state:", this.state);

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
              {this.state.branchComponentList}
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
