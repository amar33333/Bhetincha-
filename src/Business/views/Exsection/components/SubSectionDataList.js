import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";
import { SectionLoadingEffect } from "../../../../Common/components";
import { PopoverDelete } from "../../../../Common/components";

class SubSectionDataList extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <strong>
              Existing &nbsp;
              {this.props.selectedSectionDetailAdmin.name
                ? this.props.selectedSectionDetailAdmin.name
                : ""}
            </strong>
          </CardHeader>
          <CardBody>
            {this.props.loading && <SectionLoadingEffect />}
            {!this.props.loading &&
              !this.props.sections.length && <p>No Sub-Section Data</p>}
            {!this.props.loading &&
              this.props.sections.map(section => (
                <div key={section.attributes.uid} style={{ marginBottom: 5 }}>
                  <Row>
                    <Col sm={9} style={{ paddingTop: 5 }}>
                      <Link to={`${this.props.URL}/${section.attributes.uid}`}>
                        {section.attributes.name}
                      </Link>
                    </Col>
                    <Col sm={3}>
                      <Link to={`${this.props.URL}/${section.attributes.uid}`}>
                        <Button
                          data-tooltip="Detail"
                          color="secondary"
                          className="mr-2"
                        >
                          <i className="fa fa-eye" />
                        </Button>
                      </Link>
                      <Link
                        to={`${this.props.URL}/${section.attributes.uid}/edit`}
                      >
                        <Button
                          data-tooltip="Edit"
                          color="primary"
                          className="mr-2"
                        >
                          <i className="fa fa-pencil" />
                        </Button>
                      </Link>
                      {section.children.length < 1 ? (
                        <PopoverDelete
                          id={section.attributes.uid}
                          onClick={() =>
                            this.props.onRemoveExsectionSubSectionData({
                              uid: section.attributes.uid,
                              routeToManageSections: this.props
                                .routeToManageSections
                            })
                          }
                        />
                      ) : (
                        <PopoverDelete
                          id={section.attributes.uid}
                          childCountValue={section.children.length}
                          parentNameText={section.attributes.name}
                        />
                      )}
                    </Col>
                  </Row>
                </div>
              ))}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SubSectionDataList;
