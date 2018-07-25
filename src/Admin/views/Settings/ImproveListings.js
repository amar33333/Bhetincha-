import React, { Component } from "react";
import ImproveListingsTable from "./ImproveListingsTable";

class ImproveListings extends Component {
  // state = {
  //   name: "",
  //   className: ""
  // };

  // onChange = (key, event) => this.setState({ [key]: event.target.value });

  render() {
    return (
      <div className="animated fadeIn">
        <ImproveListingsTable />
      </div>
    );
  }
}

export default ImproveListings;
