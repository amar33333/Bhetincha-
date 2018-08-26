import React, { Component } from "react";
import ReactTable from "react-table";
import debounce from "lodash.debounce";

import PaginationComponent from "./CBReactTablePagination";

class ManualReactTable extends Component {
  constructor(props) {
    super(props);

    this.tableProps = {
      onFilteredChange: (column, value) => {
        if (props.searchList) {
          props.searchList.includes(value.id) &&
            this.debouncedSearch(
              column.filter(x => x.id === value.id).length
                ? column.find(x => x.id === value.id).value
                : "",
              value.id
            );
        }
      },
      defaultFiltered: props.defaultFiltered,
      manual: true,
      sortable: true,
      filterable: true,
      multiSort: false,
      minRows: 5,
      className: "-striped -highlight",
      PaginationComponent,
      ...props.tableProps
    };

    this.debouncedSearch = debounce(
      (value, key) =>
        this.props.handleFilterChange({
          [key]: value
        }),
      props.DEBOUNCE_TIME || 500
    );
  }

  render() {
    return (
      <ReactTable
        {...this.tableProps}
        style={{ background: "white" }}
        data={this.props.data}
        pageSize={this.props.filters.rows}
        sorted={this.props.filters.sortby}
        loading={this.props.loading}
        onPageChange={pageIndex =>
          this.props.fetchData({ page: pageIndex + 1 })
        }
        onPageSizeChange={(pageSize, pageIndex) =>
          this.props.fetchData({ page: pageIndex + 1, rows: pageSize })
        }
        onSortedChange={sortby => this.props.handleFilterChange({ sortby })}
        page={this.props.filters.page - 1}
        pages={this.props.pages}
        rowCount={this.props.rowCount}
      />
    );
  }
}

export default ManualReactTable;
