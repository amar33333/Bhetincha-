import React, { Component } from "react";
import { toast } from "react-toastify";

import MapComponent from "../../../Common/components/MapComponent";

import Select from "react-select";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

import {
  Button,
  Card,
  CardHeader,
  Row,
  Col,
  CardBody,
  Input,
  Label,
  FormGroup,
  Collapse
} from "reactstrap";

import { connect } from "react-redux";
import SubBusinessContact from "../../../Admin/views/BusinessAdminDetail/SubBusinessContact";

import {
  onAddressTreeList,
  onCountryList,
  onBranchAdd,
  onBranchEdit,
  onBranchAddressList,
  onUnmountBranch,
  ToogleEDIT
} from "../../actions";

import { validateEmail, ErrorHandling } from "../../../Common/utils/Extras";

class AddBranch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address_title: "",
      country: "",
      state: "",
      district: "",
      city: "",
      area: "",
      email: "",
      landlineNumber: "",
      otherLandlineNumber: [],
      house_no: "",
      landmark: "",
      addressLine1: "",
      addressLine2: "",
      po_box: "",
      tollFreeNumber: "",
      latitude: 27.7172453,
      longitude: 85.32391758465576,
      contactPerson: [],
      email_validation_error: false,
      address_title_error: false
    };

    this.countries = [];
    this.states = [];
    this.districts = [];
    this.cities = [];
    this.areas = [];

    this.propsData = {};
  }

  componentDidMount() {
    this.props.onCountryList();
    const {
      id: branch_id,
      businessName: business_slug
    } = this.props.match.params;

    if (branch_id) {
      this.props.ToogleEDIT(true);

      this.props.onBranchAddressList({
        branch_id,
        business_slug,
        access_token: this.props.access_token
      });
    }
  }

  componentWillUnmount() {
    this.props.onUnmountBranch();
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { branch } = nextProps;
    if (branch && nextProps.EDIT) {
      nextProps.ToogleEDIT(!nextProps.EDIT);

      return {
        address_title: branch.address_title ? branch.address_title : "",
        contactPerson: branch.contactPerson ? branch.contactPerson : [],
        landlineNumber: branch.landlineNumber ? branch.landlineNumber : "",
        otherLandlineNumber: branch.otherLandlineNumber
          ? branch.otherLandlineNumber
          : [],
        house_no: branch.house_no ? branch.house_no : "",
        landmark: branch.landmark ? branch.landmark : "",
        addressLine1: branch.addressLine1 ? branch.addressLine1 : "",
        addressLine2: branch.addressLine2 ? branch.addressLine2 : "",
        po_box: branch.po_box ? branch.po_box : "",
        tollFreeNumber: branch.tollFreeNumber ? branch.tollFreeNumber : "",
        email: branch.email ? branch.email : "",
        latitude: branch.latitude ? branch.latitude : 27.7172453,
        longitude: branch.longitude ? branch.longitude : 85.32391758465576,
        country: {
          id: branch.country ? branch.country.id : "",
          name: branch.country ? branch.country.name : ""
        },
        state: {
          id: branch.state ? branch.state.id : "",
          name: branch.state ? branch.state.name : ""
        },
        district: {
          id: branch.district ? branch.district.id : "",
          name: branch.district ? branch.district.name : ""
        },
        city: {
          id: branch.city ? branch.city.id : "",
          name: branch.city ? branch.city.name : ""
        },
        area: {
          id: branch.area ? branch.area.id : "",
          name: branch.area ? branch.area.name : ""
        }
      };
    } else {
      return null;
    }
  };

  onChange = (key, event) => {
    const val = event.target.value;

    if (key === "addressLine1" || key === "addressLine2") {
      this.setState({
        [key]: val.replace(/\b\w/g, l => l.toUpperCase())
      });
    } else if (key === "email") {
      this.setState({ [key]: val === "" ? null : val }, () => {
        if (this.state.email && !validateEmail(this.state.email)) {
          this.setState({ email_validation_error: true });
        } else this.setState({ email_validation_error: false });
      });
    } else {
      this.setState({ [key]: val });
    }
  };

  displayEmailValidationInfo = () => {
    if (this.state.email)
      if (this.state.email_validation_error)
        return <p style={{ color: "red" }}>Invalid Email</p>;
      else return <p style={{ color: "green" }}>Valid Email </p>;
  };

  onChangeLatLng = ({ latLng }) => {
    this.setState({ latitude: latLng.lat(), longitude: latLng.lng() });
  };

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });

    if (key === "country") {
      this.setState({
        state: "",
        district: "",
        city: "",
        area: ""
      });
      if (value)
        this.props.onAddressTreeList({
          id: value.id,
          access_token: this.access_token,
          ADDRESS_KEY: key
        });
      this.districts = [];
      this.cities = [];
      this.areas = [];
    } else if (key === "state") {
      this.setState({
        district: "",
        city: "",
        area: ""
      });
      if (value)
        this.props.onAddressTreeList({
          id: value.id,
          access_token: this.access_token,
          ADDRESS_KEY: key
        });
      this.cities = [];
      this.areas = [];
    } else if (key === "district") {
      this.setState({
        city: "",
        area: ""
      });
      if (value)
        this.props.onAddressTreeList({
          id: value.id,
          access_token: this.access_token,
          ADDRESS_KEY: key
        });
      this.areas = [];
    } else if (key === "city") {
      this.setState({
        area: ""
      });
      if (value)
        this.props.onAddressTreeList({
          id: value.id,
          access_token: this.access_token,
          ADDRESS_KEY: key
        });
    }
  };

  handleAreaSelectChange = value => {
    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: value.name }, (results, status) => {
      if (status === "OK") {
        const location = results[0].geometry.location;
        var latLng = new window.google.maps.LatLng(
          location.lat(),
          location.lng()
        );
        this.mapComponentEl.googleMapEl.panTo(latLng);
        this.setState({
          area: value,
          latitude: location.lat(),
          longitude: location.lng()
        });
      }
    });
  };

  clearState = () => {
    this.setState({
      address_title: "",
      country: "",
      state: "",
      district: "",
      city: "",
      area: "",
      email: "",
      landlineNumber: "",
      otherLandlineNumber: [],
      house_no: "",
      landmark: "",
      addressLine1: "",
      addressLine2: "",
      po_box: "",
      tollFreeNumber: "",
      contactPerson: [],
      email_validation_error: false
    });

    // this.subBusinessBranchContactWrapperRef.clearState();
  };

  onContactPersonAdd = () => {
    this.setState({
      contactPerson: [
        ...this.state.contactPerson,
        {
          name: "",
          email: "",
          designation: "",
          mobileNumber: "",
          department: "",
          collapsed: false
        }
      ]
    });
  };

  onContactSave = (index, data) => {
    const newContactPerson = this.state.contactPerson.map(
      (contact, sub_index) => {
        return index !== sub_index ? contact : { ...contact, ...data };
      }
    );

    this.setState({ contactPerson: newContactPerson }, () => {
      // toast.success(`Contact - ${index + 1} Saved Successfully`)
    });
  };

  onContactDelete = index => () => {
    this.setState(
      {
        contactPerson: this.state.contactPerson.filter(
          (contact, sub_index) => index !== sub_index
        )
      },
      () => toast.success(`Contact - ${index + 1} Deleted Successfully`)
    );
  };

  // Not used Currently
  refineBranchState = () => {
    let reformed = {};
    for (var property in this.state) {
      const temp = {
        ...this.state,
        country: this.state.country ? this.state.country.id : "",
        state: this.state.state ? this.state.state.id : "",
        district: this.state.district ? this.state.district.id : "",
        city: this.state.city ? this.state.city.id : "",
        area: this.state.area ? this.state.area.id : ""
      };

      reformed =
        temp[property] !== "" &&
        temp[property] !== null &&
        temp[property] !== undefined
          ? { ...reformed, [property]: temp[property] }
          : reformed;
    }
    return reformed;
  };

  // Not used Currently
  getRefinedState = () => {
    let contactPerson = this.state.contactPerson.map(eachItem => {
      let contactReformed = {};
      for (var property in eachItem) {
        contactReformed =
          eachItem[property] !== "" &&
          eachItem[property] !== null &&
          eachItem[property] !== undefined &&
          eachItem[property].length > 0
            ? { ...contactReformed, [property]: eachItem[property] }
            : contactReformed;
      }
      return contactReformed;
    });
    contactPerson = contactPerson.length > 0 ? contactPerson : undefined;

    return {
      ...this.refineBranchState(),
      contactPerson
    };
  };

  onBranchSave = () => {
    const contactError = this.state.contactPerson.find(
      eachContact =>
        eachContact.email_validation_error || eachContact.phone_validation_error
    )
      ? true
      : false;

    if (
      !this.state.email_validation_error &&
      !this.state.address_title_error &&
      !contactError
    )
      this.props.onBranchAdd({
        body: {
          branchAddress: [
            {
              ...this.state,
              country: this.state.country ? this.state.country.id : "",
              state: this.state.state ? this.state.state.id : "",
              district: this.state.district ? this.state.district.id : "",
              city: this.state.city ? this.state.city.id : "",
              area: this.state.area ? this.state.area.id : ""
            }
          ]
        },
        business_slug: this.props.cookies.user_data.slug
      });
  };

  onBranchEdit = () => {
    const contactError = this.state.contactPerson.find(
      eachContact =>
        eachContact.email_validation_error || eachContact.phone_validation_error
    )
      ? true
      : false;

    if (
      !this.state.email_validation_error &&
      !this.state.address_title_error &&
      !contactError
    )
      this.props.onBranchEdit({
        body: {
          ...this.state,
          country: this.state.country ? this.state.country.id : "",
          state: this.state.state ? this.state.state.id : "",
          district: this.state.district ? this.state.district.id : "",
          city: this.state.city ? this.state.city.id : "",
          area: this.state.area ? this.state.area.id : ""
        },
        branch_id: this.props.match.params.id,
        business_slug: this.props.match.params.businessName
      });
  };

  render() {
    this.countries = this.props.countries;

    try {
      this.states = this.props.countries
        ? this.props.countries.find(
            country => country.states && country.id === this.state.country.id
          ).states
        : [];
    } catch (error) {
      this.states = [];
    }

    try {
      if (this.props.countries) {
        this.props.countries.map(country => {
          if (country.states) {
            country.states.map(state => {
              if (state.districts && state.id === this.state.state.id) {
                this.districts = state.districts;
              }
            });
          }
        });
      }
    } catch (error) {
      this.districts = [];
    }

    try {
      if (this.props.countries) {
        this.props.countries.map(country => {
          if (country.states) {
            country.states.map(state => {
              if (state.districts) {
                state.districts.map(district => {
                  if (
                    district.cities &&
                    district.id === this.state.district.id
                  ) {
                    this.cities = district.cities;
                  }
                });
              }
            });
          }
        });
      }
    } catch (error) {
      this.cities = [];
    }

    try {
      if (this.props.countries) {
        this.props.countries.map(country => {
          if (country.states) {
            country.states.map(state => {
              if (state.districts) {
                state.districts.map(district => {
                  if (district.cities) {
                    district.cities.map(city => {
                      if (city.areas && city.id === this.state.city.id) {
                        this.areas = city.areas;
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    } catch (error) {
      this.areas = [];
    }

    const { country } = this.state;
    const valueBranchCountry = country && country.id;

    const { state } = this.state;
    const valueBranchState = state && state.id;

    const { district } = this.state;
    const valueBranchDistrict = district && district.id;

    const { city } = this.state;
    const valueBranchCity = city && city.id;

    const { area } = this.state;
    const valueBranchArea = area && area.id;

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader
          //onClick={this.props.toggleCollapse}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <strong>Add Business Branch Address</strong>
            </div>
          </CardHeader>
          {/* <Collapse isOpen={!this.props.collapsed}> */}
          <CardBody>
            <Row>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="Address-Title">Address Title</Label>
                  <Input
                    required
                    type="Address_Title"
                    value={this.state.address_title}
                    onKeyDown={this._handleKeyPress}
                    onChange={this.onChange.bind(this, "address_title")}
                  />
                </FormGroup>
                <ErrorHandling
                  error={
                    this.props.branchCreateEditErrors &&
                    this.props.branchCreateEditErrors.branchAddress &&
                    this.props.branchCreateEditErrors.branchAddress
                      .address_title
                  }
                />
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="group">Country</Label>
                  <Select
                    name="Country"
                    placeholder="Select a Country"
                    noResultsText="No Data Found"
                    value={valueBranchCountry}
                    onChange={this.handleSelectChange.bind(this, "country")}
                    options={this.countries}
                    valueKey="id"
                    labelKey="name"
                  />
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="group">State</Label>
                  <Select
                    name="State"
                    placeholder="Select a State"
                    noResultsText="No Data Found"
                    value={valueBranchState}
                    onChange={this.handleSelectChange.bind(this, "state")}
                    options={this.states}
                    valueKey="id"
                    labelKey="name"
                  />
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="group">District</Label>
                  <Select
                    name="District"
                    placeholder="Select a District"
                    noResultsText="No Data Found"
                    value={valueBranchDistrict}
                    onChange={this.handleSelectChange.bind(this, "district")}
                    options={this.districts}
                    valueKey="id"
                    labelKey="name"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="group">City</Label>
                  <Select
                    name="City"
                    placeholder="Select a City"
                    noResultsText="No Data Found"
                    value={valueBranchCity}
                    onChange={this.handleSelectChange.bind(this, "city")}
                    options={this.cities}
                    valueKey="id"
                    labelKey="name"
                  />
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="group">Area</Label>
                  <Select
                    name="Area"
                    placeholder="Select an Area"
                    noResultsText="No Data Found"
                    value={valueBranchArea}
                    onChange={this.handleAreaSelectChange.bind(this)}
                    options={this.areas}
                    valueKey="id"
                    labelKey="name"
                  />
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="bname">Branch Landmark</Label>
                  <Input
                    type="text"
                    value={this.state.landmark}
                    onChange={this.onChange.bind(this, "landmark")}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12">
                <Card className="p-3">
                  <strong className="mb-2">
                    Select your Branch Location from the map displayed below
                  </strong>
                  <MapComponent
                    enableMarker={true}
                    ref={ref => (this.mapComponentEl = ref)}
                    position={{
                      lat: this.state.latitude,
                      lng: this.state.longitude
                    }}
                    onClick={this.onChangeLatLng}
                    onDragEnd={this.onChangeLatLng}
                  />
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="Email">Email</Label>
                  <Input
                    type="email"
                    value={this.state.email}
                    onKeyDown={this._handleKeyPress}
                    onChange={this.onChange.bind(this, "email")}
                  />
                </FormGroup>
                {this.displayEmailValidationInfo()}
                <ErrorHandling
                  error={
                    this.props.branchCreateEditErrors &&
                    this.props.branchCreateEditErrors.branchAddress &&
                    this.props.branchCreateEditErrors.branchAddress.email
                  }
                />
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="bname">Branch Landline Number</Label>
                  <Input
                    type="text"
                    value={this.state.landlineNumber}
                    onChange={this.onChange.bind(this, "landlineNumber")}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="bname">Other Branch LandLine Number</Label>
                  <TagsInput
                    onlyUnique
                    inputProps={{
                      placeholder: "Add new Landline no."
                    }}
                    disabled={this.props.loading}
                    addKeys={[9, 188]}
                    value={this.state.otherLandlineNumber}
                    onChange={tags => {
                      this.setState({
                        otherLandlineNumber: tags
                      });
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="bname">House No.</Label>
                  <Input
                    type="text"
                    value={this.state.house_no}
                    onChange={this.onChange.bind(this, "house_no")}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="bname">Post Box No.</Label>
                  <Input
                    type="text"
                    value={this.state.po_box}
                    onChange={this.onChange.bind(this, "po_box")}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="bname">Toll Free No.</Label>
                  <Input
                    type="text"
                    value={this.state.tollFreeNumber}
                    onChange={this.onChange.bind(this, "tollFreeNumber")}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6" md="6">
                <FormGroup>
                  <Label for="bname">Address Line 1</Label>
                  <Input
                    type="text"
                    value={this.state.addressLine1}
                    onChange={this.onChange.bind(this, "addressLine1")}
                  />
                </FormGroup>
              </Col>
              <Col xs="6" md="6">
                <FormGroup>
                  <Label for="bname">Address Line 2</Label>
                  <Input
                    type="text"
                    value={this.state.addressLine2}
                    onChange={this.onChange.bind(this, "addressLine2")}
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className="animated fadeIn">
              <Card>
                <CardHeader onClick={this.toggleCollapse}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <strong>Contact Person Details</strong>
                    <Button
                      color="primary"
                      onClick={this.toggleCollapse}
                      style={{
                        marginBottom: "0rem",
                        backgroundColor: "rgb(230, 228, 241)",
                        color: "black",
                        fontSize: "1.3rem",
                        border: "1px solid #2e219036",
                        borderRadius: "50%",
                        height: "30px",
                        width: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      {!this.state.collapsed ? (
                        <i className="fa fa-angle-up" />
                      ) : (
                        <i className="fa fa-angle-down" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <Collapse isOpen={!this.state.collapsed}>
                  <CardBody>
                    {this.state.contactPerson.map((contact, index) => (
                      <SubBusinessContact
                        contact={contact}
                        key={index}
                        id={index}
                        onContactSave={this.onContactSave.bind(this, index)}
                        onContactDelete={this.onContactDelete(index)}
                      />
                    ))}
                    <Row style={{ marginTop: 15 }}>
                      <Col xs="6" md="6">
                        <Button
                          color="primary"
                          onClick={this.onContactPersonAdd}
                        >
                          <i className="fa fa-plus" /> Add New Contact
                        </Button>
                      </Col>
                    </Row>
                    <ErrorHandling
                      errors={
                        this.props.branchCreateEditErrors &&
                        this.props.branchCreateEditErrors.branchAddress &&
                        this.props.branchCreateEditErrors.branchAddress
                          .contactPerson
                      }
                    />
                  </CardBody>
                </Collapse>
              </Card>
            </div>

            {/* <SubBusinessContactWrapper
              ref={ref => (this.subBusinessBranchContactWrapperRef = ref)}
              contactPerson={this.getContacts()}
              edit
            /> */}
            <Row style={{ marginBottom: 15 }}>
              <Col xs="6" md="6">
                <Button
                  color="success"
                  onClick={() => {
                    if (!this.props.match.params.id) this.onBranchSave();
                    else this.onBranchEdit();
                  }}
                >
                  <i className="fa fa-save" />{" "}
                  {!this.props.match.params.id ? "ADD BRANCH" : "SAVE BRANCH"}
                </Button>
              </Col>
              <Col xs="6" md="6">
                <Button color="danger" onClick={this.onBranchDelete}>
                  <i className="fa fa-remove" /> DELETE
                </Button>
              </Col>
            </Row>
          </CardBody>
          {/* </Collapse> */}
        </Card>
      </div>
    );
  }
}

export default connect(
  ({
    auth: { cookies },
    BusinessContainer: {
      business_reducer: { branch, EDIT, branchCreateEditErrors },
      primary_address: { countries }
    }
  }) => ({
    cookies,
    access_token: cookies.token_data.access_token,
    branch,
    EDIT,
    countries,
    branchCreateEditErrors
  }),
  {
    onAddressTreeList,
    onCountryList,
    onBranchAdd,
    onBranchEdit,
    onBranchAddressList,
    onUnmountBranch,
    ToogleEDIT
  }
)(AddBranch);
