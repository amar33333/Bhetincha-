import React, { Component } from "react";
import { MAIN_URL } from "../../../../Common/utils/API";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import PopoverDelete from "./PopoverDelete";
import { Button } from "reactstrap";
class ListMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.listmembers
    };
    console.log("list member props =" + this.props.listmembers);
    console.log(this.props);
  }
  componentDidUpdate(previousProps) {
    if (previousProps !== this.props) {
      this.setState({
        data: this.props.listmembers
      });
    }
  }

  handleDelete(data) {
    console.log("on delete data=" + data);
  }
  render() {
    const { data } = this.state;
    console.log(data);
    console.log(this.props.listmembers);

    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Member ID",
              accessor: "memberID",
              width: 75
            },
            {
              Header: "Display Picture",
              width: 100,
              Cell: row => {
                console.log(row);
                return (
                  <div>
                    <img
                      alt={row.original.name}
                      height="60"
                      width="60"
                      // className="img-responsive"
                      src={`${MAIN_URL}${row.original.image}`}
                    />
                  </div>
                );
              }
            },
            {
              Header: "Name",
              accessor: "name",
              filterable: true,
              sortable: true
            },
            {
              Header: "Designation",
              accessor: "designation"
            },
            {
              Header: "Social Links",
              accessor: "socialProfile_links",
              Cell: row => {
                console.log(row.row.socialProfile_links);
                return (
                  <div>
                    <span className="class-for-address">
                      {row.value.map(book => (
                        <a key={book.SocialProfileLinkID} href={book.address}>
                          {" "}
                          {book.address}
                          <br />{" "}
                        </a>
                      ))}
                    </span>
                  </div>
                );
              }
            },
            {
              Header: "Actions",
              id: "edit",
              accessor: "memberID",
              filterable: false,
              sortable: false,
              width: 90,
              Cell: ({ value }) => (
                <div>
                  <Button
                    data-tooltip="Edit"
                    data-position="bottom center"
                    color="secondary"
                    className="mr-2"
                    onClick={() => {
                      this.props.toggelupdate(value);
                      // this.props.history.push(
                      //   `${this.props.match.url}/${value}/edit-branch`
                      // );
                    }}
                  >
                    <i className="fa fa-pencil" />
                  </Button>
                  <PopoverDelete
                    id={`delete-${value}`}
                    onClick={() => this.props.deleteMember(value)}
                  />
                </div>
              )
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default ListMembers;
