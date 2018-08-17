import React, { Component } from "react";
import { Link } from "react-router-dom";

import { PopoverDelete } from "../../../../Common/components";
import { Row, Col, Button, Input } from "reactstrap";
import InputRange from "react-input-range";

class SectionEntityDetail extends Component {
  render() {
    //console.log("this props ", this.props);
    const { sectionEntityDetailBiz } = this.props;
    return (
      <div>
        {sectionEntityDetailBiz && (
          <div>
            <Row className="mb-4">
              <Col
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start"
                }}
              >
                <h3 className="mb-0">
                  Entity Information of {sectionEntityDetailBiz.properties.name}
                  {/* {console.log("sectionEntityDetail", sectionEntityDetail)}
                  {console.log("attributes", this.props.attributes)} */}
                </h3>
                {/* <Link to={this.props.editURL} className="ml-2"> */}
                <Button color="primary">
                  <i className="fa fa-pencil" /> Edit
                </Button>
                {/* </Link> */}
                <div className="ml-2">
                  {/* <PopoverDelete
                    text="Delete"
                    onClick={() =>
                      this.props.onRemoveEcommerceProduct({
                        uid: sectionEntityDetail.uid,
                        routeToManageProducts: this.props.routeToManageProducts
                      })
                    }
                  /> */}
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="8">
                {console.log("this.props.attributes", this.props.attributes)}
                {this.props.attributes.map(attribute => {
                  let selectedKey = "";
                  if (
                    Object.keys(sectionEntityDetailBiz.properties).find(key => {
                      let attributeNameUpper = attribute.name;
                      // console.log("Gorilla", attributeNameUpper);
                      if (attributeNameUpper === "Name") {
                        attributeNameUpper =
                          attributeNameUpper.charAt(0).toLowerCase() +
                          attributeNameUpper.slice(1);
                      }
                      // let attributeNameLower =
                      //   attributeNameUpper.charAt(0).toLowerCase() +
                      //   attributeNameUpper.slice(1);
                      const found = key.split("--")[0] === attributeNameUpper;
                      // const found = key.split("--")[0] === attributeNameLower;
                      if (found) selectedKey = key;
                      return found;
                    })
                  ) {
                    return (
                      <p key={attribute.uid}>
                        {attribute.name.split("_").join(" ")}:
                        <Input
                          type="text"
                          defaultValue={
                            selectedKey.split("--").length === 2
                              ? `${
                                  sectionEntityDetailBiz.properties[selectedKey]
                                } ${
                                  selectedKey.split("--").length > 1
                                    ? selectedKey.split("--")[1]
                                    : ""
                                }`
                              : `${
                                  selectedKey.split("--").length > 1
                                    ? selectedKey.split("--")[1]
                                    : ""
                                } ${
                                  sectionEntityDetailBiz.properties[selectedKey]
                                }`
                          }
                          style={{
                            outline: 0,
                            border: "none",
                            float: "left",
                            paddingRight: "35px",
                            marginTop: "5px"
                          }}
                          disabled="disabled"
                        />
                      </p>
                    );
                  } else {
                    return null;
                  }
                })}
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

export default SectionEntityDetail;
