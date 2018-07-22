import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Row, Col } from "reactstrap";

import ProductList from "./ProductList";
import PaginationComponent from "./Pagination";
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
    this.props.history.push(`/ecommerce/${categoryId}`);

  onSelectProduct = productId =>
    this.props.history.push(`/ecommerce/product/${productId}`);

  render() {
    return (
      <div
        style={{
          backgroundColor: "rgba(247, 237, 237, 0.32)"
        }}
      >
        <EcommerceMainNav
          history={this.props.history}
          cookies={this.props.cookies}
          categories={this.props.categories}
          onSelect={this.onSelectCategory}
          isHome={!Boolean(this.props.match.params.categoryId)}
        />
        {this.props.breadcrumbs.length > 1 && (
          <Breadcrumbs
            className="ecommerce-bread-crumbs"
            items={this.props.breadcrumbs}
            onSelectCategory={this.onSelectCategory}
          />
        )}
        {!this.props.match.params.categoryId && (
          <Row>
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
                  <Filters filters={this.props.filterAttributes} />
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
      filterProducts: { frm: productFromIndex, size: productPerPage }
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
    cookies
  }),
  {
    onCategoriesList,
    onActiveCategoryChange,
    onFilterParametersChangeProductsList
  }
)(Home);
