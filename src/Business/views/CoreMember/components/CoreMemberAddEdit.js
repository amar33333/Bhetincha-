import React, { Component } from "react";
import { Col } from "reactstrap";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import CreateMember from "./CreateMember";
import PopoverDelete from "./PopoverDelete";
class CoreMemberAddEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      members: [],
      isHidden: false
    };
    this.toggleHidden = this.toggleHidden.bind(this);
  }
  componentDidUpdate(previousProps) {
    if (previousProps.name !== this.props.name) {
      this.setState({
        isHidden: false,
        name: this.props.name
      });
    }
    console.log("componentdid update=" + this.props.corememberexist);
    console.log("componentdid update=" + this.state.isHidden);
  }
  toggleHidden() {
    console.log("the  ishidden=" + this.state.isHidden);
    this.setState({
      isHidden: !this.state.isHidden,
      name: this.props.name
    });

    console.log("the  ishidden=" + this.state.isHidden);
  }
  onChange = (key, event) => this.setState({ [key]: event.target.value });
  deleteCoreMember = event => {
    event.preventDefault();
    this.props.onDelete();
    this.setState({
      name: ""
    });
  };
  updateCoreMember = event => {
    event.preventDefault();
    const data = {
      body: {
        name: this.state.name,
        members: this.state.members
      }
    };
    this.props.onUpdate(data);
    this.setState({
      name: ""
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      body: {
        name: this.state.name,
        members: this.state.members
      }
    };
    this.props.onSubmit(data);
    this.setState({
      name: ""
    });
  };
  render() {
    console.log(this.props);
    console.log(this.state.isHidden);

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <strong>
                {this.props.corememberexist
                  ? this.props.name + "  "
                  : "Add Core Member"}
              </strong>
              {this.props.corememberexist ? (
                <span>
                  <Button color="primary" onClick={this.toggleHidden}>
                    <i className="fa fa-edit">Edit</i>
                  </Button>
                </span>
              ) : (
                ""
              )}
            </div>{" "}
          </CardHeader>{" "}
          {!this.props.corememberexist || this.state.isHidden ? (
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <FormGroup row>
                    <Label>Core Member Name *</Label>
                    <Col>
                      <Input
                        required
                        type="name"
                        placeholder="Core Member Name"
                        value={this.state.name}
                        onChange={this.onChange.bind(this, "name")}
                      />
                    </Col>
                    <div>
                      {this.props.corememberexist ? (
                        <Button
                          data-tooltip="SAVE"
                          className="float-right mb-3"
                          variant="raised"
                          color="primary"
                          margin-left="50%"
                          onClick={this.updateCoreMember}
                        >
                          <i className="fa fa-save" />
                        </Button>
                      ) : (
                        <Button
                          className="float-right mb-3"
                          variant="raised"
                          color="primary"
                          margin-left="50%"
                        >
                          <i className="fa-fa-plus" />
                          Add
                        </Button>
                      )}
                      {this.props.corememberexist ? (
                        <PopoverDelete
                          onClick={() => this.deleteCoreMember()}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </FormGroup>
                </FormGroup>
              </Form>
            </CardBody>
          ) : (
            ""
          )}
        </Card>{" "}
        {this.props.corememberexist ? (
          <CreateMember
            onAddMember={this.props.onAddmember}
            listmembers={this.props.members}
            deleteMember={this.props.deleteMember}
            onUpdateMember={this.props.updatemember}
            addSocial_Link={this.props.AddSocialLink}
            DelSocialLink={this.props.DelSocialLink}
            updatesocial_Link={this.props.updatesocialLink}
          />
        ) : (
          ""
        )}
        {/* {this.props.members.length > 0
          ? (console.log("length value =" + this.props.members.length),
            (
              <Card>
                <ListMembers
                  listmembers={this.props.members}
                  deleteMember={this.props.deleteMember}
                />{" "}
              </Card>
            ))
          : ""} */}
        <div />
      </div>
    );
  }
}
export default CoreMemberAddEdit;
