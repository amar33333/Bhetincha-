import React, { Component } from "react";
import { connect } from "react-redux";

import ReactTable from "react-table";
import "react-table/react-table.css";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Card
} from "reactstrap";
import {
  PaginationComponent,
  PopoverDelete
} from "../../../../Common/components";
import filterCaseInsesitive from "../../../../Common/utils/filterCaseInsesitive";
import { onFoodGroupItemRemove, onFoodGroupItemEdit } from "../../../actions";

class FoodGroupItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFoodGroupItems: [],
      iditem: "",
      name: "",
      price: "",
      fgidSelected: "",
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle = event => {
    var fgitemid = event.target.getAttribute("dataid");
    var fgitemname = event.target.getAttribute("dataname");
    var fgitemprice = event.target.getAttribute("dataprice");
    var fgitemfgid = event.target.getAttribute("datafgid");
    this.setState({
      modal: !this.state.modal,
      iditem: fgitemid,
      name: fgitemname,
      price: fgitemprice,
      fgidSelected: fgitemfgid
    });
  };

  toggleUpdate = event => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    // console.log("Posted Data = Item Id : " + this.state.iditem +
    // "\n Name : " + this.state.name +
    // "\n Price : " + this.state.price +
    // "\n Food Group Id : " + this.state.fgidSelected
    // );
    this.props.onFoodGroupItemEdit({
      body: {
        name: this.state.name,
        price: this.state.price
      },
      uid: this.state.fgidSelected,
      fgitemid: this.state.iditem
    });
    this.setState({
      iditem: "",
      name: "",
      price: "",
      fgidSelected: "",
      modal: !this.state.modal
    });
  };

  tableProps = {
    columns: [
      { Header: "Name", accessor: "name" },
      { Header: "Price", accessor: "price" },
      {
        Header: "Actions",
        id: "edit",
        accessor: "foodID",
        filterable: false,
        sortable: false,
        width: 100,
        Cell: ({ value, original: { foodID, name, price } }) => (
          <span>
            <span
              className="fa fa-edit"
              style={{
                color: "green",
                fontSize: "20px",
                position: "relative",
                top: "4px"
              }}
              onClick={this.toggle}
              dataid={foodID}
              dataname={name}
              dataprice={price}
              datafgid={this.props.selectedFoodGroupId}
            />
            <PopoverDelete
              id={`delete-item-${value}`}
              customStyle={{
                border: "none",
                color: "red",
                background: "none",
                outline: "none",
                fontSize: "24px",
                padding: "0 10px"
              }}
              onClick={() =>
                this.props.onFoodGroupItemRemove({
                  uid: this.props.selectedFoodGroupId,
                  fgitemid: value
                })
              }
            />
          </span>
        )
      }
    ],
    minRows: 1,
    defaultPageSize: 20,
    className: "-striped -highlight",
    filterable: true,
    style: { background: "white" },
    defaultFilterMethod: filterCaseInsesitive,
    noDataText: "No Food Item Available",
    PaginationComponent
  };

  render() {
    return (
      <div>
        {!this.props.selectedFoodGroupItems.length && (
          <p>No Food Group Items</p>
        )}

        {this.props.selectedFoodGroupItems.length === 0 ? (
          ""
        ) : (
          <ReactTable
            {...this.tableProps}
            data={this.props.selectedFoodGroupItems}
          />
        )}

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader
            toggle={this.toggleUpdate}
            style={{ backgroundColor: "#c2cfd6" }}
          >
            {" "}
            Update Food Item{" "}
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="name">Food Item Name</Label>
                    <Input
                      required
                      type="text"
                      value={this.state.name}
                      onChange={this.onChange.bind(this, "name")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="price">Price</Label>
                    <Input
                      required
                      type="number"
                      value={this.state.price}
                      onChange={this.onChange.bind(this, "price")}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter style={{ backgroundColor: "#c2cfd6" }}>
            <Button
              className="float-right mb-3"
              variant="raised"
              color="primary"
              margin-left="50%"
              onClick={this.handleSubmit}
            >
              <span className="fa fa-check" /> Update
            </Button>
            <Button
              className="float-right mb-3"
              margin-left="50%"
              color="danger"
              onClick={this.toggleUpdate}
            >
              <span className="fa fa-close" /> Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

//export default FoodGroupList;
export default connect(
  ({
    auth: { cookies },
    BusinessContainer: {
      exsection: { selectedFoodGroupItems, selectedFoodGroupId }
    }
  }) => ({
    cookies,
    access_token: cookies.token_data.access_token,
    selectedFoodGroupItems,
    selectedFoodGroupId
  }),
  {
    onFoodGroupItemRemove,
    onFoodGroupItemEdit
  }
)(FoodGroupItemList);
