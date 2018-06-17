import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";
// import { Grid, Rail, Segment, Sticky } from "semantic-ui-react";

import {
  SideTreeView,
  BreadcrumbNav,
  CategoryEditView,
  CategoryDetailView,
  PropertyList,
  PropertyItemAddNew
} from "./components/Admin";

import { PopoverDelete } from "../../../Common/components";
import {
  onCategoriesList,
  onChangeActiveCategory,
  onCategorySubmit,
  openAllOnSearch,
  onCategoryUpdate,
  onCategoryDelete,
  onAttributesList,
  onPropertySubmit,
  onPropertyRemove
} from "./actions";

class EcommerceAdmin extends Component {
  // state = {};

  componentDidMount() {
    this.props.onCategoriesList();
    this.props.onAttributesList();
  }

  // handleContextRef = contextRef => this.setState({ contextRef });

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
                <PopoverDelete
                  onClick={() =>
                    this.props.onCategoryDelete({
                      uid: this.props.selectedCategoryDetail.uid
                    })
                  }
                />
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
                  loading={this.props.propertyLoading}
                  error={this.props.propertyError}
                  activeCategory={this.props.activeCategory}
                  attributes={this.props.attributes}
                  onPropertySubmit={this.props.onPropertySubmit}
                />
                <PropertyList
                  category={this.props.selectedCategoryDetail}
                  onPropertyRemove={this.props.onPropertyRemove}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    );

    // const { contextRef } = this.state;
    // return (
    //   <Grid centered columns={3}>
    //     <Grid.Column>
    //       <div ref={this.handleContextRef}>
    //         <Segment>
    //           {this.props.selectedCategoryDetail && (
    //             <div>
    //               <BreadcrumbNav
    //                 breadCrumbs={this.props.selectedCategoryDetail.breadCrumbs}
    //                 onChangeActiveCategory={this.props.onChangeActiveCategory}
    //               />
    //               <PopoverDelete
    //                 onClick={() =>
    //                   this.props.onCategoryDelete({
    //                     uid: this.props.selectedCategoryDetail.uid
    //                   })
    //                 }
    //               />
    //               <CategoryEditView
    //                 onCategoryUpdate={this.props.onCategoryUpdate}
    //                 category={this.props.selectedCategoryDetail}
    //               />
    //               {!this.props.selectedCategoryDetail.hasProduct && (
    //                 <CategoryDetailView
    //                   name={this.props.selectedCategoryDetail.name}
    //                   onCategorySubmit={this.props.onCategorySubmit}
    //                 />
    //               )}
    //               <PropertyItemAddNew
    //                 activeCategory={this.props.activeCategory}
    //                 attributes={this.props.attributes}
    //                 onPropertySubmit={this.props.onPropertySubmit}
    //               />
    //               <PropertyList category={this.props.selectedCategoryDetail} />
    //             </div>
    //           )}
    //           <Rail position="left">
    //             <Sticky context={contextRef}>
    //               <SideTreeView
    //                 categories={this.props.categories}
    //                 activeCategory={this.props.activeCategory}
    //                 onChangeActiveCategory={this.props.onChangeActiveCategory}
    //                 isOpen={this.props.isOpenCategories}
    //                 openAllOnSearch={this.props.openAllOnSearch}
    //               />
    //             </Sticky>
    //           </Rail>
    //           <Rail position="right">
    //             <Sticky context={contextRef}>
    //               <div>stuck</div>
    //             </Sticky>
    //           </Rail>
    //         </Segment>
    //       </div>
    //     </Grid.Column>
    //   </Grid>
    // );
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
    onCategoriesList,
    onChangeActiveCategory,
    onCategorySubmit,
    openAllOnSearch,
    onCategoryUpdate,
    onCategoryDelete,
    onAttributesList,
    onPropertySubmit,
    onPropertyRemove
  }
)(EcommerceAdmin);
