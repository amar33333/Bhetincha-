import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Form, Input, Button, Col, Row } from "reactstrap";

class MenuNameEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      defaultInputValue: "",
      defaultInputId: "",
      selectedMenuDetail: []
    };
    this.onChangeName = this.onChangeName.bind(this);
    this.onInputSubmit = this.onInputSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      selectedMenuDetail: this.props.selectedMenuDetail
    });
  }

  onChangeName = event => {
    this.setState({
      name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });
    var inputIdTag = event.target.getAttribute("id");
    document.getElementById("menuEditSubmitBtn" + inputIdTag).style.display =
      "inline-block";
  };

  onInputSubmit = event => {
    event.preventDefault();
    this.props.onMenuNameUpdate({
      body: {
        name: this.state.name
      }
    });
    document.getElementById(
      "menuEditSaveBtn" + this.state.defaultInputId
    ).style.display =
      "none";
    document.getElementById(
      "menuEditSubmitBtn" + this.state.defaultInputId
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
      "menuEditSaveBtn" + this.state.defaultInputId
    ).style.display =
      "none";
    document.getElementById(
      "menuEditSubmitBtn" + this.state.defaultInputId
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
          id={"menuEditSubmitBtn" + inputId}
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
      document.getElementById("menuEditSaveBtn" + inputId)
    );
    document.getElementById("menuEditSaveBtn" + inputId).style.display =
      "inline-block";
  };

  render() {
    console.log(
      "Menu Data = name: " +
        this.props.selectedMenuDetail.name +
        "\n id : " +
        this.props.selectedMenuDetail.menuID
    );
    return (
      <Row>
        <Col xs="10" md="10">
          <Input
            required
            type="text"
            //value={this.props.selectedMenuDetail.name}
            defaultValue={this.props.selectedMenuDetail.name}
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
            key={this.props.selectedMenuDetail.menuID}
            id={this.props.selectedMenuDetail.menuID}
            className="menuInput"
            disabled="disabled"
          />
          <span
            id={"menuEditSaveBtn" + this.props.selectedMenuDetail.menuID}
            style={{
              position: "absolute",
              display: "none",
              right: "25px",
              fontSize: "15px",
              top: "9px"
            }}
          />
        </Col>
        <Col xs="2" md="2">
          <span
            className="fa fa-edit"
            style={{ color: "green", fontSize: "20px", margin: "10px 0" }}
            onClick={this.focusInput}
            dataid={this.props.selectedMenuDetail.menuID}
            dataname={this.props.selectedMenuDetail.name}
          />
        </Col>
      </Row>
    );
  }
}

export default connect(
  ({
    auth: { cookies },
    BusinessContainer: {
      exsection: { selectedMenuDetail }
    }
  }) => ({
    cookies,
    access_token: cookies.token_data.access_token,
    selectedMenuDetail
  }),
  {}
)(MenuNameEdit);
