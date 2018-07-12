import React, { Component } from "react";
import { Loader } from "semantic-ui-react";

class Loading extends Component {
  render() {
    return (
      <div className="app">
        <Loader
          active
          inline="centered"
          style={{
            marginTop: "30%"
          }}
        >
          Loading
        </Loader>
      </div>
    );
  }
}

export default Loading;
