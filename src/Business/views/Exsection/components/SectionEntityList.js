import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";
import { SectionLoadingEffect } from "../../../../Common/components";
import { PopoverDelete } from "../../../../Common/components";
class SectionEntityList extends Component {
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
              !this.props.sections.length && <p>No Entity Data</p>}
            {!this.props.loading &&
              this.props.sections.map(section => (
                <div key={section.attributes.uid} style={{ marginBottom: 5 }}>
                  <Row>
                    <Col sm={6} style={{ paddingTop: 5 }}>
                      <Link to={`${this.props.URL}/${section.attributes.uid}`}>
                        {section.attributes.name}
                      </Link>
                    </Col>
                    <Col sm={6}>
                      <Button
                        data-tooltip="Detail"
                        color="secondary"
                        className="mr-2"
                      >
                        <i className="fa fa-eye" />
                      </Button>
                      <Button
                        data-tooltip="Edit"
                        color="primary"
                        className="mr-2"
                      >
                        <i className="fa fa-pencil" />
                      </Button>
                      <PopoverDelete />
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

export default SectionEntityList;
