import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Input,
  FormGroup,
  Label,
  Card,
  CardHeader,
  CardBody,
  Button
} from "reactstrap";

import {
  onCategoriesListEcommerce,
  onIndustryList,
  onIndustryEachList,
  onCategoryDetail,
  onCategoryAssignEcommerce
} from "../../actions";
import { Select } from "../../../Common/components";

class AssignCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndustry: "",
      selectedCategory: "",
      selectedEcommerceCategories: []
    };
  }

  componentDidMount() {
    this.props.onCategoriesListEcommerce(true);
    this.props.onIndustryList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      if (this.props.category.ecommerce_categories) {
        this.setState({
          selectedEcommerceCategories: this.props.category.ecommerce_categories
        });
      }
    }
  }

  onAssigned = () => {
    if (
      this.props.category.ecommerce_categories.sort().join() !==
      this.state.selectedEcommerceCategories.sort().join()
    ) {
      this.props.onCategoryAssignEcommerce({
        ecommerce_categories: this.state.selectedEcommerceCategories,
        id: this.state.selectedCategory.id
      });
    }
  };

  render() {
    const { ecommerceCategories } = this.props;

    return (
      <div>
        <Row>
          <Col>
            <Card>
              <CardHeader>Select Industry</CardHeader>
              <CardBody>
                <Select
                  options={this.props.industries}
                  isLoading={this.props.fetchLoadingIndustry}
                  labelKey="name"
                  valueKey="id"
                  value={this.state.selectedIndustry}
                  onChange={selectedIndustry => {
                    this.setState({ selectedIndustry, selectedCategory: "" });
                    selectedIndustry &&
                      this.props.onIndustryEachList({
                        id: selectedIndustry.id
                      });
                  }}
                />
              </CardBody>
            </Card>
            <Card>
              <CardHeader>Select Category</CardHeader>
              <CardBody>
                {this.state.selectedIndustry ? (
                  <Select
                    options={this.props.partialCategories}
                    isLoading={this.props.fetchLoadingCategory}
                    labelKey="name"
                    valueKey="id"
                    value={this.state.selectedCategory}
                    onChange={selectedCategory => {
                      this.setState({ selectedCategory });
                      selectedCategory &&
                        this.props.onCategoryDetail({
                          id: selectedCategory.id
                        });
                    }}
                  />
                ) : (
                  <p>Select Industry to view Categories</p>
                )}
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardHeader>Assign Ecommerce Categories</CardHeader>
              <CardBody>
                <div>
                  {ecommerceCategories.children &&
                    ecommerceCategories.children.map(ecommerceCategory => (
                      <div key={ecommerceCategory.uid}>
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="checkbox"
                              disabled={
                                this.props.loading ||
                                !this.state.selectedCategory
                              }
                              checked={this.state.selectedEcommerceCategories.includes(
                                ecommerceCategory.uid
                              )}
                              onChange={e => {
                                const checked = e.target.checked;
                                this.setState({
                                  selectedEcommerceCategories: checked
                                    ? [
                                        ...this.state
                                          .selectedEcommerceCategories,
                                        ecommerceCategory.uid
                                      ]
                                    : this.state.selectedEcommerceCategories.filter(
                                        x => x !== ecommerceCategory.uid
                                      )
                                });
                              }}
                            />{" "}
                            {ecommerceCategory.name}
                          </Label>
                        </FormGroup>
                      </div>
                    ))}
                  <Button
                    color="primary"
                    disabled={
                      this.props.loading ||
                      !this.state.selectedCategory ||
                      (this.props.category &&
                        this.props.category.ecommerce_categories &&
                        this.props.category.ecommerce_categories
                          .sort()
                          .join() ===
                          this.state.selectedEcommerceCategories.sort().join())
                    }
                    onClick={this.onAssigned}
                  >
                    Submit
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: {
      ecommerce: { categories: ecommerceCategories },
      industries: {
        fetchLoading: fetchLoadingIndustry,
        fetchLoadingData: fetchLoadingCategory,
        industries,
        industriesData: partialCategories
      },
      categories: { detailLoading: loading, category }
    }
  }) => ({
    ecommerceCategories,
    fetchLoadingCategory,
    fetchLoadingIndustry,
    industries,
    partialCategories,
    loading,
    category
  }),
  {
    onCategoriesListEcommerce,
    onIndustryList,
    onIndustryEachList,
    onCategoryDetail,
    onCategoryAssignEcommerce
  }
)(AssignCategories);
