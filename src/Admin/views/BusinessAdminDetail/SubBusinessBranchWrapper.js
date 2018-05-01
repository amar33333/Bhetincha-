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
      // collapsed: true
    };
  }

  // static getDerivedStateFromProps = nextProps => {
  //   console.log("nextpors: ", nextProps);
  //   return nextProps.branchAddress && nextProps.edit
  //     ? {
  //         branchComponentList: nextProps.branchAddress.map((each, index) => (
  //           <SubBusinessBranch
  //             key={each.addressID}
  //             serial_num={index}
  //             id={each.addressID}
  //             branch={each}
  //             edit
  //           />
  //         )),

  //         branchs: nextProps.branchAddress
  //       }
  //     : null;
  // };
  // toggleCollapse = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed
  //   });
  // };

  // componentDidMount() {
  //   if (this.props.globalCollapsed) {
  //     this.toggleCollapse();
  //   }
  // }
  // componentWillUpdate(nextProps, nextState) {
  //   if (this.props.onSubmit)
  //     this.props.onSubmit({ branchs: nextState.branchs });
  // }

  /* TO BE DEPRECATED IN REACT 17.x 
   * USE `getDerivedStateFromProps` instead.
  */

  // componentWillReceiveProps(nextProps, nextState) {
  //   this.setState({
  //     branchComponentList: this.state.branchComponentList.map(
  //       branchComponent => {
  //         return {
  //           ...branchComponent,
  //           props: { ...branchComponent.props, ...nextProps }
  //         };
  //       }
  //     )
  //   });
  // }

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

  getState = () => ({ branchs: this.state.branchs });

  onBranchAddressAdd = () => {
    // console.log("onasd branch added");
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
            {
              /* console.log("branch wrapper: ", value, id, contacts); */
            }
            let branchs = [...this.state.branchs];
            let index = null;

            branchs.map((branch, i) => {
              {
                /* console.log("key BRANCH: ", branch.key, "id BRANCH: ", id); */
              }
              if (id === Number(branch.key)) {
                {
                  /* console.log("index BRNACH: ", i); */
                }
                index = i;
              }
            });
            {
              /* console.log("index BRNAHC: ", index); */
            }

            if (branchs.length > 0 && index !== null) {
              {
                /* console.log("edit ran BRNAHC: ", contacts); */
              }

              branchs[index].branch_address_line_1 =
                value.branch_address_line_1;
              branchs[index].branch_address_line_2 =
                value.branch_address_line_2;
              branchs[index].branch_house_no = value.branch_house_no;
              branchs[index].branch_landline = value.branch_landline;
              branchs[index].branch_landmark = value.branch_landmark;
              branchs[index].branch_other_landline_number =
                value.branch_other_landline_number;
              branchs[index].branch_post_box = value.branch_post_box;
              branchs[index].branch_area = value.branch_area;

              branchs[index].branch_city = value.branch_city;
              branchs[index].branch_country = value.branch_country;
              branchs[index].branch_district = value.branch_district;
              branchs[index].branch_state = value.branch_state;
              branchs[index].branch_toll_free = value.branch_toll_free;

              branchs[index].contactPerson = contacts.contactPerson;
              console.log("update branch: ", [...branchs, ...contacts]);
              this.setState({ branchs }, () => {
                /* console.log("immediate branch conta: ", this.state.branchs) */
              });
            } else {
              {
                /* console.log("new add ran  brnach: ", contacts); */
              }

              this.setState(
                {
                  branchs: [
                    ...this.state.branchs,
                    {
                      ...value,
                      branch_area: value.branch_area,
                      branch_city: value.branch_city,
                      branch_country: value.branch_country,
                      branch_state: value.branch_state,
                      branch_district: value.branch_district,
                      key: id,
                      ...contacts
                    }
                  ]
                },
                () => {
                  {
                    /* console.log("else monitor state: ", this.state.branchs); */
                  }
                  this.onBranchAddressAdd();
                }
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
    // console.log("render props branchs: ", this.props);
    // console.log("render state branchs: ", this.state);
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
                    Add New Branch
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
