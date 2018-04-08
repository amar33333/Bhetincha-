import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <span>
          <a href="http://bhetincha.com">Bhetincha</a> &copy; 2018 Equated
          Ventures.
        </span>
        <span className="ml-auto">
          Powered by <a href="http://techkunja.com.np">Techkunja</a>
        </span>
      </footer>
    );
  }
}

export default Footer;
