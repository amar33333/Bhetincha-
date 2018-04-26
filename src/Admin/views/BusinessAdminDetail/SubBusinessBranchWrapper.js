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

  // componentWillUpdate(nextProps, nextState) {
  //   if (this.props.onSubmit)
  //     this.props.onSubmit({ branchs: nextState.branchs });
  // }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      branchComponentList: this.state.branchComponentList.map(
        branchComponent => {
          return {
            ...branchComponent,
            props: { ...branchComponent.props, ...nextProps }
          };
        }
      )
    });
  }

  clearState = () => {
    this.setState({
      branchComponentList: [],
      branchs: []
    });
    // console.log("branchredf: ", this.subBusinessBranchRef);
    // this.subBusinessBranchRef.clearState();
  };

  getState = () => ({ branchs: this.state.branchs });

  onBranchAddressAdd = () => {
    console.log("onasd branch added");
    this.setState({
      branchComponentList: [
        ...this.state.branchComponentList,
        <SubBusinessBranch
          /* ref={ref => (this.subBusinessBranchRef = ref)} */
          {...this.props}
          key={new Date().getTime()}
          id={new Date().getTime()}
          serial_num={this.state.branchComponentList.length}
          onAdd={(value, id, contacts) => {
            console.log("branch wrapper: ", value, id, contacts);
            let branchs = [...this.state.branchs];
            let index = null;

            branchs.map((branch, i) => {
              console.log("key BRANCH: ", branch.key, "id BRANCH: ", id);
              if (id === Number(branch.key)) {
                console.log("index BRNACH: ", i);
                index = i;
              }
            });
            console.log("index BRNAHC: ", index);

            if (branchs.length > 0 && index !== null) {
              console.log("edit ran BRNAHC: ", contacts);

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
              branchs[index].branch_toll_free = value.branch_toll_free;

              branchs[index].contacts = contacts.contacts;
              console.log("update branch: ", [...branchs, ...contacts]);
              this.setState({ branchs }, () =>
                console.log("immediate branch conta: ", this.state.branchs)
              );
            } else {
              console.log("new add ran  brnach");

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
                      key: id,
                      ...contacts
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

  render() {
    console.log("render state branchs: ", this.state);
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
