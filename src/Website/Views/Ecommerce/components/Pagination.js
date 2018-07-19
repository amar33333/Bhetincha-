import React, { Component } from "react";
import { Pagination } from "semantic-ui-react";

class PaginationComponent extends Component {
  state = {
    activePage: 1,
    boundaryRange: 1,
    siblingRange: 1,
    showEllipsis: true,
    showFirstAndLastNav: true,
    showPreviousAndNextNav: true,
    // totalPages: this.props.productCount
    totalPages: 10
  };

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage });
  render() {
    const {
      activePage,
      boundaryRange,
      siblingRange,
      showEllipsis,
      showFirstAndLastNav,
      showPreviousAndNextNav,
      totalPages
    } = this.state;
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
