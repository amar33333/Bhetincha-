import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";

import {
  SideTreeView,
  BreadcrumbNav,
  CategoryDetailView,
  CategoryEditView,
  PropertyItemAddNew,
  PropertyList
} from "./components";

import { PopoverDelete } from "../../../Common/components";
import {
  onCategoriesListEcommerce,
  onChangeActiveCategoryEcommerce,
  onCategorySubmitEcommerce,
  openAllOnSearchEcommerce,
  onCategoryUpdateEcommerce,
  onCategoryDeleteEcommerce,
  onAttributesListEcommerce,
  onPropertySubmitEcommerce,
  onPropertyRemoveEcommerce
} from "../../actions";

class ManageCategories extends Component {
  componentDidMount() {
    this.props.onCategoriesListEcommerce();
    this.props.onAttributesListEcommerce();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Container fluid>
          <Row>
            <Col xs="12" md="3">
              <SideTreeView
                categories={this.props.categories}
                activeCategory={this.props.activeCategory}
                onChangeActiveCategory={
                  this.props.onChangeActiveCategoryEcommerce
                }
                isOpen={this.props.isOpenCategories}
                openAllOnSearch={this.props.openAllOnSearch}
              />
            </Col>
            <Col xs="12" md="9">
              {this.props.selectedCategoryDetail && (
                <div>
                  <BreadcrumbNav
                    breadCrumbs={this.props.selectedCategoryDetail.breadCrumbs}
                    onChangeActiveCategory={
                      this.props.onChangeActiveCategoryEcommerce
                    }
                  />
                  <PopoverDelete
                    onClick={() =>
                      this.props.onCategoryDeleteEcommerce({
                        uid: this.props.selectedCategoryDetail.uid
                      })
                    }
                  />
                  <CategoryEditView
                    onCategoryUpdate={this.props.onCategoryUpdateEcommerce}
                    category={this.props.selectedCategoryDetail}
                  />
                  {!this.props.selectedCategoryDetail.hasProduct && (
                    <CategoryDetailView
                      name={this.props.selectedCategoryDetail.name}
                      onCategorySubmit={this.props.onCategorySubmitEcommerce}
                    />
                  )}
                  <PropertyItemAddNew
                    loading={this.props.propertyLoading}
                    error={this.props.propertyError}
                    activeCategory={this.props.activeCategory}
                    attributes={this.props.attributes}
                    onPropertySubmit={this.props.onPropertySubmitEcommerce}
                  />
                  <PropertyList
                    category={this.props.selectedCategoryDetail}
                    onPropertyRemove={this.props.onPropertyRemoveEcommerce}
                  />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: {
      ecommerce: {
        categories,
        activeCategory,
        isOpenCategories,
        selectedCategoryDetail,
        attributes,
        propertyLoading,
        propertyError
      }
    }
  }) => ({
    categories,
    activeCategory,
    isOpenCategories,
    selectedCategoryDetail,
    attributes,
    propertyError,
    propertyLoading
  }),
  {
    onCategoriesListEcommerce,
    onChangeActiveCategoryEcommerce,
    onCategorySubmitEcommerce,
    openAllOnSearchEcommerce,
    onCategoryUpdateEcommerce,
    onCategoryDeleteEcommerce,
    onAttributesListEcommerce,
    onPropertySubmitEcommerce,
    onPropertyRemoveEcommerce
  }
)(ManageCategories);
