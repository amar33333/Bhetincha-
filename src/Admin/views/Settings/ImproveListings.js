import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Col
} from "reactstrap";

import { onImproveListingList } from "../../actions";

class ImproveListings extends Component {
  state = {
    name: "",
    className: ""
  };

  componentDidMount() {
    this.props.onImproveListingList();
  }

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  render() {
    console.log("imporopv listgn props: ", this.props);
    return <div className="animated fadeIn">{/* Add Table Here ... */}</div>;
  }
}

export default connect(
  ({
    AdminContainer: {
      settings: { improveListings }
    }
  }) => ({
    improveListings
  }),
  {
    onImproveListingList
  }
)(ImproveListings);
