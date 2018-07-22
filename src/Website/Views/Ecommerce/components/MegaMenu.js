import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import { spawn } from "child_process";

const MAX_CAT = 4;
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
      mouseOn: false,
      activeItem: ""
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
            <div className="sub-cat-column" key={index}>
              <div
                className="mb-2 mt-2 sub-menu-name"
                onClick={() => this.props.onSelect(cCat.uid)}
              >
                <strong>{cCat.name}</strong>
              </div>
              <div className="sub-cat-column-content">
                {cCat.children &&
                  cCat.children.map((ccCat, ccCatIndex) => {
                    if (ccCatIndex > MAX_CAT) return null;
                    return (
                      <span key={ccCatIndex}>
                        {ccCatIndex < MAX_CAT ? (
                          <p
                            className="ml-3 mb-0 sub-menu-item-name"
                            onClick={() => this.props.onSelect(ccCat.uid)}
                          >
                            {ccCat.name}
                          </p>
                        ) : (
                          <small
                            className="ml-3 mb-0 sub-menu-item-name"
                            onClick={() => this.props.onSelect(cCat.uid)}
                          >
                            + {cCat.children.length - MAX_CAT} more{" "}
                            {cCat.children.length - MAX_CAT === 1
                              ? `category`
                              : `categories`}
                          </small>
                        )}
                      </span>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    return (
      <div className="menu-container pl-3" onMouseLeave={this.handleMouseOut}>
        <div className="menu-list-container pt-1 pb-2">
          {this.props.categories.children &&
            this.props.categories.children.map((cat, index) => {
              return (
                <div
                  // className="category-list-item"
                  className={
                    cat === this.state.activeItem
                      ? `category-list-item active-menu-name`
                      : `category-list-item`
                  }
                  key={index}
                  onMouseOver={e => this.handleCatHover(e, cat)}
                  onClick={() => this.props.onSelect(cat.uid)}
                >
                  {cat.className ? (
                    <i
                      className={cat.className}
                      style={{
                        marginRight: "0.4rem",
                        marginLeft: "0.2rem"
                      }}
                    />
                  ) : (
                    <Icon name="mobile" />
                  )}

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

        <div
          className="sub-menu-container"
          onMouseOver={e => this.handleMouseOn}
        >
          {this.state.mouseOn && this.renderSubCats()}
        </div>
      </div>
    );
  }
}

export default MegaMenu;
