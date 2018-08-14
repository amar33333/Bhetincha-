import React, { Component } from "react";
import { Link } from "react-router-dom";

import { PopoverDelete } from "../../../../Common/components";
import { Row, Col, Button } from "reactstrap";

class SectionEntityDetail extends Component {
  render() {
    //console.log("this props ", this.props);
    const { sectionEntityDetail } = this.props;
    return (
      <div>
        {sectionEntityDetail && (
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
                  Entity Information of {sectionEntityDetail.properties.name}
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
                {/* <p className="product-spec-item">
                  Name: {sectionEntityDetail.properties.name}
                </p> */}
                {/* Here goes code  */}
                {/* {console.log("entity detail", sectionEntityDetail)} */}
                {this.props.attributes.map(attribute => {
                  let selectedKey = "";
                  if (
                    Object.keys(sectionEntityDetail.properties).find(key => {
                      let attributeNameUpper = attribute.name;
                      let attributeNameLower =
                        attributeNameUpper.charAt(0).toLowerCase() +
                        attributeNameUpper.slice(1);
                      const found = key.split("--")[0] === attributeNameLower;
                      if (found) selectedKey = key;
                      return found;
                    })
                  ) {
                    return (
                      <p key={attribute.uid}>
                        {attribute.name.split("_").join(" ")}:{" "}
                        {selectedKey.split("--").length === 2
                          ? `${sectionEntityDetail.properties[selectedKey]} ${
                              selectedKey.split("--").length > 1
                                ? selectedKey.split("--")[1]
                                : ""
                            }`
                          : `${
                              selectedKey.split("--").length > 1
                                ? selectedKey.split("--")[1]
                                : ""
                            } ${sectionEntityDetail.properties[selectedKey]}`}
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
