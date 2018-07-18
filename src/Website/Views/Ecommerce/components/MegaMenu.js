import React, { Component } from "react";
import { Segment, List, Icon } from "semantic-ui-react";
import { Row, Col } from "reactstrap";

const MAX_CAT = 10;
class MegaMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "", mouseOn: false };
  }

  handleCatHover = (e, childCat) => {
    this.setState({
      activeItem: childCat,
      mouseOn: true
    });
  };
  handleMouseOut = () => {
    this.setState({
      mouseOn: false
    });
  };

  handleMouseOn = () => {
    this.setState({
      mouseOn: true
    });
  };
  renderSubCats = () => {
    return (
      <div className="pt-3  sub-menu">
        {this.state.activeItem.children.map((cCat, index) => {
          return (
            <Row>
              <Col xs="12">
                <div className="mb-2 mt-2 sub-menu-name">
                  <strong key={index}>{cCat.name}</strong>
                </div>
                {cCat.children &&
                  cCat.children.map(ccCat => {
                    return (
                      <p className="ml-3 mb-0 sub-menu-item-name">
                        {ccCat.name}
                      </p>
                    );
                  })}
              </Col>
            </Row>
          );
        })}
      </div>
    );
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    return (
      <div className="menu-container pl-3" onMouseLeave={this.handleMouseOut}>
        <div
          style={{
            width: "30%"
          }}
        >
          <div className="menu-list-container pt-1 pb-2">
            {this.props.categories.children &&
              this.props.categories.children.map((cat, index) => {
                return (
                  <div
                    className="category-list-item"
                    key={index}
                    onMouseOver={e => this.handleCatHover(e, cat)}
                    onClick={() => console.log("Clicked::", cat.name)}
                  >
                    <Icon name="mobile" />
                    <p className="mb-0">{cat.name}</p>
                    <i
                      className="fa fa-angle-right ml-auto pr-1"
                      style={{
                        height: "5px !important"
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        <div
          className="ml-2 sub-menu-container"
          onMouseOver={e => this.handleMouseOn}
        >
          {this.state.mouseOn && this.renderSubCats()}
        </div>
      </div>
    );
  }
}

export default MegaMenu;
