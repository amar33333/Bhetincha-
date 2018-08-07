import React, { Component } from "react";

class DocumentInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div key={this.props.mykey}>
        <br />

        {this.props.attributes.map(attribute => {
          return this.props.renderField(attribute, this.props.mykey);
        })}
      </div>
    );
  }
}

export default DocumentInput;
