import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";
import {
  SideTreeView,
  BreadcrumbNav,
  CategoryEditView,
  CategoryDetailView,
  PropertyList,
  PropertyItemAddNew
} from "./components/Admin";

import {
  onCategoriesList,
  onChangeActiveCategory,
  onCategorySubmit,
  openAllOnSearch,
  onCategoryUpdate,
  onCategoryDelete,
  onAttributesList,
  onPropertySubmit
} from "./actions";

class EcommerceAdmin extends Component {
  componentDidMount() {
    this.props.onCategoriesList();
    this.props.onAttributesList();
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
            {this.props.selectedCategoryDetail && (
              <div>
                <BreadcrumbNav
                  breadCrumbs={this.props.selectedCategoryDetail.breadCrumbs}
                  onChangeActiveCategory={this.props.onChangeActiveCategory}
                />
                <button
                  onClick={() =>
                    this.props.onCategoryDelete({
                      uid: this.props.selectedCategoryDetail.uid
                    })
                  }
                >
                  Delete
                </button>
                <CategoryEditView
                  onCategoryUpdate={this.props.onCategoryUpdate}
                  category={this.props.selectedCategoryDetail}
                />
                {!this.props.selectedCategoryDetail.hasProduct && (
                  <CategoryDetailView
                    name={this.props.selectedCategoryDetail.name}
                    onCategorySubmit={this.props.onCategorySubmit}
                  />
                )}
                <PropertyItemAddNew
                  activeCategory={this.props.activeCategory}
                  attributes={this.props.attributes}
                  onPropertySubmit={this.props.onPropertySubmit}
                />
                <PropertyList />
              </div>
            )}
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
        selectedCategoryDetail,
        attributes
      }
    }
  }) => ({
    categories,
    activeCategory,
    isOpenCategories,
    selectedCategoryDetail,
    attributes
  }),
  {
    onCategoriesList,
    onChangeActiveCategory,
    onCategorySubmit,
    openAllOnSearch,
    onCategoryUpdate,
    onCategoryDelete,
    onAttributesList,
    onPropertySubmit
  }
)(EcommerceAdmin);
