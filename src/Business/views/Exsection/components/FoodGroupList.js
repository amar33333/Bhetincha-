import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import {
  Col,
  Row,
  Input,
  Card,
  CardHeader,
  CardBody,
  Button
} from "reactstrap";
import { Select } from "../../../../Common/components";
import FoodGroupAddNew from "./FoodGroupAddNew";
import FoodGroupItemList from "./FoodGroupItemList";
import FoodGroupItemAddNew from "./FoodGroupItemAddNew";
import { PopoverDelete } from "../../../../Common/components";
import {
  onFoodGroupDelete,
  onFoodGroupEditSubmit,
  onFoodGroupFetchList
} from "../../../actions";

class FoodGroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      defaultInputValue: "",
      defaultInputId: "",
      fgItemFetchId: "",
      isFoodGroupAddNewHidden: true,
      isFoodGroupAddNewItemHidden: true,
      //foodGroups: [],
      selectedFoodGroupItems: [],
      selectedFoodGroupName: "",
      foodGroup: null
    };
  }

  toggleHiddenFGAdd() {
    this.setState({
      isFoodGroupAddNewHidden: !this.state.isFoodGroupAddNewHidden
    });
  }

  toggleHiddenFGItemAddNew() {
    this.setState({
      isFoodGroupAddNewItemHidden: !this.state.isFoodGroupAddNewItemHidden
    });
  }

  componentDidMount() {
    //this.props.onFoodGroupFetchList();
    this.setState({
      selectedFoodGroupItems: this.props.selectedFoodGroupItems
    });
  }

  onChange = event => {
    var selectId = event.target.value;
    console.log("Select id : " + selectId);
    this.props.onFoodGroupFetchList({
      uid: selectId
    });
  };

  onChangeName = event => {
    this.setState({
      name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });
    var inputIdTag = event.target.getAttribute("id");
    document.getElementById("fgEditSaveBtn" + inputIdTag).style.display =
      "inline-block";
  };

  onInputSubmit = event => {
    event.preventDefault();
    this.props.onFoodGroupEditSubmit({
      body: {
        name: this.state.name
      },
      fgid: this.state.defaultInputId
    });
    document.getElementById(
      "fgEditSaveBtn" + this.state.defaultInputId
    ).style.display =
      "none";
    document
      .getElementById(this.state.defaultInputId)
      .setAttribute("disabled", "disabled");
    this.setState({ name: "", defaultInputId: "", defaultInputValue: "" });
  };

  onInputClear = event => {
    event.preventDefault();
    document.getElementById(
      this.state.defaultInputId
    ).value = this.state.defaultInputValue;
    document.getElementById(
      "fgEditSaveBtn" + this.state.defaultInputId
    ).style.display =
      "none";
    document
      .getElementById(this.state.defaultInputId)
      .setAttribute("disabled", "disabled");
  };

  focusInput = event => {
    var inputId = event.target.getAttribute("dataid");
    var inputOriginalValue = event.target.getAttribute("dataname");
    this.setState({
      defaultInputValue: inputOriginalValue,
      defaultInputId: inputId
    });
    document.getElementById(inputId).removeAttribute("disabled");
    document.getElementById(inputId).focus();
    const element = (
      <span>
        <span
          className="fa fa-check"
          onClick={this.onInputSubmit}
          style={{ marginRight: "5px", color: "green" }}
        />
        <span
          className="fa fa-close"
          onClick={this.onInputClear}
          style={{ color: "red" }}
        />
      </span>
    );
    ReactDOM.render(
      element,
      document.getElementById("fgEditSaveBtn" + inputId)
    );
  };

  render() {
    return (
      <Row>
        <Col xs="12" md="5">
          <Card>
            <CardHeader>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <strong>Food Group List</strong>

                <Button
                  data-tooltip="Add New Food Group"
                  data-position="bottom center"
                  color="primary"
                  onClick={this.toggleHiddenFGAdd.bind(this)}
                >
                  <span className="fa fa-plus" />
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              {!this.state.isFoodGroupAddNewHidden && <FoodGroupAddNew />}
              <div>
                {!this.props.foodGroups.length && <p>No Food Group</p>}
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {this.props.foodGroups.map(fg => (
                    <li
                      key={fg.foodCategoryID}
                      style={{
                        lineHeight: "35px",
                        verticalAlign: "middle",
                        padding: "5px",
                        border: "1px solid #c2cfd6"
                      }}
                    >
                      <Row>
                        <Col
                          xs="9"
                          md="9"
                          onClick={() =>
                            this.props.onFoodGroupFetchList({
                              uid: fg.foodCategoryID,
                              fgname: fg.name
                            })
                          }
                        >
                          <Input
                            required
                            type="text"
                            defaultValue={fg.name}
                            //value={fg.name}
                            onChange={this.onChangeName}
                            style={{
                              outline: 0,
                              border: "none",
                              float: "left",
                              paddingRight: "35px",
                              marginTop: "5px"
                            }}
                            innerRef={ref => {
                              this.focusableInput = ref;
                            }}
                            id={fg.foodCategoryID}
                            className="fgInput"
                            disabled="disabled"
                          />
                          <span
                            id={"fgEditSaveBtn" + fg.foodCategoryID}
                            style={{
                              position: "absolute",
                              display: "none",
                              right: "25px"
                            }}
                          />
                        </Col>

                        <Col xs="3" md="3">
                          <span
                            className="fa fa-edit"
                            style={{ color: "green" }}
                            onClick={this.focusInput}
                            dataid={fg.foodCategoryID}
                            dataname={fg.name}
                            title="Edit"
                          />
                          <PopoverDelete
                            customStyle={{
                              verticalAlign: "middle",
                              margin: "5px 0",
                              padding: "5px",
                              border: "none",
                              color: "red",
                              background: "none",
                              outline: "none"
                            }}
                            id={`delete-${fg.foodCategoryID}`}
                            //disabled={uidPage !== uidCategory}
                            onClick={() =>
                              this.props.onFoodGroupDelete({
                                uid: fg.foodCategoryID
                              })
                            }
                          />
                          <span
                            className="fa fa-list"
                            style={{ color: "blue" }}
                            title="List"
                            onClick={() =>
                              this.props.onFoodGroupFetchList({
                                uid: fg.foodCategoryID,
                                fgname: fg.name
                              })
                            }
                          />
                        </Col>
                      </Row>
                    </li>
                  ))}
                </ul>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="7">
          <Card>
            <CardHeader>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                {!this.props.foodGroups.length && <p>No Food Group</p>}
                <select
                  style={{
                    backgroundColor: "#c2cfd6",
                    padding: "3px 10px",
                    width: "auto",
                    border: "none",
                    outline: "0",
                    borderRadius: "4px"
                  }}
                  // autosize
                  // clearable
                  // name="foodGroup"
                  //value={this.state.foodGroup}
                  onChange={this.onChange}
                >
                  <option value="">Select Food Group</option>
                  {this.props.foodGroups.map(fgselect => (
                    <option
                      key={fgselect.foodCategoryID}
                      value={fgselect.foodCategoryID}
                    >
                      {fgselect.name}
                    </option>
                  ))}
                </select>

                {this.props.selectedFoodGroupName === "" ? (
                  ""
                ) : (
                  <Button
                    color="primary"
                    onClick={this.toggleHiddenFGItemAddNew.bind(this)}
                  >
                    <span className="fa fa-plus" />
                  </Button>
                )}
              </div>
            </CardHeader>
            {this.props.selectedFoodGroupName === "" ? (
              ""
            ) : (
              <CardBody>
                {!this.state.isFoodGroupAddNewItemHidden && (
                  <FoodGroupItemAddNew />
                )}
                <FoodGroupItemList
                  selectedFoodGroupItems={this.props.selectedFoodGroupItems}
                />
              </CardBody>
            )}
          </Card>
        </Col>
      </Row>
    );
  }
}

//export default FoodGroupList;
export default connect(
  ({
    auth: { cookies },
    BusinessContainer: {
      exsection: { selectedFoodGroupItems, selectedFoodGroupName }
    }
  }) => ({
    cookies,
    access_token: cookies.token_data.access_token,
    selectedFoodGroupItems,
    selectedFoodGroupName
  }),
  {
    onFoodGroupDelete,
    onFoodGroupEditSubmit,
    onFoodGroupFetchList
  }
)(FoodGroupList);
