import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody } from "reactstrap";

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
                : ""}&nbsp;(Click to Update)
            </strong>
          </CardHeader>
          <CardBody>
            {!this.props.sections.length && <p>No Entity Data</p>}
            {this.props.sections.map(section => (
              <div key={section.attributes.uid}>
                <Link to={`${this.props.URL}/${section.attributes.uid}`}>
                  {section.attributes.name}
                </Link>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SectionEntityList;
