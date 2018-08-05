import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button
} from "reactstrap";

import FoodGroupList from "./components/FoodGroupList";
//import FoodGroupAddNew from "./components/FoodGroupAddNew";
import MenuNameAdd from "./components/MenuNameAdd";
import MenuNameEdit from "./components/MenuNameEdit";

import {
  onFoodGroupList,
  onMenuNameExsection,
  onMenuNameUpdateExsection,
  onMenuNameAddExsection
} from "../../actions";

class ManageSectionMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isFoodGroupAddNewHidden: true,
      foodGroups: []
    };
  }

  // toggleHiddenFGAdd () {
  //   this.setState({
  //     isFoodGroupAddNewHidden: !this.state.isFoodGroupAddNewHidden
  //   })
  // }

  componentDidMount() {
    this.props.onFoodGroupList();
    this.props.onMenuNameExsection();
    this.setState({
      foodGroups: this.props.foodGroups
    });
  }

  render() {
    //console.log("gs = "+this.props.selectedMenuDetail);
    return (
      <div className="animated fadeIn">
        <Container fluid>
          <Row>
            <Col xs="12" md="5">
              <Card>
                <CardHeader>
                  {this.props.selectedMenuDetail.name === "" ? (
                    <MenuNameAdd
                      onMenuNameAdd={this.props.onMenuNameAddExsection}
                    />
                  ) : (
                    <MenuNameEdit
                      onMenuNameUpdate={this.props.onMenuNameUpdateExsection}
                      menudata={this.props.selectedMenuDetail}
                    />
                  )}
                </CardHeader>
              </Card>
            </Col>
          </Row>
          {this.props.selectedMenuDetail.name === "" ? (
            ""
          ) : (
            <FoodGroupList foodGroups={this.props.foodGroups} />
          )}
        </Container>
      </div>
    );
  }
}

export default connect(
  ({
    auth: { cookies },
    BusinessContainer: {
      exsection: { foodGroups, selectedMenuDetail }
    }
  }) => ({
    cookies,
    access_token: cookies.token_data.access_token,
    foodGroups,
    selectedMenuDetail
  }),
  {
    onFoodGroupList,
    onMenuNameExsection,
    onMenuNameUpdateExsection,
    onMenuNameAddExsection
  }
)(ManageSectionMenu);
