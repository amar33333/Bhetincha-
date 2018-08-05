import React, { Component } from "react";
import { connect } from "react-redux";

import ReactTable from "react-table";
import "react-table/react-table.css";

import {
  PaginationComponent,
  PopoverDelete
} from "../../../../Common/components";
import filterCaseInsesitive from "../../../../Common/utils/filterCaseInsesitive";
import { onFoodGroupItemRemove } from "../../../actions";

class FoodGroupItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFoodGroupItems: []
      //data: this.props.selectedFoodGroupItems
    };
    this.renderEditable = this.renderEditable.bind(this);
  }

  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          // const data = [...this.state.data];
          // data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          // this.setState({ data });
          console.log("asd");
        }}
        // dangerouslySetInnerHTML={{
        //   __html: this.state.data[cellInfo.index][cellInfo.column.id]
        // }}
      />
    );
  }

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
        Cell: ({ value }) => (
          <PopoverDelete
            id={`delete-item-${value}`}
            onClick={() =>
              //console.log("fgid = "+this.props.selectedFoodGroupId+"\n fgitemid = "+value)
              this.props.onFoodGroupItemRemove({
                uid: this.props.selectedFoodGroupId,
                fgitemid: value
              })
            }
          />
        )
      }
    ],
    minRows: 1,
    defaultPageSize: 20,
    className: "-striped -highlight",
    filterable: true,
    style: { background: "white" },
    defaultFilterMethod: filterCaseInsesitive,
    noDataText: "No Attributes assigned",
    PaginationComponent
  };

  render() {
    //, console.log("FoodGroupItem = "+this.props.selectedFoodGroupItems);
    //const { data } = this.state;
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
    onFoodGroupItemRemove
  }
)(FoodGroupItemList);
