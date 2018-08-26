import React, { Component } from "react";
import { Link } from "react-router-dom";

import { PopoverDelete } from "../../../../Common/components";
import { Row, Col, Button } from "reactstrap";

class SectionEntityDetail extends Component {
  render() {
    const { sectionEntityDetailBiz } = this.props;
    return (
      <div>
        {sectionEntityDetailBiz.properties && (
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
                </h3>
                <Link to={this.props.editURL} className="ml-2">
                  <Button color="primary">
                    <i className="fa fa-pencil" /> Edit
                  </Button>
                </Link>
                <div className="ml-2">
                  <PopoverDelete
                    text="Delete"
                    onClick={() =>
                      this.props.onRemoveExsectionSectionEntity({
                        uid: sectionEntityDetailBiz.properties.uid,
                        routeToManageSections: this.props.routeToManageSections
                      })
                    }
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="8">
                {this.props.attributes.map(attribute => {
                  let selectedKey = "";
                  if (
                    Object.keys(sectionEntityDetailBiz.properties).find(key => {
                      let attributeNameUpper = attribute.name;
                      if (attributeNameUpper === "Name") {
                        attributeNameUpper =
                          attributeNameUpper.charAt(0).toLowerCase() +
                          attributeNameUpper.slice(1);
                      }
                      const found = key.split("--")[0] === attributeNameUpper;
                      if (found) selectedKey = key;
                      return found;
                    })
                  ) {
                    return (
                      <p key={attribute.uid} className="product-spec-item">
                        {attribute.name.split("_").join(" ")}:{" "}
                        {selectedKey.split("--").length === 2
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
                            }`}
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
