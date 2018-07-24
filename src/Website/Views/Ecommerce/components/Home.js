import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Row, Col } from "reactstrap";

import ProductList from "./ProductList";
import Filters from "./Filters";
import MegaMenu from "./MegaMenu";
import EcommerceMainNav from "./EcommerceMainNav";
import ChildCategories from "./ChildCategories";
import Breadcrumbs from "./Breadcrumbs";
import banner from "../../../../static/img/ebanner.jpg";

import {
  onCategoriesList,
  onActiveCategoryChange,
  onFilterParametersChangeProductsList
} from "../actions";

class Home extends Component {
  componentDidMount() {
    const { categoryId } = this.props.match.params;
    if (categoryId) {
      this.props.onActiveCategoryChange({
        categoryId,
        history: this.props.history
      });
    }
    this.props.onCategoriesList({
      changeActive: !Boolean(categoryId),
      history: this.props.history
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.categoryId !== this.props.match.params.categoryId
    ) {
      const isCategoryId = Boolean(this.props.match.params.categoryId);
      if (isCategoryId) {
        this.props.onActiveCategoryChange({
          categoryId: this.props.match.params.categoryId,
          history: this.props.history
        });
      } else {
        this.props.onCategoriesList({
          changeActive: !isCategoryId,
          history: this.props.history
        });
      }
    }
  }

  onSelectCategory = categoryId =>
    this.props.history.push(
      `${this.props.ECOMMERCE_URL || "/ecommerce/"}${categoryId}`
    );

  onSelectProduct = productId =>
    this.props.history.push(
      `${this.props.ECOMMERCE_URL || "/ecommerce/"}product/${productId}`
    );

  handleFilterChange = data => {
    const contains = this.props.filters.find(x => x.name === data.name);
    let filters = [...this.props.filters.filter(x => x.name !== data.name)];
    if (contains) {
      if (["Choices", "MultipleChoices"].includes(data.fieldType)) {
        if (data.data.length) filters.push(data);
      } else {
        filters.push(data);
      }
    } else {
      filters.push(data);
    }
    this.props.onFilterParametersChangeProductsList({ filters });
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: "rgba(247, 237, 237, 0.32)"
        }}
      >
        {!this.props.accessFromOutside && (
          <EcommerceMainNav
            history={this.props.history}
            cookies={this.props.cookies}
            categories={this.props.categories}
            onSelect={this.onSelectCategory}
            isHome={!Boolean(this.props.match.params.categoryId)}
          />
        )}
        {this.props.breadcrumbs.length > 1 && (
          <Breadcrumbs
            className="ecommerce-bread-crumbs"
            items={this.props.breadcrumbs}
            onSelectCategory={this.onSelectCategory}
          />
        )}
        {!this.props.match.params.categoryId && (
          <Row
            style={{
              minHeight: "200px"
            }}
          >
            <Col xs="12" md="3" className="mr-0 pr-0">
              <MegaMenu
                categories={this.props.categories}
                onSelect={this.onSelectCategory}
              />
            </Col>
            <Col
              md="9"
              className="hidden-xs-down ml-0"
              style={{
                backgroundImage: `url(${banner})`
              }}
            />
          </Row>
        )}
        <Container fluid className="mt-3 mb-3 mr-2">
          <Row>
            <Col xs="12" md="2">
              <Row>
                <Col xs="12">
                  {this.props.match.params.categoryId &&
                  this.props.childCategories.length ? (
                    <ChildCategories
                      categories={this.props.childCategories}
                      onSelectCategory={this.onSelectCategory}
                    />
                  ) : (
                    ""
                  )}
                </Col>
                <Col xs="12">
                  <Filters
                    filters={this.props.filterAttributes}
                    // selectedFilters={this.props.filters}
                    handleFilterChange={this.handleFilterChange}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs="12" md="10">
              <ProductList
                priceFilter={this.props.filterAttributes.find(
                  x => x.name === "price"
                )}
                products={this.props.products}
                productCount={this.props.productCount}
                activePage={
                  this.props.productFromIndex / this.props.productPerPage + 1
                }
                totalPages={Math.ceil(
                  this.props.productCount / this.props.productPerPage
                )}
                onSelectProduct={this.onSelectProduct}
                handlePaginationChange={(_, { activePage }) => {
                  this.props.onFilterParametersChangeProductsList({
                    frm: (activePage - 1) * this.props.productPerPage
                  });
                }}
                handleFilterChange={this.handleFilterChange}
                handleSortChange={({ sortby, desc }) => {
                  this.props.onFilterParametersChangeProductsList({
                    sortby,
                    desc
                  });
                }}
              />
            </Col>
          </Row>
        </Container>
        <Container fluid />
      </div>
    );
  }
}

export default connect(
  ({
    auth: { cookies },
    EcommerceContainer: {
      home: {
        categories,
        childCategories,
        filterAttributes,
        products,
        productCount,
        activeCategory,
        breadcrumbs
      },
      filterProducts: { frm: productFromIndex, size: productPerPage, filters }
    }
  }) => ({
    categories,
    childCategories,
    filterAttributes,
    products,
    productCount,
    activeCategory,
    breadcrumbs,
    productFromIndex,
    productPerPage,
    cookies,
    filters
  }),
  {
    onCategoriesList,
    onActiveCategoryChange,
    onFilterParametersChangeProductsList
  }
)(Home);
