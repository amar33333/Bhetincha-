import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import {
  Form,
  FormGroup,
  Input,
  Label,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Card
} from "reactstrap";
class AddSocialLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url_name: "",
      address: "",
      nestedModal: false,
      editExisting: false,
      link_id: ""
    };
    this.toggleNested = this.toggleNested.bind(this);
    this.addlinks = this.addlinks.bind(this);
    this.toggelupdateSocial = this.toggelupdateSocial.bind(this);
  }
  onChange = (key, event) => this.setState({ [key]: event.target.value });

  toggelupdateSocial(linkId) {
    console.log("linkid for update= +" + linkId);
    for (var i = 0; i < this.props.social_Links.length; i++) {
      if (linkId === this.props.social_Links[i].SocialProfileLinkID) {
        console.log("link address is = +" + this.props.social_Links[i].address);

        this.setState({
          address: this.props.social_Links[i].address,
          editExisting: true,
          nestedModal: true,
          link_id: linkId
        });
      }
    }
  }
  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }
  addlinks() {
    const data1 = {
      url_name: this.state.url_name,
      address: this.state.address
    };
    if (this.props.edit) {
      const data = {
        body: {
          address: this.state.address
        },
        id: this.props.memberId,
        link_id: this.state.link_id
      };
      if (this.state.editExisting) {
        this.props.updatesocialLink(data);
      } else {
        this.props.addSocialLink(data);
      }
    } else {
      this.props.addlink(data1);
    }
    this.setState({
      nestedModal: !this.state.nestedModal,
      url_name: "",
      address: ""
    });
  }
  render() {
    console.log(this.props);
    return (
      <div className="animated fadeIn">
        <Button
          color="primary"
          className="fa fa-plus"
          onClick={this.toggleNested}
        >
          Add Social Links
        </Button>
        <Modal
          isOpen={this.state.nestedModal}
          toggle={this.toggleNested}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleNested}>Add Social Link</ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="url_name">Url Name</Label>
                  <Input
                    required
                    type="url_name"
                    value={this.state.url_name}
                    onChange={this.onChange.bind(this, "url_name")}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="address">URL</Label>
                  <Input
                    required
                    type="address"
                    value={this.state.address}
                    onChange={this.onChange.bind(this, "address")}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addlinks}>
              Add
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleNested}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default AddSocialLink;
