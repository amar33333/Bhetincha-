import React, { Component } from "react";
import { Row, Col } from "reactstrap";

class SubSectionDataDetail extends Component {
  render() {
    const { subSectionDataDetailBiz } = this.props;
    return (
      <div>
        {subSectionDataDetailBiz.properties && (
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
                  Sub-Section Information of
                  {subSectionDataDetailBiz.properties.name}
                </h3>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="8">
                {this.props.attributes.map(attribute => {
                  let selectedKey = "";
                  if (
                    Object.keys(subSectionDataDetailBiz.properties).find(
                      key => {
                        let attributeNameUpper = attribute.name;
                        if (attributeNameUpper === "Name") {
                          attributeNameUpper =
                            attributeNameUpper.charAt(0).toLowerCase() +
                            attributeNameUpper.slice(1);
                        }
                        const found = key.split("--")[0] === attributeNameUpper;
                        if (found) selectedKey = key;
                        return found;
                      }
                    )
                  ) {
                    return (
                      <p key={attribute.uid} className="product-spec-item">
                        {attribute.name.split("_").join(" ")}:{" "}
                        {selectedKey.split("--").length === 2
                          ? `${
                              subSectionDataDetailBiz.properties[selectedKey]
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
                              subSectionDataDetailBiz.properties[selectedKey]
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

export default SubSectionDataDetail;
