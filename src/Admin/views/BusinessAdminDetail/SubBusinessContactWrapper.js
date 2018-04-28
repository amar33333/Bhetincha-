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
      contactPerson: [],
      collapse: false
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
      contactPerson: []
    });
    if (this.subBusinessContactRef) this.subBusinessContactRef.clearState();
  };

  getState = () => ({ contactPerson: this.state.contactPerson });

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
            let contactPerson = [...this.state.contactPerson];
            let index = null;

            contactPerson.map((contact, i) => {
              {
                /* console.log("key: ", contact.key, "id: ", id); */
              }
              if (id === Number(contact.key)) {
                {
                  /* console.log("index: ", i); */
                }
                index = i;
              }
            });
            console.log("index: ", index);

            if (contactPerson.length > 0 && index !== null) {
              {
                /* console.log("edit ran: ", value); */
              }

              contactPerson[index].name = value.name;
              contactPerson[index].email = value.email;
              contactPerson[index].designation = value.designation;
              contactPerson[index].department = value.department;
              contactPerson[index].mobileNumber = value.mobileNumber;

              this.setState({ contactPerson });
            } else {
              {
                /* console.log("new add ran"); */
              }

              this.setState(
                {
                  contactPerson: [
                    ...this.state.contactPerson,
                    {
                      ...value,
                      key: id
                    }
                  ]
                },
                () => {
                  {
                    /* console.log("else monitor state: ", this.state.contactPerson); */
                  }
                  this.onContactAdd();
                }
              );
            }
          }}
          /* onValueChange={(value, id) => {
            let contactPerson = [...this.state.contactPerson];
            let index = null;

            contactPerson.map((contact, i) => {
              console.log("key: ", contact.key, "id: ", id);
              if (id === Number(contact.key)) {
                console.log("index: ", i);
                index = i;
              }
            });
            console.log("index: ", index);

            if (contactPerson.length > 0 && index !== null) {
              console.log("edit ran: ", value);

              contactPerson[index].name = value.name;
              contactPerson[index].email = value.email;
              contactPerson[index].designation =
                value.designation;
              contactPerson[index].mobile_number =
                value.mobile_number;

              this.setState({ contactPerson });
            } else {
              console.log("new add ran");

              this.setState(
                {
                  contactPerson: [
                    ...this.state.contactPerson,
                    {
                      ...value,
                      key: id
                    }
                  ]
                },
                () => {
                  console.log("else monitor state: ", this.state.contactPerson);
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
              contactPerson: this.state.contactPerson.filter(
                contact => id !== Number(contact.key)
              )
            });
          }}
        />
      ]
    });
  };

  render() {
    // console.log("render state contactPerson: ", this.state.contactPerson);
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader onClick={this.toggleCollapse}>
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
