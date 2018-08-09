import React, { Component } from "react";
import { toast } from "react-toastify";

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
import { MAIN_URL } from "../../../../Common/utils/API";
import getBase64 from "../../../../Common/utils/getBase64";
import ReactTable from "react-table";
import "react-table/react-table.css";
import AddSocialLink from "./AddSocilaLink";
import ListMembers from "./ListMembers";
import PopoverDelete from "./PopoverDelete";
class CreateMember extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      name: "",
      designation: "",
      image: "",
      socialProfile_links: [],
      modal: false,
      edit: false,
      id: "",
      link_id: "",
      image_src_update: ""
    };
    this.toggle = this.toggle.bind(this);
    this.addSocialLinks = this.addSocialLinks.bind(this);
    this.toggleUpdateMember = this.toggleUpdateMember.bind(this);
    this.getdata = this.getdata.bind(this);
  }
  componentDidUpdate(previousporps) {
    if (previousporps != this.props) {
      // for (var i = 0; i < this.props.listmembers.length; i++) {
      //   if (this.state.id === this.props.listmembers[i].memberID) {
      //     if (
      //       this.props.listmembers[i].socialProfile_links.length !=
      //       this.state.socialProfile_links.length
      this.setState({
        socialProfile_links: this.state.socialProfile_links
      });
    }
    //   }
    // }
  }
  EditSocialLink(value) {
    console.log("social link id =" + value);
    this.child.current.toggelupdateSocial(value);
  }
  DeleteSocialLink(value) {
    console.log("social link id=" + value);
    console.log("member id=" + this.state.id);

    const data = {
      body: {
        id: this.state.id,
        link_id: value
      }
    };
    this.props.DelSocialLink(data);
  }
  toggle() {
    this.setState({
      name: "",
      designation: "",
      image: "",
      socialProfile_links: [],
      modal: !this.state.modal,
      edit: false
    });
  }
  toggleUpdateMember(id) {
    for (var i = 0; i < this.props.listmembers.length; i++) {
      if (id === this.props.listmembers[i].memberID) {
        this.setState({
          name: this.props.listmembers[i].name,
          designation: this.props.listmembers[i].designation,
          // image: this.props.listmembers[i].image,
          socialProfile_links: this.props.listmembers[i].socialProfile_links,
          modal: true,
          edit: true,
          id: id,
          image_src_update: this.props.listmembers[i].image
        });
      }
      console.log(this.props.listmembers[i].memberID + "member are this");
      console.log("elememt member ID=" + id);
    }
    // this.setState({
    //   modal: true
    // });
  }
  addSocialLinks(data) {
    this.state.socialProfile_links.push(data);
    console.log(data);
    console.log(this.state.socialProfile_links);
  }

  onChangeName = event =>
    this.onChange(
      "name",
      event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    );
  onChangeDesignation = event =>
    this.onChange(
      "designation",
      event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    );
  onChange = (key, value) => {
    const re = /^[A-Za-z \b]+$/;
    if (value === "" || re.test(value)) {
      this.setState({ [key]: value });
    }
  };
  getdata() {
    var data = {};
    if (this.state.image !== "") {
      return (data = {
        body: {
          name: this.state.name,
          designation: this.state.designation,
          image: this.state.image.base64,
          socialProfile_links: this.state.socialProfile_links
        },
        id: this.state.id
      });
    } else {
      return (data = {
        body: {
          name: this.state.name,
          designation: this.state.designation,
          image: this.state.image.base64,
          socialProfile_links: this.state.socialProfile_links
        },
        id: this.state.id
      });
    }
  }
  //   var value = String.fromCharCode(event.which);
  //   var pattern = new RegExp(/[a-zåäö ]/i);
  //   console.log(pattern.test(value));
  //   return pattern.test(value);
  // }
  handleSubmit = event => {
    event.preventDefault();
    console.log("Props insiede add member=" + this.props);
    // const data = {
    //   body: {
    //     name: this.state.name,
    //     designation: this.state.designation,
    //     image: this.state.image.base64,
    //     socialProfile_links: this.state.socialProfile_links
    //   },
    //   id: this.state.id
    // };
    // if (this.state.image !== "")
    // console.log("Props insiede add member=" + data);

    console.log("data from core memeber after no image =" + this.getdata());

    console.log("Props insiede add member=" + this.state.social_Links);
    if (this.state.edit) {
      console.log("edit=" + this.state.edit);
      console.log("id=" + this.state.id);

      this.props.onUpdateMember(this.getdata());
      this.setState({
        name: "",
        designation: "",
        image: ""
      });
    } else {
      this.props.onAddMember(this.getdata());
      this.setState({
        name: "",
        designation: "",
        image: "",
        socialProfile_links: []
      });
    }
    this.toggle();
  };
  render() {
    console.log(this.props);
    return (
      <div className="animated fadeIn">
        <Button color="primary" className="fa fa-plus" onClick={this.toggle}>
          Add New Member
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            {this.state.edit
              ? "Edit Member: " + this.state.name
              : "Add New Member"}{" "}
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      required
                      type="name"
                      value={this.state.name}
                      onChange={this.onChangeName}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="designation">Designation</Label>
                    <Input
                      required
                      type="designation"
                      value={this.state.designation}
                      onChange={this.onChangeDesignation}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="image">Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={event =>
                        getBase64(event.target.files[0]).then(file => {
                          if (file.size > 1000000) {
                            toast.error("image size must le less than 1MB");
                          } else {
                            this.setState({ image: file });
                          }
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                {this.state.edit && this.state.image === "" ? (
                  <Col>
                    <div>
                      <img
                        alt="preview"
                        style={{ width: 80, height: 60 }}
                        key="image"
                        src={`${MAIN_URL}${this.state.image_src_update}`}
                      />
                    </div>
                  </Col>
                ) : (
                  <Col>
                    <div>
                      {this.state.image !== "" ? (
                        <img
                          alt={this.state.image.name}
                          src={this.state.image.base64}
                          key={this.state.image.name}
                          style={{ width: 80, height: 60 }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </Col>
                )}
              </Row>
              <Row>
                <Col>
                  <AddSocialLink
                    addlink={this.addSocialLinks}
                    edit={this.state.edit}
                    memberId={this.state.id}
                    addSocialLink={this.props.addSocial_Link}
                    social_Links={this.state.socialProfile_links}
                    updatesocialLink={this.props.updatesocial_Link}
                    ref={this.child}
                  />
                  {this.state.edit &&
                  this.state.socialProfile_links.length > 0 ? (
                    <div>
                      <ReactTable
                        data={this.state.socialProfile_links}
                        columns={[
                          // {
                          //   Header: "Social Link ID",
                          //   accessor: "SocialProfileLinkID",
                          //   width: 70
                          // },
                          {
                            Header: "URL",
                            accessor: "address"
                          },
                          {
                            Header: "Actions",
                            id: "edit",
                            accessor: "SocialProfileLinkID",
                            filterable: false,
                            sortable: false,
                            width: 90,
                            Cell: ({ value }) => (
                              <div>
                                <Button
                                  data-tooltip="Edit"
                                  data-position="bottom center"
                                  color="secondary"
                                  className="mr-2"
                                  onClick={() => {
                                    this.EditSocialLink(value);
                                    // this.props.history.push(
                                    //   `${this.props.match.url}/${value}/edit-branch`
                                    // );
                                  }}
                                >
                                  <i className="fa fa-pencil" />
                                </Button>
                                <PopoverDelete
                                  id={`delete-${value}`}
                                  onClick={() => this.DeleteSocialLink(value)}
                                />
                              </div>
                            )
                          }
                        ]}
                        showPagination={false}
                        defaultPageSize={this.state.socialProfile_links.length}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              className="float-right mb-3"
              variant="raised"
              color="primary"
              margin-left="50%"
              onClick={this.handleSubmit}
            >
              <i className="fa fa-save" /> Save
            </Button>
            <Button
              className="float-right mb-3"
              margin-left="50%"
              color="secondary"
              onClick={this.toggle}
            >
              <i className="fa fa-close" /> Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {this.props.listmembers.length > 0
          ? (console.log("length value =" + this.props.listmembers.length),
            (
              <Card>
                <ListMembers
                  listmembers={this.props.listmembers}
                  deleteMember={this.props.deleteMember}
                  toggelupdate={this.toggleUpdateMember}
                />{" "}
              </Card>
            ))
          : ""}
      </div>
    );
  }
}
export default CreateMember;
