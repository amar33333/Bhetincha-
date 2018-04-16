import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  FormGroup,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";
import { connect } from "react-redux";
import ReactTable from "react-table";
import "react-table/react-table.css";

import {
  onIndustrySubmit,
  onIndustryList,
  onUnmountIndustry
} from "../../actions";

class Industry extends Component {
  state = {
    industry: "",
    data: [],
    pages: null,
    loading: true
  };

  access_token = this.props.cookies
    ? this.props.cookies.token_data.access_token
    : null;

  componentWillMount() {
    this.props.onIndustryList({ access_token: this.access_token });
  }

  componentWillUnmount() {
    this.props.onUnmountIndustry();
  }

  onFormSubmit = event => {
    event.preventDefault();
    const { industry } = this.state;
    this.props.onIndustrySubmit({ industry, access_token: this.access_token });
    this.setState({ industry: "" });
  };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  // requestData = (pageSize, page, sorted, filtered) => {
  //   return new Promise((resolve, reject) => {
  //     // if (this.props.industries.data) {
  //     // console.log("data received");

  //     const industries = this.props.industries.data
  //       ? this.props.industries.data.map(industry => {
  //           return { id: industry.id, name: industry.name };
  //         })
  //       : null;
  //     console.log("indsutie : ", industries);

  //     // You must return an object containing the rows of the current page, and optionally the total pages number.
  //     const res = {
  //       rows: industries,
  //       pages: Math.ceil(industries.length / pageSize)
  //     };

  //     resolve(res);
  //     // } else {
  //     //   console.log("no data received");
  //     //   reject();
  //     // }
  //   });
  // };

  fetchData(state, instance) {
    // this.setState({ loading: true });
    // this.requestData(state.pageSize, state.page, state.sorted, state.filtered)
    //   .then(response => {
    //     console.log("fetch positive");
    //     // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
    //     this.setState({
    //       data: response.rows,
    //       pages: response.pages,
    //       loading: false
    //     });
    //   })
    //   .catch(error => {
    //     console.log("fetch erro");
    //   });
    // console.log("industry list ", this.props);
    // if (this.props.industries.data) {
    //   const industries = this.props.industries.data
    //     ? this.props.industries.data.map(industry => {
    //         return { id: industry.id, name: industry.name };
    //       })
    //     : null;
    //   console.log("indsutie : ", industries);
    //   const pages = Math.ceil(industries.length / state.page);
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
    //   this.setState({
    //     data: industries,
    //     pages: pages,
    //     loading: false
    //   });
    // } else {
    //   console.log("no data");
    // }
  }

  render() {
    console.log("industry list ", this.props);
    // console.log("data: ", data);
    const industries = this.props.industries.data
      ? this.props.industries.data.map((industry, id) => {
          return { id: ++id, name: industry.name };
        })
      : [];
    console.log("indsutie : ", industries);
    // const pages = Math.ceil(industries.length / )
    const { loading } = this.state;
    console.log("loading: ", loading);

    if (industries.length !== 0 && this.state.loading) {
      console.log("set to: ", this.state.loading);
      this.setState({ loading: false });
    } else {
      console.log("set to: ", this.state.loading);
    }
    return (
      <div>
        <Row className="hr-centered">
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Add Industry</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit} inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-industry" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        autoFocus
                        required
                        type="text"
                        placeholder="Type Industry Name"
                        value={this.state.industry}
                        onChange={this.onChange.bind(this, "industry")}
                      />
                    </InputGroup>
                  </FormGroup>
                  <Button
                    color="primary"
                    //onClick={() => this.onLoginBtnClick()}
                  >
                    <span className="fa fa-plus" /> Add
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <ReactTable
          columns={[
            {
              Header: "S.N",
              accessor: "id"
            },
            {
              Header: "Industry",
              accessor: "name"
            }
          ]}
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          data={industries}
          pages={5} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
          //onFetchData={this.fetchData.bind(this)} // Request new data when things change
          filterable
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { industries }, auth }) => ({ industries, ...auth }),
  { onIndustrySubmit, onIndustryList, onUnmountIndustry }
)(Industry);
