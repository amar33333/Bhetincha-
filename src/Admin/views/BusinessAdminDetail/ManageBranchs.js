import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import ReactTable from "react-table";
import { PopoverDelete, PaginationComponent } from "../../../Common/components";
import filterCaseInsensitive from "../../../Common/utils/filterCaseInsesitive";

import { onBusinessEachList } from "../../actions";

class ManageBranchs extends Component {
  access_token = this.props.cookies
    ? this.props.cookies.token_data.access_token
    : null;

  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        filterable: false,
        sortable: false,
        width: 70
      },
      { Header: "Address Title", accessor: "address_title" },
      {
        Header: "Area",
        accessor: "area",
        Cell: ({ value }) => <div>{value ? value.name : "-"}</div>,
        filterMethod: ({ value }, row) => {
          if (value) {
            if (row.area && row.area.name) {
              return (
                String(row.area.name.toLowerCase()).indexOf(
                  value.toLowerCase()
                ) !== -1
              );
            } else {
              return false;
            }
          } else {
            return true;
          }
        }
      },
      {
        Header: "Address",
        accessor: "addressID",
        filterable: false,
        Cell: ({
          value,
          original: { area, city, district, state, country }
        }) => (
          <div>
            <div>
              <b>City: </b>
              {city ? city.name : "-"}
            </div>
            <div>
              <b>District: </b>
              {district ? district.name : "-"}
            </div>
            <div>
              <b>State: </b>
              {state ? state.name : "-"}
            </div>
            <div>
              <b>Country: </b>
              {country ? country.name : "-"}
            </div>
          </div>
        )
      },
      {
        Header: "Contact Person",
        accessor: "contactPerson",
        filterable: false,
        Cell: ({ value }) => {
          if (value && value.length) {
            const data = value[0];

            return (
              <div>
                <div>
                  <b>Name: </b>
                  {data.name || "-"}
                </div>
                <div>
                  <b>Designation: </b>
                  {data.designation || "-"}
                </div>
                <div>
                  <b>Mobile No: </b>
                  {data.mobileNumber || "-"}
                </div>
                <div>
                  <b>E-mail: </b>
                  {data.email || "-"}
                </div>
              </div>
            );
          } else return "-";
        }
      },
      {
        Header: "Actions",
        id: "edit",
        accessor: "addressID",
        filterable: false,
        sortable: false,
        width: 145,
        Cell: ({ value }) => (
          <div>
            <Button
              color="secondary"
              className="mr-l"
              onClick={() => console.log("edit", value)}
            >
              Edit
            </Button>
            <PopoverDelete
              id={`delete-${value}`}
              onClick={() => console.log("delete", value)}
            />
          </div>
        )
      }
    ],
    minRows: 5,
    defaultPageSize: 20,
    className: "-striped -highlight",
    filterable: true,
    PaginationComponent
  };

  componentDidMount = () => {
    this.props.onBusinessEachList({
      username: this.props.match.params.businessSlug,
      access_token: this.access_token
    });
  };

  render() {
    console.log("manage branchs props: ", this.props);
    return (
      <div className="animated fadeIn">
        <Link
          to={{
            pathname: `/admin/list-business/${
              this.props.match.params.businessSlug
            }/manage-branchs/add-branch`,
            state: this.props.location.state
          }}
        >
          <Button variant="raised" color="primary">
            Add New Branch
          </Button>
        </Link>
        <p>Show Branch List Table Here</p>
        <ReactTable
          {...this.tableProps}
          style={{ background: "white" }}
          data={
            this.props.businessData &&
            this.props.businessData.branchAddress &&
            this.props.businessData.branchAddress.length
              ? this.props.businessData.branchAddress.map((x, i) => ({
                  ...x,
                  s_no: i + 1
                }))
              : []
          }
          loading={this.props.fetchLoading}
          defaultFilterMethod={filterCaseInsensitive}
        />
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: {
      business_reducer: { businessData }
    },
    auth
  }) => ({
    ...auth,
    businessData
  }),
  {
    onBusinessEachList
  }
)(ManageBranchs);
