import React, { Component } from "react";
import { Button } from "reactstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";

// import PropertyItem from "./PropertyItem";
import {
  PaginationComponent,
  PopoverDelete
} from "../../../../../Common/components";
import filterCaseInsesitive from "../../../../../Common/utils/filterCaseInsesitive";

class PropertyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: props.category.breadCrumbs
        ? this.mapProperties(props.category.breadCrumbs)
        : []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      console.log(
        "from here",
        this.mapProperties(this.props.category.breadCrumbs)
      );

      this.setState({
        properties: this.props.category.breadCrumbs
          ? this.mapProperties(this.props.category.breadCrumbs)
          : []
      });
    }
  }

  mapProperties = breadCrumbs => {
    let properties = [];
    let len = 0;
    breadCrumbs.forEach(breadcrumb => {
      properties = properties.concat(
        breadcrumb.properties.map(property => ({
          ...property,
          required: property.required ? "Yes" : "No",
          filterAble: property.filterAble ? "Yes" : "No",
          s_no: ++len,
          category: breadcrumb.name
        }))
      );
    });
    return properties;
  };

  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        filterable: false,
        // sortable: false,
        width: 70
      },
      { Header: "Name", accessor: "name" },
      { Header: "Category", accessor: "category" },
      { Header: "Field Type", accessor: "fieldType" },
      {
        Header: "Required",
        accessor: "required"
      },
      {
        Header: "Filterable",
        accessor: "filterAble"
      },
      {
        Header: "Actions",
        id: "edit",
        accessor: "uidAttributeType",
        filterable: false,
        sortable: false,
        width: 100,
        Cell: ({ value, original: { id, name } }) => (
          <div>
            {/* <Button
              color="secondary"
              className="mr-l"
              onClick={() => this.props.toggleIndustryEditModal({ id, name })}
            >
              Edit
            </Button> */}
            <PopoverDelete
              id={`delete-${value}`}
              onClick={() => this.props.onIndustryDelete({ id: value })}
            />
          </div>
        )
      }
    ],
    minRows: 5,
    defaultPageSize: 20,
    className: "-striped -highlight",
    filterable: true,
    style: { background: "white" },
    defaultFilterMethod: filterCaseInsesitive,
    noDataText: "No Attributes assigned",
    PaginationComponent
  };

  render() {
    return <ReactTable {...this.tableProps} data={this.state.properties} />;
  }
}

export default PropertyList;
