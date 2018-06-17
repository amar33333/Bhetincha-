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
          category: breadcrumb.name,
          uidCategory: breadcrumb.uid
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
        accessor: "uid",
        filterable: false,
        sortable: false,
        width: 100,
        Cell: ({ value, original: { uidAttributeType, uidCategory } }) => (
          <div>
            {/* <Button
              color="secondary"
              className="mr-l"
              onClick={() => this.props.toggleIndustryEditModal({ id, name })}
            >
              Edit
            </Button> */}
            {/* {
    "categoryId":"0f5daa61bcf54871be75bb8554271e07",
    "attributeTypeId":"79e3af2d51514e33a5614c961fb17417",
    "relationshipId":"97cc9832949149cfa5e4b667857e32ad"
    
} */}
            <PopoverDelete
              id={`delete-${value}`}
              onClick={() =>
                this.props.onPropertyRemove({
                  categoryId: uidCategory,
                  attributeTypeId: uidAttributeType,
                  relationshipId: value
                })
              }
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
