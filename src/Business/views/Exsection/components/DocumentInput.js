import React, { Component } from "react";
import { Button } from "reactstrap";

class DocumentInput extends Component {
  constructor(props) {
    super(props);
  }

  // removeClick(i){

  // }
  render() {
    return (
      <div key={this.props.mykey}>
        <br />

        <div className="text-right">
          <Button
            color="danger"
            //onClick={this.removeClick.bind(this.props.mykey)}
            onClick={() => this.props.removeClick(this.props.mykey)}
          >
            x
          </Button>
        </div>

        {this.props.attributes
          .sort(function(a, b) {
            return a.order - b.order;
          })
          .map(attribute => {
            return this.props.renderField(attribute, this.props.mykey);
          })}
      </div>
    );
  }
}

export default DocumentInput;
