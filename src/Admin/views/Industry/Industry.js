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
import { PopoverDelete, PaginationComponent } from "../../../Common/components";
import filterCaseInsensitive from "../../../Common/utils/filterCaseInsesitive";
import "react-table/react-table.css";

import {
  onIndustrySubmit,
  onIndustryList,
  onUnmountIndustry,
  onIndustryDelete
} from "../../actions";

class Industry extends Component {
  static getDerivedStateFromProps = (nextProps, prevState) =>
    prevState.industrySubmit && !nextProps.error && !nextProps.loading
      ? { industry: "", industrySubmit: false }
      : null;

  state = { industry: "", industrySubmit: false };

  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        filterable: false,
        sortable: false,
        width: 70
      },
      { Header: "Industry", accessor: "name" },
      {
        Header: "Actions",
        id: "edit",
        accessor: "id",
        filterable: false,
        sortable: false,
        width: 145,
        Cell: ({ value }) => (
          <div>
            <Button
              color="secondary"
              className="mr-l"
              onClick={event => console.log("Edit clicked for id: ", value)}
            >
              Edit
            </Button>
            <PopoverDelete
              id={`delete-${value}`}
              onClick={() => this.props.onIndustryDelete({ id: value })}
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

  componentDidMount = () => this.props.onIndustryList();

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevState.industrySubmit && prevProps.loading)
      this.focusableInput.focus();
  };

  componentWillUnmount = () => this.props.onUnmountIndustry();

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  onFormSubmit = event => {
    event.preventDefault();
    const { industry } = this.state;
    this.setState({ industrySubmit: true }, () =>
      this.props.onIndustrySubmit({ industry })
    );
  };

  render() {
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
                        disabled={this.props.loading}
                        innerRef={ref => (this.focusableInput = ref)}
                        type="text"
                        placeholder="Type Industry Name"
                        value={this.state.industry.replace(/\b\w/g, l =>
                          l.toUpperCase()
                        )}
                        onChange={this.onChange.bind(this, "industry")}
                      />
                    </InputGroup>
                  </FormGroup>
                  <Button color="primary">
                    <span className="fa fa-plus" /> Add
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <ReactTable
          {...this.tableProps}
          data={this.props.industries}
          loading={this.props.fetchLoading}
          defaultFilterMethod={filterCaseInsensitive}
        />
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { industries } }) => ({ ...industries }),
  { onIndustrySubmit, onIndustryList, onUnmountIndustry, onIndustryDelete }
)(Industry);
