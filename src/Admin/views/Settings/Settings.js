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
import { onSocialLinkSubmit, onSocialLinksList } from "../../actions";

class Settings extends Component {
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
    console.log("tsettings props: ", this.props);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Add New Social Link</strong>
              </CardHeader>
              <CardBody>
                <form onSubmit={this.onFormSubmit}>
                  <InputGroup>
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
                    <InputGroup>
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
                    <InputGroupAddon addonType="append">
                      <Button type="submit" color="primary" value="Add Group">
                        <i className="fa fa-plus" /> Add Social Link
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <SocialLinkTable
          data={this.props.social_links}
          onDelete={() => console.log("delete click gariis?")}
        />
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: {
      settings: { social_links }
    }
  }) => ({ social_links }),
  { onSocialLinkSubmit, onSocialLinksList }
)(Settings);
