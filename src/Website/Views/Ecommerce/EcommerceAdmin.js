import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";
import { Grid, Rail, Segment, Sticky } from "semantic-ui-react";

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
  onPropertySubmit
} from "./actions";

class EcommerceAdmin extends Component {
  state = {};

  componentDidMount() {
    this.props.onCategoriesList();
    this.props.onAttributesList();
  }

  handleContextRef = contextRef => this.setState({ contextRef });

  render() {
    const { contextRef } = this.state;
    // return (
    //   <Grid centered columns={3}>
    //     <Grid.Column>
    //       <div ref={this.handleContextRef}>
    //         <Segment>
    //           {_.times(10, i => <Placeholder key={i} />)}

    //           <Rail position='left'>
    //             {_.times(3, i => <Placeholder key={i} />)}

    //             <Sticky context={contextRef}>
    //               <Header as='h3'>Stuck Content</Header>
    //               <Image src='/assets/images/wireframe/image.png' />
    //             </Sticky>
    //           </Rail>

    //           <Rail position='right'>
    //             <Sticky context={contextRef}>
    //               <Header as='h3'>Stuck Content</Header>
    //               <Image src='/assets/images/wireframe/image.png' />
    //             </Sticky>
    //           </Rail>
    //         </Segment>
    //       </div>
    //     </Grid.Column>
    //   </Grid>
    // )
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
                  activeCategory={this.props.activeCategory}
                  attributes={this.props.attributes}
                  onPropertySubmit={this.props.onPropertySubmit}
                />
                <PropertyList category={this.props.selectedCategoryDetail} />
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
