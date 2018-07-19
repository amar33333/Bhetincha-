import React, { Component } from "react";
import {
  Badge,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button,
  NavbarBrand,
  NavLink
} from "reactstrap";
import { Search, Grid, Header, Segment } from "semantic-ui-react";

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

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <Navbar
        expand="md"
        style={{
          backgroundColor: "white",
          borderBottom: "0.5px solid lightgray"
        }}
      >
        <NavbarBrand href="/">Bhetincha Shop</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
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
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                // onSearchChange={_.debounce(this.handleSearchChange, 500, {
                //   leading: true
                // })}
                results={results}
                value={value}
                {...this.props}
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
    );
  }
}

export default EcommerceMainNav;
