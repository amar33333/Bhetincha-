import React, { Component } from "react";
import { connect } from "react-redux";
import slugify from "slugify";
import { toast } from "react-toastify";

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Button,
  Input
} from "reactstrap";
import { onSlugEdit, onSlugCheckSubmit } from "../../actions";

class BusinessAbout extends Component {
  state = { user_input: "", slug: "" };

  componentDidMount() {
    this.setState(
      {
        user_input: this.props.match.params.businessName,
        slug: slugify(this.props.match.params.businessName)
      },
      () => {
        this.props.onSlugCheckSubmit({ slug: this.state.slug });
      }
    );
  }

  onChange = event => {
    const val = event.target.value;

    this.setState(
      {
        user_input: val,
        slug: slugify(val)
      },
      () => {
        this.props.onSlugCheckSubmit({ slug: this.state.slug });
      }
    );
  };

  onSlugAvailable = () => {
    if (this.props.slugAvailable)
      return <p style={{ color: "green" }}> Slug Available </p>;
    else return <p style={{ color: "red" }}> Slug Not Available </p>;
  };

  onFormSubmit = event => {
    event.preventDefault();

    if (this.state.slug !== this.props.match.params.businessName)
      this.props.onSlugEdit({ slug: this.state.slug });
    else toast.error("Previous Slug Cannot be Sent");
  };

  render() {
    return (
      <div className="animated fadeIn">
        <form onSubmit={this.onFormSubmit}>
          <Row className="justify-content-center">
            <Col xs="12" md="6">
              <Card>
                <CardHeader>
                  <strong>Change Slug</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label htmlFor="Slug">Change Slug</Label>
                        <Input
                          id="slug"
                          type="text"
                          value={this.state.user_input}
                          onChange={this.onChange}
                        />
                      </FormGroup>
                      {this.onSlugAvailable()}
                    </Col>
                    <Col xs="12">
                      <FormGroup>
                        Your New Slug :
                        <Input
                          disabled
                          value={this.state.slug}
                          className="Slugged"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="12">
                      <Button
                        color="primary"
                        size="lg"
                        style={{ marginRight: 20 }}
                      >
                        CHANGE
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({
  BusinessContainer: {
    business_reducer: { slugAvailable }
  }
}) => ({
  slugAvailable
});

export default connect(
  mapStateToProps,
  {
    onSlugEdit,
    onSlugCheckSubmit
  }
)(BusinessAbout);
