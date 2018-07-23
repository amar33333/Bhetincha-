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

    this.state = {
      properties: props.category.breadCrumbs
        ? this.mapProperties(props.category)
        : []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.setState({
        properties: this.props.category.breadCrumbs
          ? this.mapProperties(this.props.category)
          : []
      });
    }
  }

  mapProperties = category => {
    const { breadCrumbs } = category;
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
          uidCategory: breadcrumb.uid,
          uidPage: category.uid
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
        width: 70
      },
      {
        Header: "Ordering",
        accessor: "order",
        Cell: cellInfo => (
          <div
            key={cellInfo.original.uid}
            style={{ backgroundColor: "#fafafa" }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const value = parseInt(e.target.innerHTML, 10);
              if (!isNaN(value)) {
                const properties = [...this.state.properties];
                if (value !== properties[cellInfo.index][cellInfo.column.id]) {
                  this.props.onPropertyUpdate({
                    body: {
                      order: value,
                      categoryId: this.props.activeCategory,
                      relationshipId: cellInfo.original.uid
                    }
                  });
                } else {
                  e.target.innerHTML = value;
                }
              } else {
                e.target.innerHTML = this.state.properties[cellInfo.index][
                  cellInfo.column.id
                ];
              }
            }}
            onKeyDown={event => {
              if (event.keyCode === 13) {
                event.target.blur();
              }
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.properties[cellInfo.index][cellInfo.column.id]
            }}
          />
        ),
        width: 70
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value }) => value.split("_").join(" ")
      },
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
        Header: "Unit",
        accessor: "unit",
        Cell: ({ value }) => value.join(", ")
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
          original: { uidAttributeType, uidCategory, uidPage }
        }) => (
          <PopoverDelete
            id={`delete-${value}`}
            disabled={uidPage !== uidCategory}
            onClick={() =>
              this.props.onPropertyRemove({
                categoryId: uidCategory,
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
    return (
      <ReactTable
        {...this.tableProps}
        data={this.state.properties}
        defaultSorted={[{ id: "order", desc: false }]}
      />
    );
  }
}

export default PropertyList;
