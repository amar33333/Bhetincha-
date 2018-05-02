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
      collapsed: false
    };
  }

  static getDerivedStateFromProps = nextProps =>
    nextProps.contactPerson && nextProps.edit
      ? {
          contactComponentList: nextProps.contactPerson.map((each, index) => (
            <SubBusinessContact
              key={each.contactID}
              serial_num={index}
              id={each.contactID}
              contact={each}
              edit
            />
          )),

          contactPerson: nextProps.contactPerson
        }
      : null;

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  clearState = () => {
    this.setState({
      contactComponentList: [],
      contactPerson: []
    });
    if (this.subBusinessContactRef) this.subBusinessContactRef.clearState();
  };

  getState = () => {
    const contactPerson = this.state.contactPerson.map(eachItem => {
      let reformed = {};
      for (var property in eachItem) {
        reformed =
          (eachItem[property] !== "" &&
            eachItem[property] !== null &&
            eachItem[property] !== undefined) ||
          (eachItem[property].constructor === Array &&
            eachItem[property].length > 0)
            ? { ...reformed, [property]: eachItem[property] }
            : reformed;
      }
      console.log("contact reformed: ", reformed);
      return reformed;
    });
    console.log("contact reformed array: ", contactPerson);

    return contactPerson.constructor === Array && contactPerson.length > 0
      ? {
          contactPerson
        }
      : null;
  };
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
              if (id === Number(contact.key)) {
                index = i;
              }
            });
            console.log("index: ", index);

            if (contactPerson.length > 0 && index !== null) {
              contactPerson[index].name = value.name;
              contactPerson[index].email = value.email;
              contactPerson[index].designation = value.designation;
              contactPerson[index].department = value.department;
              contactPerson[index].mobileNumber = value.mobileNumber;

              this.setState({ contactPerson });
            } else {
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
                  this.onContactAdd();
                }
              );
            }
          }}
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
    console.log("render state contactPerson: ", this.state.contactPerson);
    // console.log("contactwrapper: ", this.state);
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
                {!this.state.collapsed ? (
                  <i className="fa fa-angle-up" />
                ) : (
                  <i className="fa fa-angle-down" />
                )}
              </Button>
            </div>
          </CardHeader>
          <Collapse isOpen={!this.state.collapsed}>
            <CardBody>
              {this.state.contactComponentList}
              <Row style={{ marginTop: 15 }}>
                <Col xs="6" md="6">
                  <Button color="primary" onClick={this.onContactAdd}>
                    <i className="fa fa-plus" /> Add New Contact
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
