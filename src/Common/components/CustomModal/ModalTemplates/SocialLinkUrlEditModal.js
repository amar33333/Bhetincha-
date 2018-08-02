import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  FormGroup,
  Label
} from "reactstrap";

import Select from "react-select";

class SocialLinkUrlEditModal extends Component {
  state = {
    url: ""
  };

  componentDidMount() {
    this.setState({ url: this.props.data.link });
  }

  onChange = (key, event) => {
    this.setState({
      [key]: event.target.value
    });
  };

  onFormEdit = event => {
    event.preventDefault();

    let id = null;

    if (this.props.match) id = this.props.match.params.businessSlug;
    else if (this.props.cookies) id = this.props.cookies.user_data.business_id;

    this.props.onSocialLinkUrlEdit({
      id,
      social_link_id: this.props.data.social_nw.id,
      body: {
        link: this.state.url
      }
    });
  };

  render() {
    console.log("social links url: ", this.props);
    console.log("social links url stteate: ", this.state);
    return (
      <div className="animated fadeIn">
        <form onSubmit={this.onFormEdit}>
          <Row>
            <Col xs="12">
              <FormGroup>
                <Label for="Social Links">Social Links</Label>
                <Select
                  autoFocus
                  clearable
                  required
                  placeholder="Select a Social Link"
                  disabled={true}
                  name="SocialLinkUrlEditModal"
                  value={this.props.data.social_nw}
                  //options={this.props.social_links}
                  valueKey="id"
                  labelKey="name"
                />
              </FormGroup>
            </Col>
          </Row>

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
            disabled={this.props.socialLinksFetchLoading}
          >
            <i className="fa fa-plus" /> Edit Social Link
          </Button>
        </form>
      </div>
    );
  }
}

export default SocialLinkUrlEditModal;
