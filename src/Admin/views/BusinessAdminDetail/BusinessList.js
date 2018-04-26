import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";

import { onBusinessAllGet } from "../../actions";
class BusinessList extends Component {
  columns = [{ Header: "Business Name", accessor: "business_name" }];

  componentDidMount = () =>
    this.onBusinessAllGet({
      rows: this.props.rows,
      page: this.props.page
    });

  onBusinessAllGet = params =>
    this.props.onBusinessAllGet({
      page: this.props.page,
      rows: this.props.rows,
      ...params
    });

  render() {
    return (
      <div className="animated fadeIn">
        Hello BusinessList
        <ReactTable
          manual
          pages={this.props.pages}
          page={this.props.page - 1}
          pageSizeOptions={[5, 10, 20, 25, 50, 100]}
          defaultPageSize={this.props.rows}
          columns={this.columns}
          data={this.props.businesses}
          onPageChange={pageIndex => {
            this.onBusinessAllGet({ page: ++pageIndex });
          }}
          onPageSizeChange={(pageSize, pageIndex) =>
            this.onBusinessAllGet({ page: ++pageIndex, rows: pageSize })
          }
        />
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: {
      business_reducer: { businesses, page, rows, pages }
    }
  }) => ({ businesses, page, rows, pages }),
  { onBusinessAllGet }
)(BusinessList);
