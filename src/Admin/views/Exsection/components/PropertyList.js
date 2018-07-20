import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

// import PropertyItem from "./PropertyItem";
import {
  PaginationComponent,
  PopoverDelete
} from "../../../../Common/components";
import filterCaseInsesitive from "../../../../Common/utils/filterCaseInsesitive";

class PropertyList extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // this.state = {
    //   properties: props.section.breadCrumbs
    //     ? this.mapProperties(props.section)
    //     : []
    // };
  }

  componentDidUpdate(prevProps) {
    console.log("VAR");
    console.log(this.props.section);
    // if (this.props.section !== prevProps.section) {
    //   this.setState({
    //     properties: this.props.section.breadCrumbs
    //       ? this.mapProperties(this.props.section)
    //       : []
    //   });
    // }
  }

  mapProperties = section => {
    const { breadCrumbs } = section;
    let properties = [];
    let len = 0;
    breadCrumbs.forEach(breadcrumb => {
      properties = properties.concat(
        breadcrumb.properties.map(property => ({
          ...property,
          required: property.required ? "Yes" : "No",
          filterAble: property.filterAble ? "Yes" : "No",
          s_no: ++len,
          section: breadcrumb.name,
          uidSection: breadcrumb.uid,
          uidPage: section.uid
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
      { Header: "Section", accessor: "section" },
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
        Cell: ({
          value,
          original: { uidAttributeType, uidSection, uidPage }
        }) => (
          <PopoverDelete
            id={`delete-${value}`}
            disabled={uidPage !== uidSection}
            onClick={() =>
              this.props.onPropertyRemove({
                sectionId: uidSection,
                attributeTypeId: uidAttributeType,
                relationshipId: value
              })
            }
          />
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