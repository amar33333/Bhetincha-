import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";

import {
  SideTreeView,
  BreadcrumbNav
} from "../../../Admin/views/Exsection/components";

//import { ProductAddNew, ProductsList } from "./components";

//import {
//   onCategoriesListEcommerce,
//   onChangeActiveCategoryEcommerce,
//   openAllOnSearchEcommerce,
//   onCreateEcommerceProduct
// } from "../../actions";

import {
  onSectionsListExsection
  //onChangeActiveSectionExsection
  //   openAllOnSearchEcommerce,
  //   onCreateEcommerceProduct
} from "../../actions";

// render() {
//   return (
//     <div className="animated fadeIn">
//       <Container fluid>
//         <Row>
//           <Col xs="12" md="3">
//             <SideTreeView
//               categories={this.props.categories}
//               activeCategory={this.props.activeCategory}
//               onChangeActiveCategory={
//                 this.props.onChangeActiveCategoryEcommerce
//               }
//               isOpen={this.props.isOpenCategories}
//               openAllOnSearch={this.props.openAllOnSearchEcommerce}
//               leafDetect={true}
//             />
//           </Col>
//           <Col xs="12" md="9">
//             {this.props.selectedCategoryDetail && (
//               <div>
//                 <BreadcrumbNav
//                   breadCrumbs={this.props.selectedCategoryDetail.breadCrumbs}
//                   onChangeActiveCategory={
//                     this.props.onChangeActiveCategoryEcommerce
//                   }
//                 />
//                 <ProductsList
//                   products={this.props.selectedCategoryDetail.products}
//                   URL={`/${
//                     this.props.match.params.businessName
//                   }/dashboard/ecommerce/manage-products`}
//                 />
//               </div>
//             )}
//             {this.props.attributes &&
//               this.props.attributes.attributes &&
//               this.props.selectedCategoryDetail &&
//               this.props.selectedCategoryDetail.hasProduct && (
//                 <ProductAddNew
//                   attributes={this.props.attributes.attributes}
//                   onSubmit={this.props.onCreateEcommerceProduct}
//                   loading={this.props.productLoading}
//                   error={this.props.productError}
//                 />
//               )}
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

class ManageSections extends Component {
  componentDidMount() {
    this.props.onSectionsListExsection();
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Container fluid>
          <Row>
            <Col xs="12" md="3">
              <SideTreeView
                sections={this.props.sections} //categories
                activeSection={this.props.activeSection} //activeCategory
                // onChangeActiveSection={
                // this.props.onChangeActiveSectionExsection
                //}
                isOpen={this.props.isOpenSections} //isOpenCategories
              />
            </Col>
            <Col xs="12" md="9" />
          </Row>
        </Container>
      </div>
    );
  }
}

//export default ManageSections;

// export default connect(
//   ({
//     BusinessContainer: {
//       ecommerce: {
//         categories,
//         activeCategory,
//         isOpenCategories,
//         attributes,
//         selectedCategoryDetail,
//         productLoading,
//         productError
//       }
//     }
//   }) => ({
//     categories,
//     activeCategory,
//     isOpenCategories,
//     attributes,
//     selectedCategoryDetail,
//     productLoading,
//     productError
//   }),
//   {
//     onCategoriesListEcommerce,
//     onChangeActiveCategoryEcommerce,
//     openAllOnSearchEcommerce,
//     onCreateEcommerceProduct
//   }
// )(ManageProducts);

export default connect(
  ({
    BusinessContainer: {
      exsection: {
        sections,
        activeSection,
        isOpenSections,
        selectedSectionDetail,
        attributes
      }
    }
  }) => ({
    sections,
    activeSection,
    isOpenSections,
    selectedSectionDetail,
    attributes
  }),
  {
    onSectionsListExsection
    //onChangeActiveSectionExsection
  }
)(ManageSections);
