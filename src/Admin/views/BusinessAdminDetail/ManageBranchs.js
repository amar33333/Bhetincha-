import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import ReactTable from "react-table";
import { PopoverDelete, PaginationComponent } from "../../../Common/components";
import filterCaseInsensitive from "../../../Common/utils/filterCaseInsesitive";

import { onBusinessBranchList } from "../../actions";

class ManageBranchs extends Component {
  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        filterable: false,
        sortable: false,
        width: 70
      },
      { Header: "Address Title", accessor: "address_title", sortable: true },
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
        width: 170,
        Cell: ({ value }) => (
          <div>
            <Button
              color="secondary"
              className="mr-l"
              onClick={() => {
                this.props.history.push(
                  `${this.props.match.url}/${value}/edit-branch`
                );
              }}
            >
              <i className="fa fa-pencil" /> Edit
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
    sortable: false,
    PaginationComponent
  };

  componentDidMount = () => {
    this.props.onBusinessBranchList({
      business_slug: this.props.match.params.businessSlug
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
            }/manage-branchs/add-branch`
          }}
        >
          <Button variant="raised" color="primary" className="mb-3">
            <i className="fa fa-plus" /> Add New Branch
          </Button>
        </Link>
        <ReactTable
          {...this.tableProps}
          style={{ background: "white" }}
          data={
            this.props.businessBranchData &&
            this.props.businessBranchData.length
              ? this.props.businessBranchData.map((x, i) => ({
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
      business_reducer: { businessBranchData }
    },
    auth
  }) => ({
    ...auth,
    businessBranchData
  }),
  {
    onBusinessBranchList
  }
)(ManageBranchs);
