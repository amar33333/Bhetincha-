import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody } from "reactstrap";

class SectionListAdmin extends Component {
  constructor(props) {
    super(props);

    this.getAllChild = this.getAllChild.bind(this);
    this.getAllChild2 = this.getAllChild2.bind(this);
  }

  getAllChild() {
    const nestedChild = this.props.activeChildrenAdmin;
    let arr = [];
    let obj = {};

    if (nestedChild) {
      obj.name = nestedChild ? nestedChild.name : "";
      arr.push(obj);

      if (nestedChild.children) {
        for (let child of nestedChild.children) {
          console.log(child);
        }
      }
    }

    return arr;
  }

  getAllChild2(arg1, array1 = []) {
    const obj1 = {};
    const nestedChild = arg1;
    obj1.name = nestedChild.name;
    array1.push(obj1);
    if (nestedChild.children === null) {
      return array1;
    }
    const array2 = array1;
    return this.getAllChild2(nestedChild.children, array2);
  }
  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <strong>"Placeholder" Section</strong>
          </CardHeader>
          <CardBody>
            {this.props.rootSectionAdmin
              ? this.props.rootSectionAdmin.name
              : ""}
            {this.props.activeChildrenAdmin
              ? this.getAllChild2(this.props.activeChildrenAdmin).map(data => {
                  return data.name;
                })
              : ""}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SectionListAdmin;
