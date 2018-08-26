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
  onPropertyUpdateEcommerce,
  onPropertyRemoveEcommerce
} from "../../actions";

class ManageCategories extends Component {
  componentDidMount() {
    this.props.onCategoriesListEcommerce(
      this.props.match.params.categoryId,
      this.routeToManageCategories
    );
    this.props.onAttributesListEcommerce();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.categoryId !== prevProps.match.params.categoryId
    ) {
      if (!this.props.match.params.categoryId) {
        this.props.onCategoriesListEcommerce(
          this.props.match.params.categoryId,
          this.routeToManageCategories
        );
      } else {
        this.props.onChangeActiveCategoryEcommerce(
          this.props.match.params.categoryId,
          prevProps.match.params.categoryId,
          this.routeToManageCategories
        );
      }
    }
  }

  routeToManageCategories = () => {
    this.props.history.push(`/admin/ecommerce/manage-categories`);
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Container fluid>
          <Row>
            <Col xs="12" md="4">
              <SideTreeView
                categories={this.props.categories}
                activeCategory={this.props.activeCategory}
                onChangeActiveCategory={
                  // this.props.onChangeActiveCategoryEcommerce
                  uid => {
                    if (this.props.match.params.categoryId !== uid) {
                      this.props.history.push(
                        `/admin/ecommerce/manage-categories/${uid}`
                      );
                    } else {
                      this.props.onChangeActiveCategoryEcommerce(
                        uid,
                        this.props.match.params.categoryId,
                        this.routeToManageCategories,
                        true
                      );
                    }
                  }
                }
                isOpen={this.props.isOpenCategories}
                openAllOnSearch={this.props.openAllOnSearchEcommerce}
              />
            </Col>
            <Col xs="12" md="8">
              {this.props.selectedCategoryDetail && (
                <div>
                  <BreadcrumbNav
                    breadCrumbs={this.props.selectedCategoryDetail.breadCrumbs}
                    onChangeActiveCategory={
                      // this.props.onChangeActiveCategoryEcommerce
                      uid =>
                        this.props.history.push(
                          `/admin/ecommerce/manage-categories/${uid}`
                        )
                    }
                  />
                  {this.props.activeCategory &&
                    this.props.categories &&
                    this.props.categories.uid !== this.props.activeCategory && (
                      <div>
                        <PopoverDelete
                          onClick={() =>
                            this.props.onCategoryDeleteEcommerce({
                              uid: this.props.selectedCategoryDetail.uid
                            })
                          }
                        />
                        <CategoryEditView
                          onCategoryUpdate={
                            this.props.onCategoryUpdateEcommerce
                          }
                          category={this.props.selectedCategoryDetail}
                        />
                      </div>
                    )}
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
                    activeCategory={this.props.activeCategory}
                    onPropertyUpdate={this.props.onPropertyUpdateEcommerce}
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
    onPropertyUpdateEcommerce,
    onPropertyRemoveEcommerce
  }
)(ManageCategories);
