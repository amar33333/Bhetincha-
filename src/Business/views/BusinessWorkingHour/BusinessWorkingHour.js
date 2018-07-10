import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";

import {
  ToogleEDIT,
  onWorkingHourEdit,
  onWorkingHourList
} from "../../actions";

import SubBusinessWorkingHour from "../../../Admin/views/BusinessAdminDetail/SubBusinessWorkingHour";

class BusinessWorkingHour extends Component {
  componentDidMount() {
    this.props.ToogleEDIT(true);
    this.props.onWorkingHourList({
      id: this.props.cookies.user_data.business_id
    });
  }

  onInitialPropsReceived = () => this.props.ToogleEDIT(!this.props.EDIT);

  onFormEdit = event => {
    event.preventDefault();

    this.props.onWorkingHourEdit({
      body: {
        ...this.subBusinessWorkingHourRef.getState()
      },
      id: this.props.cookies.user_data.business_id,
      EDIT: this.props.EDIT
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <form onSubmit={this.onFormEdit}>
          <SubBusinessWorkingHour
            ref={ref => (this.subBusinessWorkingHourRef = ref)}
            workingHour={this.props.workingHour}
            alwaysOpen={this.props.alwaysOpen}
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
    business_reducer: { businessGet, EDIT, workingHour }
  },
  auth: { cookies }
}) => {
  return {
    businessGet,
    workingHour,
    EDIT,
    cookies
  };
};

export default connect(
  mapStateToProps,
  {
    ToogleEDIT,
    onWorkingHourEdit,
    onWorkingHourList
  }
)(BusinessWorkingHour);
