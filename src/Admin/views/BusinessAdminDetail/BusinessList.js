import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import querystring from "querystring";

import { onBusinessAllGet } from "../../actions";
class BusinessList extends Component {
  static getDerivedStateFromProps = nextProps => ({
    params: { rows: nextProps.rows, page: nextProps.page }
  });

  tableProps = {
    columns: [{ Header: "Business Name", accessor: "business_name" }],
    pageSizeOptions: [5, 10, 20, 25, 50, 100]
    // defaultPageSize: 20
  };

  componentDidMount = () => {
    this.updateFromParams();
  };

  updateFromParams = () => {
    const params = querystring.parse(this.props.location.search.slice(1));
    console.log(this.props);
    if (params.rows) {
      try {
        const rows = parseInt(params.rows, 10);
        params.rows = this.tableProps.pageSizeOptions.includes(rows)
          ? rows
          : this.defaultPageSize;
      } catch (error) {
        params.rows = this.props.defaultPageSize;
      }
    }
    if (params.page) {
      try {
        const page = parseInt(params.page, 10);
        params.page = page;
      } catch (error) {
        params.page = 1;
      }
    }
    this.setState({ params }, () =>
      this.props.onBusinessAllGet({ ...this.state.params })
    );
  };

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search)
      this.updateFromParams();
    // console.log("location", this.props.location, prevProps.location);
  }

  // componentWillReceiveProps = nextProps => {
  //   console.log(nextProps, this.props.location);
  //   if (nextProps.location !== this.props.location) {
  //     console.log(nextProps.location, this.props.location);
  //   }
  // };
  // this.onBusinessAllGet({
  //   rows: this.props.rows,
  //   page: this.props.page
  // });

  onBusinessAllGet = params =>
    this.props.onBusinessAllGet({
      page: this.props.page,
      rows: this.props.rows,
      ...params
    });

  routeWith = extraParams => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: querystring.stringify({ ...this.state.params, ...extraParams })
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        Hello BusinessList
        <ReactTable
          {...this.tableProps}
          manual
          pages={this.props.pages}
          page={this.props.page - 1}
          // pageSizeOptions={this.pageSizeOptions}
          defaultPageSize={this.props.rows}
          // columns={this.columns}
          data={this.props.businesses}
          onPageChange={pageIndex => {
            this.routeWith({ page: ++pageIndex });
            // this.onBusinessAllGet({ page: ++pageIndex });
            // this.props.history.push({
            //   search: querystring.stringify({
            //     ...this.state.params,
            //     page: ++pageIndex
            //   })
            // });
          }}
          onPageSizeChange={(pageSize, pageIndex) => {
            this.routeWith({ page: ++pageIndex, rows: pageSize });
            // this.onBusinessAllGet({
            //   page: ++pageIndex,
            //   rows: pageSize
            // });
            // this.props.history.push({
            //   search: querystring.stringify({
            //     ...this.state.params,
            //     page: ++pageIndex,
            //     rows: pageSize
            //   })
            // });
          }}
        />
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: { business_reducer: { businesses, page, rows, pages } }
  }) => ({ businesses, page, rows, pages }),
  { onBusinessAllGet }
)(BusinessList);
