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

import SocialLinkTable from "./SocialLinkTable";
import {
  onSocialLinkSubmit,
  onSocialLinksList,
  onSocialLinkRemove,
  onSocialLinkEdit,
  toggleSocialLinkEditModal
} from "../../actions";

import CustomModal from "../../../Common/components/CustomModal";
import SocialLinkEditModal from "../../../Common/components/CustomModal/ModalTemplates/SocialLinkEditModal";

import PermissionProvider from "../../../Common/utils/PermissionProvider";

class SocialLinks extends Component {
  state = {
    name: "",
    className: ""
  };

  componentDidMount() {
    this.props.onSocialLinksList();
  }

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  onFormSubmit = event => {
    event.preventDefault();

    const { name, className } = this.state;

    this.props.onSocialLinkSubmit({ body: { name, className } });
    this.clearState();
  };

  clearState = () => this.setState({ name: "", className: "" });

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="6">
            <PermissionProvider permission="CAN_ADD_SOCIAL_LINKS">
              <Card>
                <CardHeader>
                  <strong>Add New Social Link</strong>
                </CardHeader>
                <CardBody>
                  <form onSubmit={this.onFormSubmit}>
                    <InputGroup className="mb-2">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Social Link Name </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        autoFocus
                        required
                        type="text"
                        placeholder="Eg. Facebook"
                        value={this.state.name}
                        onChange={this.onChange.bind(this, "name")}
                      />
                    </InputGroup>
                    <InputGroup className="mb-2">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Social Link Class-Name</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        required
                        placeholder="Eg. fa fa-facebook"
                        value={this.state.className}
                        onChange={this.onChange.bind(this, "className")}
                      />
                    </InputGroup>
                    <Button type="submit" color="primary" value="Add Group">
                      <i className="fa fa-plus" /> Add Social Link
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </PermissionProvider>
          </Col>
        </Row>
        <SocialLinkTable
          fetchLoading={this.props.social_linksFetchLoading}
          data={this.props.social_links}
          onDelete={({ id }) => this.props.onSocialLinkRemove({ id })}
          onEdit={({ original: { id, name, className } }) => {
            this.props.toggleSocialLinkEditModal({
              id,
              name,
              className
            });
          }}
        />
        <CustomModal
          title="Edit Social Link Data"
          isOpen={this.props.socialLinkEditModal}
          toggle={this.props.toggleSocialLinkEditModal}
          className={"modal-xs" + this.props.className}
        >
          <SocialLinkEditModal
            data={this.props.socialLinkEditData}
            onSocialLinkEdit={this.props.onSocialLinkEdit}
          />
        </CustomModal>
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: {
      settings: {
        social_links,
        socialLinkEditData,
        socialLinkEditModal,
        social_linksFetchLoading
      }
    }
  }) => ({
    social_links,
    socialLinkEditData,
    socialLinkEditModal,
    social_linksFetchLoading
  }),
  {
    onSocialLinkSubmit,
    onSocialLinksList,
    onSocialLinkRemove,
    onSocialLinkEdit,
    toggleSocialLinkEditModal
  }
)(SocialLinks);
