import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  FormGroup,
  Label
} from "reactstrap";

import Select from "react-select";

import SocialUrlLinksTable from "./SocialUrlLinksTable";

import {
  onSocialLinksList,
  onSocialLinkUrlSubmit,
  onSocialLinkUrlList
} from "../../actions";

import { ErrorHandling } from "../../../Common/utils/Extras";

class SocialUrlLinks extends Component {
  state = {
    url: "",
    social_link: ""
  };

  componentDidMount() {
    this.props.onSocialLinksList();
    this.props.onSocialLinkUrlList({
      id: this.props.match.params.businessSlug
    });
  }

  onChange = (key, event) => {
    if (key === "url")
      this.setState({
        [key]: event.target.value
      });
    else
      this.setState({
        [key]: event.target.value
      });
  };

  onFormSubmit = event => {
    event.preventDefault();

    const {
      url: link,
      social_link: { id: social_nw }
    } = this.state;

    this.props.onSocialLinkUrlSubmit({
      body: { links: { link, social_nw } },
      id: this.props.match.params.businessSlug
    });
    this.clearState();
  };

  handleSelectChange = social_link => this.setState({ social_link });

  clearState = () => this.setState({ url: "", social_link: "" });

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Add New Social Link</strong>
          </CardHeader>
          <CardBody>
            <form onSubmit={this.onFormSubmit}>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label for="Social Links">Social Links</Label>
                    <Select
                      autoFocus
                      clearable
                      required
                      placeholder="Select a Social Link"
                      //disabled={this.props.loading}
                      name="SocialUrlLinks"
                      value={this.state.social_link}
                      onChange={this.handleSelectChange}
                      options={this.props.social_links}
                      valueKey="id"
                      labelKey="name"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <ErrorHandling
                error={
                  this.props.social_link_error &&
                  this.props.social_link_error.links.social_nw
                }
              />
              <InputGroup className="mb-2">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Social Link Url</InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  required
                  placeholder="Eg. https://facebook.com/mypage"
                  value={this.state.url}
                  onChange={this.onChange.bind(this, "url")}
                />
              </InputGroup>
              <Button
                type="submit"
                color="primary"
                value="Add Group"
                disabled={this.props.fetchLoading}
              >
                <i className="fa fa-plus" /> Add Social Link
              </Button>
            </form>
          </CardBody>
        </Card>
        <SocialUrlLinksTable
          data={this.props.social_url_links}
          fetchLoading={this.props.fetchLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  auth: { cookies },
  AdminContainer: {
    business_reducer: {
      social_link_error,
      social_url_links,
      socialUrlFetchLoading
    },
    settings: { social_links }
  }
}) => {
  return {
    social_links,
    social_link_error,
    social_url_links,
    cookies,
    fetchLoading: socialUrlFetchLoading
  };
};

export default connect(
  mapStateToProps,
  {
    onSocialLinksList,
    onSocialLinkUrlSubmit,
    onSocialLinkUrlList
  }
)(SocialUrlLinks);
