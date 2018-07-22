import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Dropdown, Search, Icon } from "semantic-ui-react";

import MegaMenu from "./MegaMenu";

class EcommerceMainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });
  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  componentDidUpdate() {
    console.log("updates", this.props.isHome);
  }
  render() {
    const { isLoading, value, results } = this.state;
    return (
      <div
        style={{
          position: "relative"
        }}
      >
        <Navbar
          expand="md"
          style={{
            backgroundColor: "white",
            borderBottom: "0.5px solid lightgray"
          }}
        >
          {/* <NavbarBrand href="/">Bhetincha Shop</NavbarBrand> */}
          {/* <Icon
            name="bars"
            onMouseOver={e => this.handleTogglerHover(e)}
            onMouseLeave={e => this.handleTogglerHoverLeave(e)}
            style={{
              cursor: "pointer",
              marginRight: "20px"
            }}
          /> */}

          {!this.props.isHome && (
            <Dropdown
              className="ecommerce-nav__megamenu__dropdown"
              icon="bars"
              style={{
                cursor: "pointer",
                marginRight: "20px"
              }}
            >
              <Dropdown.Menu
                style={{
                  width: "100%"
                }}
              >
                <MegaMenu
                  categories={this.props.categories}
                  onSelect={this.props.onSelect}
                />
              </Dropdown.Menu>
            </Dropdown>
          )}

          <Link className="navbar-brand" to="/ecommerce">
            Bhetincha Shop{" "}
          </Link>

          <NavbarToggler
            onClick={this.toggle}
            style={{
              color: "gray"
            }}
          />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem
                style={{
                  minWidth: "350px"
                }}
              >
                <Search
                  className="mr-2 ecommerce-search-container"
                  fluid
                  // loading={isLoading}
                  // onResultSelect={this.handleResultSelect}
                  // // onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  // //   leading: true
                  // // })}
                  // results={results}
                  // value={value}
                  // {...this.props}
                />
              </NavItem>
              <NavItem>
                <NavLink>Need Help?</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>Your Account</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <i
                    className="fa fa-shopping-cart"
                    style={{ fontSize: "1.5rem" }}
                  />
                  <Badge
                    color="primary"
                    pill
                    style={{
                      fontSize: "0.6rem"
                    }}
                  >
                    2
                  </Badge>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        {/* {this.state.menuOpen ? (
          <div className="mega-menu__container__main_nav">
            <MegaMenu
              categories={this.props.categories}
              onSelect={this.onSelectCategory}
            />
          </div>
        ) : null} */}
      </div>
    );
  }
}

export default EcommerceMainNav;
