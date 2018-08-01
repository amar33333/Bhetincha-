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

import {
  onSocialLinksList,
  onSocialLinkUrlSubmit,
  onSocialLinkUrlList,
  onSocialLinkUrlEdit,
  toggleSocialLinkUrlEditModal,
  onSocialLinkUrlRemove
} from "../../actions";

import SocialLinksTable from "./SocialLinksTable";

import SocialLinkUrlEditModal from "../../../Common/components/CustomModal/ModalTemplates/SocialLinkUrlEditModal";
import CustomModal from "../../../Common/components/CustomModal/CustomModal";

import { ErrorHandling } from "../../../Common/utils/Extras";

class SocialLinks extends Component {
  state = {
    url: "",
    social_link: ""
  };

  componentDidMount() {
    this.props.onSocialLinksList();
    this.props.onSocialLinkUrlList({
      id: this.props.cookies.user_data.business_id
    });
  }

  onChange = (key, event) => {
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
      id: this.props.cookies.user_data.business_id
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
                      name="SocialLinks"
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
        <SocialLinksTable
          data={this.props.social_url_links}
          fetchLoading={this.props.fetchLoading}
          onDelete={({ social_link_id }) => {
            this.props.onSocialLinkUrlRemove({
              social_link_id,
              id: this.props.cookies.user_data.business_id
            });
          }}
          onEdit={({ original }) => {
            this.props.toggleSocialLinkUrlEditModal({ ...original });
          }}
        />
        <CustomModal
          title="Edit Social Link"
          isOpen={this.props.socialLinkUrlEditModal}
          toggle={this.props.toggleSocialLinkUrlEditModal}
          className={"modal-xs" + this.props.className}
        >
          <SocialLinkUrlEditModal
            data={this.props.socialLinkUrlEditData}
            onSocialLinkUrlEdit={this.props.onSocialLinkUrlEdit}
            cookies={this.props.cookies}
            socialLinksFetchLoading={this.props.socialLinksFetchLoading}
          />
        </CustomModal>
      </div>
    );
  }
}

const mapStateToProps = ({
  auth: { cookies },
  BusinessContainer: {
    business_reducer: {
      social_links,
      social_link_error,
      social_url_links,
      socialLinksFetchLoading,
      socialLinkUrlEditModal,
      socialLinkUrlEditData
    }
  }
}) => {
  return {
    social_links,
    social_link_error,
    social_url_links,
    cookies,
    fetchLoading: socialLinksFetchLoading,
    socialLinkUrlEditModal,
    socialLinkUrlEditData
  };
};

export default connect(
  mapStateToProps,
  {
    onSocialLinksList,
    onSocialLinkUrlSubmit,
    onSocialLinkUrlEdit,
    onSocialLinkUrlList,
    toggleSocialLinkUrlEditModal,
    onSocialLinkUrlRemove
  }
)(SocialLinks);
