import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";

import SubBusinessAbout from "../../../Admin/views/BusinessAdminDetail/SubBusinessAbout";

import {
  ToogleEDIT,
  onAboutEdit,
  onAboutList,
  onCompanyTypeList
} from "../../actions";

class BusinessAbout extends Component {
  componentDidMount() {
    this.props.ToogleEDIT(true);
    this.props.onAboutList({ id: this.props.cookies.user_data.business_id });
    this.props.onCompanyTypeList();
  }

  onInitialPropsReceived = () => this.props.ToogleEDIT(!this.props.EDIT);

  onFormEdit = event => {
    event.preventDefault();

    console.log("about sumbit: ", {
      ...this.subBusinessAboutRef.getState()
    });

    this.props.onAboutEdit({
      body: {
        ...this.subBusinessAboutRef.getState()
      },
      id: this.props.cookies.user_data.business_id,
      EDIT: this.props.EDIT
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <form onSubmit={this.onFormEdit}>
          <SubBusinessAbout
            ref={ref => (this.subBusinessAboutRef = ref)}
            about={this.props.about}
            company_types={this.props.company_types}
            businessGet={this.props.businessGet}
            onInitialPropsReceived={this.onInitialPropsReceived}
            EDIT={this.props.EDIT}
          />
          <Row>
            <Col xs="12">
              <Button color="primary" size="lg" style={{ marginRight: 20 }}>
                SAVE
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({
  BusinessContainer: {
    business_reducer: { businessGet, EDIT, company_types, about }
  },
  auth: { cookies }
}) => {
  return {
    businessGet,
    company_types,
    about,
    EDIT,
    cookies
  };
};

export default connect(
  mapStateToProps,
  {
    ToogleEDIT,
    onAboutEdit,
    onAboutList,
    onCompanyTypeList
  }
)(BusinessAbout);
