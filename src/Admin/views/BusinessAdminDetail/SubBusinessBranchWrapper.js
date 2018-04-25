import React, { Component } from "react";

import { Row, Col, Button, Card, CardHeader, CardBody } from "reactstrap";

import SubBusinessBranch from "./SubBusinessBranch";

class SubBusinessBranchWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      branchComponentList: [],
      branchs: []
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.onSubmit)
      this.props.onSubmit({ branchs: nextState.branchs });
  }

  clearState = () => {
    this.setState({
      branchComponentList: [],
      branchs: []
    });
  };

  onBranchAddressAdd = () => {
    this.setState({
      branchComponentList: [
        ...this.state.branchComponentList,
        <SubBusinessBranch
          key={new Date().getTime()}
          id={new Date().getTime()}
          onValueChange={(value, id) => {
            let branchs = [...this.state.branchs];
            let index = null;

            branchs.map((branch, i) => {
              console.log("key: ", branch.key, "id: ", id);
              if (id === Number(branch.key)) {
                console.log("index: ", i);
                index = i;
              }
            });
            console.log("index: ", index);

            if (branchs.length > 0 && index !== null) {
              console.log("edit ran: ", value);

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
              branchs[index].branch_area = value.branch_area.value;

              branchs[index].branch_city = value.branch_city.value;
              branchs[index].branch_country = value.branch_country.value;
              branchs[index].branch_district = value.branch_district.value;
              branchs[index].branch_state = value.branch_state.value;
              branchs[index].branch_toll_free = value.branch_toll_free.value;

              this.setState({ branchs });
            } else {
              console.log("new add ran");

              this.setState(
                {
                  branchs: [
                    ...this.state.branchs,
                    {
                      ...value,
                      branch_area: value.branch_area.value,
                      branch_city: value.branch_city.value,
                      branch_country: value.branch_country.value,
                      branch_state: value.branch_state.value,
                      branch_district: value.branch_district.value,
                      key: id
                    }
                  ]
                },
                () => {
                  console.log("else monitor state: ", this.state.branchs);
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

  // onBranchAddressAdd = () => {
  //   // this.setState(
  //   //   { branchs: [...this.state.branchs, { name: this.state.album }] },
  //   //   () => console.log("ablu ssubmit: ", this.state)
  //   // );
  //   let branchs = [...this.state.branchs];
  //   this.setState({
  //     branchComponentList: [
  //       ...this.state.branchComponentList,
  //       <SubBusinessBranch
  //         key={this.state.branchComponentList.length}
  //         id={this.state.branchComponentList.length}
  //         onValueChange={(value, id) => {
  //           console.log("branchL: ", value, id);
  //           branchs =
  //             branchs.length + 1 <= this.state.branchComponentList.length
  //               ? [...this.state.branchs]
  //               : branchs;

  //           if (branchs[id]) {
  //             branchs[id].branch_address_line_1 = value.branch_address_line_1;
  //             branchs[id].branch_address_line_2 = value.branch_address_line_2;
  //             branchs[id].branch_house_no = value.branch_house_no;
  //             branchs[id].branch_landline = value.branch_landline;
  //             branchs[id].branch_landmark = value.branch_landmark;
  //             branchs[id].branch_other_landline_number =
  //               value.branch_other_landline_number;
  //             branchs[id].branch_post_box = value.branch_post_box;
  //             branchs[id].branch_area = value.branch_area.value;

  //             branchs[id].branch_city = value.branch_city;
  //             branchs[id].branch_country = value.branch_country;
  //             branchs[id].branch_district = value.branch_district;
  //             branchs[id].branch_state = value.branch_state;
  //             branchs[id].branch_toll_free = value.branch_toll_free;
  //             console.log("satisfied branchs ste: ", branchs);

  //             this.setState({ branchs: branchs });
  //           } else {
  //             this.setState({
  //               branchs: [
  //                 ...branchs,
  //                 {
  //                   ...value,
  //                   key: id
  //                 }
  //               ]
  //             });
  //             console.log("else  branchs ste: ", branchs);
  //           }
  //         }}
  //         onDelete={id => {
  //           branchs.splice(id, 1);

  //           this.setState({
  //             branchComponentList: this.state.branchComponentList.filter(
  //               branchList => id !== Number(branchList.key)
  //             ),
  //             branchs: branchs
  //           });
  //         }}
  //       />
  //     ]
  //   });
  // };

  render() {
    // console.log("render state: ", this.state.branchs);
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Business Branch Address</strong>
          </CardHeader>
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
        </Card>
      </div>
    );
  }
}

export default SubBusinessBranchWrapper;
