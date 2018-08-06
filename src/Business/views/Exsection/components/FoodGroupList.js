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
    this.setState({
      selectedFoodGroupItems: this.props.selectedFoodGroupItems
    });
  }

  onChange = event => {
    var selectId = event.target.value;
    //console.log("Select id : " + selectId);
    this.props.onFoodGroupFetchList({
      uid: selectId
    });
  };

  onChangeName = event => {
    this.setState({
      name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });
    var inputIdTag = event.target.getAttribute("id");
    document.getElementById("fgEditSubmitBtn" + inputIdTag).style.display =
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
    document.getElementById(
      "fgEditSubmitBtn" + this.state.defaultInputId
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
    document.getElementById(
      "fgEditSubmitBtn" + this.state.defaultInputId
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
      defaultInputId: inputId,
      name: inputOriginalValue.replace(/\b\w/g, l => l.toUpperCase())
    });
    document.getElementById(inputId).removeAttribute("disabled");
    document.getElementById(inputId).focus();
    const element = (
      <span>
        <span
          className="fa fa-check"
          onClick={this.onInputSubmit}
          id={"fgEditSubmitBtn" + inputId}
          style={{ marginRight: "5px", color: "green", display: "none" }}
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
    document.getElementById("fgEditSaveBtn" + inputId).style.display =
      "inline-block";
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
                        <Col xs="9" md="9">
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
                              right: "25px",
                              fontSize: "15px"
                            }}
                          />
                        </Col>

                        <Col xs="3" md="3">
                          <span
                            className="fa fa-edit"
                            style={{
                              color: "green",
                              fontSize: "20px",
                              position: "relative",
                              top: "4px"
                            }}
                            onClick={this.focusInput}
                            dataid={fg.foodCategoryID}
                            dataname={fg.name}
                          />
                          <PopoverDelete
                            customStyle={{
                              border: "none",
                              color: "red",
                              background: "none",
                              outline: "none",
                              fontSize: "24px",
                              padding: "0 10px"
                            }}
                            id={`delete-${fg.foodCategoryID}`}
                            onClick={() =>
                              this.props.onFoodGroupDelete({
                                uid: fg.foodCategoryID
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
        {!this.props.foodGroups.length ? (
          ""
        ) : (
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
                      outline: 0,
                      fontSize: "0.875rem"
                    }}
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
        )}
      </Row>
    );
  }
}

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
