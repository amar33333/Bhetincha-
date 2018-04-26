import React, { Component } from "react";

import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  Collapse
} from "reactstrap";

import SubBusinessContact from "./SubBusinessContact";

class SubBusinessContactWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contactComponentList: [],
      contacts: [],
      collapse: true
    };
  }
  toggleCollapse = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };
  clearState = () => {
    this.setState({
      contactComponentList: [],
      contacts: []
    });
  };

  getState = () => ({ contacts: this.state.contacts });

  onContactAdd = () => {
    this.setState({
      contactComponentList: [
        ...this.state.contactComponentList,
        <SubBusinessContact
          ref={ref => (this.subBusinessContactRef = ref)}
          {...this.props}
          key={new Date().getTime()}
          id={new Date().getTime()}
          serial_num={this.state.contactComponentList.length}
          onAdd={(value, id) => {
            let contacts = [...this.state.contacts];
            let index = null;

            contacts.map((contact, i) => {
              console.log("key: ", contact.key, "id: ", id);
              if (id === Number(contact.key)) {
                console.log("index: ", i);
                index = i;
              }
            });
            console.log("index: ", index);

            if (contacts.length > 0 && index !== null) {
              console.log("edit ran: ", value);

              contacts[index].contact_person_name = value.contact_person_name;
              contacts[index].contact_person_email = value.contact_person_email;
              contacts[index].contact_person_designation =
                value.contact_person_designation;
              contacts[index].contact_person_mobile_number =
                value.contact_person_mobile_number;

              this.setState({ contacts });
            } else {
              console.log("new add ran");

              this.setState(
                {
                  contacts: [
                    ...this.state.contacts,
                    {
                      ...value,
                      key: id
                    }
                  ]
                },
                () => {
                  console.log("else monitor state: ", this.state.contacts);
                  this.onContactAdd();
                }
              );
            }
          }}
          /* onValueChange={(value, id) => {
            let contacts = [...this.state.contacts];
            let index = null;

            contacts.map((contact, i) => {
              console.log("key: ", contact.key, "id: ", id);
              if (id === Number(contact.key)) {
                console.log("index: ", i);
                index = i;
              }
            });
            console.log("index: ", index);

            if (contacts.length > 0 && index !== null) {
              console.log("edit ran: ", value);

              contacts[index].contact_person_name = value.contact_person_name;
              contacts[index].contact_person_email = value.contact_person_email;
              contacts[index].contact_person_designation =
                value.contact_person_designation;
              contacts[index].contact_person_mobile_number =
                value.contact_person_mobile_number;

              this.setState({ contacts });
            } else {
              console.log("new add ran");

              this.setState(
                {
                  contacts: [
                    ...this.state.contacts,
                    {
                      ...value,
                      key: id
                    }
                  ]
                },
                () => {
                  console.log("else monitor state: ", this.state.contacts);
                  this.onContactAdd();
                }
              );
            }
          }} */
          onDelete={id => {
            this.setState({
              contactComponentList: this.state.contactComponentList.filter(
                contactList => id !== Number(contactList.key)
              ),
              contacts: this.state.contacts.filter(
                contact => id !== Number(contact.key)
              )
            });
          }}
        />
      ]
    });
  };

  render() {
    console.log("render state contacts: ", this.state.contacts);
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
              <strong>Contact Person Details</strong>
              <Button
                color="primary"
                onClick={this.toggleCollapse}
                style={{
                  marginBottom: "0rem",
                  backgroundColor: "rgb(230, 228, 241)",
                  color: "black",
                  fontSize: "1.3rem",
                  border: "1px solid #2e219036",
                  borderRadius: "50%",
                  height: "30px",
                  width: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {this.state.collapse ? (
                  <i className="fa fa-angle-up" />
                ) : (
                  <i className="fa fa-angle-down" />
                )}
              </Button>
            </div>
          </CardHeader>
          <Collapse isOpen={this.state.collapse}>
            <CardBody>
              {this.state.contactComponentList}
              <Row style={{ marginTop: 15 }}>
                <Col xs="6" md="6">
                  <Button color="primary" onClick={this.onContactAdd}>
                    Add New Contact
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default SubBusinessContactWrapper;
