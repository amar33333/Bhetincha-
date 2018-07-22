import React, { Component } from "react";
import { Pagination } from "semantic-ui-react";

class PaginationComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // activePage: props.activePage,
      boundaryRange: 1,
      siblingRange: 1,
      showEllipsis: true,
      showFirstAndLastNav: true,
      showPreviousAndNextNav: true
      // totalPages: this.props.productCount
      // totalPages: props.totalPages
    };
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage });

  render() {
    const {
      boundaryRange,
      siblingRange,
      showEllipsis,
      showFirstAndLastNav,
      showPreviousAndNextNav
    } = this.state;
    // const { activePage, totalPages, handlePaginationChange } = this.props;

    const activePage = 1;
    const totalPages = 10;
    return (
      <Pagination
        id="page"
        activePage={activePage}
        boundaryRange={boundaryRange}
        onPageChange={this.handlePaginationChange}
        size="mini"
        siblingRange={siblingRange}
        totalPages={totalPages}
        // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
        // ellipsisItem={showEllipsis ? undefined : null}
        // firstItem={showFirstAndLastNav ? undefined : null}
        // lastItem={showFirstAndLastNav ? undefined : null}
        // prevItem={showPreviousAndNextNav ? undefined : null}
        // nextItem={showPreviousAndNextNav ? undefined : null}
      />
    );
  }
}

export default PaginationComponent;
