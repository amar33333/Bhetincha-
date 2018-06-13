import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";
import {
  SideTreeView,
  BreadcrumbNav,
  CategoryEditView,
  CategoryDetailView
} from "./components/Admin";

import {
  onCategoriesList,
  onChangeActiveCategory,
  onCategorySubmit,
  openAllOnSearch
} from "./actions";

class EcommerceAdmin extends Component {
  componentDidMount() {
    this.props.onCategoriesList();
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs="12" md="3">
            <SideTreeView
              categories={this.props.categories}
              activeCategory={this.props.activeCategory}
              onChangeActiveCategory={this.props.onChangeActiveCategory}
              isOpen={this.props.isOpenCategories}
              openAllOnSearch={this.props.openAllOnSearch}
            />
          </Col>
          <Col xs="12" md="9">
            <BreadcrumbNav
              category={this.props.selectedCategoryDetail}
              onChangeActiveCategory={this.props.onChangeActiveCategory}
            />
            <CategoryEditView
              onCategorySubmit={this.props.onCategorySubmit}
              category={this.props.selectedCategoryDetail}
            />
            <CategoryDetailView
              onCategorySubmit={this.props.onCategorySubmit}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(
  ({
    EcommerceContainer: {
      admin: {
        categories,
        activeCategory,
        isOpenCategories,
        selectedCategoryDetail
      }
    }
  }) => ({
    categories,
    activeCategory,
    isOpenCategories,
    selectedCategoryDetail
  }),
  {
    onCategoriesList,
    onChangeActiveCategory,
    onCategorySubmit,
    openAllOnSearch
  }
)(EcommerceAdmin);
