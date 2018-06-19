import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";

import {
  SideTreeView,
  BreadcrumbNav
} from "../../../Admin/views/Ecommerce/components";
import { ProductAddNew } from "./components";
import {
  onCategoriesListEcommerce,
  onChangeActiveCategoryEcommerce,
  openAllOnSearchEcommerce
} from "../../actions";

class ManageProducts extends Component {
  componentDidMount() {
    this.props.onCategoriesListEcommerce();
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
                openAllOnSearch={this.props.openAllOnSearchEcommerce}
                leafDetect={true}
              />
            </Col>
            <Col xs="12" md="9">
              {this.props.attributes && (
                <BreadcrumbNav
                  breadCrumbs={this.props.attributes.breadCrumbs}
                  onChangeActiveCategory={
                    this.props.onChangeActiveCategoryEcommerce
                  }
                />
              )}
              {this.props.attributes && (
                <ProductAddNew attributes={this.props.attributes.attributes} />
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
    BusinessContainer: {
      ecommerce: { categories, activeCategory, isOpenCategories, attributes }
    }
  }) => ({ categories, activeCategory, isOpenCategories, attributes }),
  {
    onCategoriesListEcommerce,
    onChangeActiveCategoryEcommerce,
    openAllOnSearchEcommerce
  }
)(ManageProducts);
