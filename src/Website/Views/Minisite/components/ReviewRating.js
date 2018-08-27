import React, { Component } from "react";
import {
  Input,
  Button,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";

import Rating from "react-rating";

class ReviewRating extends Component {
  state = { rating: 0, review: "" };

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value
    });

  onRatingChange = rating => this.setState({ rating });

  onFormSubmit = event => {
    event.preventDefault();

    const { rating, review } = this.state;

    (rating || review) &&
      this.props.onReviewRatingSubmit({
        id: this.props.slug,
        body: {
          review_type: "review",
          data: {
            reviewed_by: this.props.reviewedBy,
            rating,
            review
          }
        }
      });
  };

  render() {
    console.log(this.state);
    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="6">
            {/* <PermissionProvider permission="CAN_ADD_INDUSTRY"> */}
            <Card>
              <CardHeader>
                <strong>Review & Rating</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit}>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label>Rating</Label>
                        <Rating
                          className="mb-2 business-rating-component"
                          fractions={2}
                          initialRating={0}
                          emptySymbol="fa fa-star-o fa-1x"
                          fullSymbol="fa fa-star fa-1x"
                          //onChange={this.onRatingChange}
                        />{" "}
                        (10 Ratings)
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label>Review</Label>
                        <Input
                          type="textarea"
                          value={this.state.review}
                          placeholder="Type Your Review"
                          onChange={this.onChange.bind(this, "review")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        color="primary"
                        disabled={this.props.placeholderLoading}
                      >
                        <span className="fa fa-plus" /> Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ReviewRating;
