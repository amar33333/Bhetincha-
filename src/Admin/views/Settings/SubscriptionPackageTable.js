import React, { Component } from "react";
import { Button } from "reactstrap";
import ReactTable from "react-table";
import { PopoverDelete, PaginationComponent } from "../../../Common/components";
import filterCaseInsensitive from "../../../Common/utils/filterCaseInsesitive";

// import CustomModal from "../../../Common/components/CustomModal";
// import IndustryEditModal from "../../../Common/components/CustomModal/ModalTemplates/IndustryEditModal";

// import PermissionProvider from "../../../Common/utils/PermissionProvider";
// import { ErrorHandling } from "../../../Common/utils/Extras";

class SubscriptionPackageTable extends Component {
  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        filterable: false,
        sortable: false,
        width: 70
      },
      { Header: "Package Name", accessor: "name" },
      { Header: "Index Scoring", accessor: "indexScoring" },
      {
        Header: "Package Permission",
        accessor: "packagePermissions",
        Cell: ({ value }) => value.join(", "),
        sortable: false,
        filterable: false
      },
      {
        Header: "Actions",
        id: "edit",
        accessor: "id",
        filterable: false,
        sortable: false,
        width: 145,
        Cell: ({ value, original: { id, name } }) => (
          <div>
            {/* <PermissionProvider permission="CAN_EDIT_INDUSTRY">
              <Button
                data-tooltip="Edit"
                data-position="bottom center"
                color="secondary"
                className="mr-2"
                onClick={() => this.props.toggleIndustryEditModal({ id, name })}
              >
                <i className="fa fa-pencil" />
              </Button>
            </PermissionProvider>
            <PermissionProvider permission="CAN_DELETE_INDUSTRY">
              <PopoverDelete
                id={`delete-${value}`}
                onClick={() => this.props.onIndustryDelete({ id: value })}
              />
            </PermissionProvider> */}
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

  render() {
    return (
      <div>
        <ReactTable
          {...this.tableProps}
          style={{ background: "white" }}
          data={this.props.data}
          loading={this.props.fetchLoading}
          defaultFilterMethod={filterCaseInsensitive}
        />
        {/* <CustomModal
          title="Edit Industry Data"
          isOpen={this.props.industryEditModal}
          toggle={this.props.toggleIndustryEditModal}
          className={"modal-xs" + this.props.className}
        >
          <IndustryEditModal
            data={this.props.industryEditData}
            onIndustryEdit={this.props.onIndustryEdit}
            industryEditErrors={this.props.industryEditErrors}
            loading={this.props.loading}
            resetIndustryErrors={this.props.resetIndustryErrors}
          />
        </CustomModal> */}
      </div>
    );
  }
}

export default SubscriptionPackageTable;
