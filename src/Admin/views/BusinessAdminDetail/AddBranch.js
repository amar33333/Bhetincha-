import React, { Component } from "react";
import { toast } from "react-toastify";

import MapComponent from "../../../Common/components/MapComponent";

import Select from "react-select";

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
import SubBusinessContact from "./SubBusinessContact";

import {
  onAddressTreeList,
  onCountryList,
  onBranchAdd,
  onBranchEdit,
  onBranchAddressList,
  onUnmountBranch,
  ToogleEDIT
} from "../../actions";

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
      contactPerson: []
    };

    this.countries = [];
    this.states = [];
    this.districts = [];
    this.cities = [];
    this.areas = [];

    this.propsData = {};
    console.log("add branch props: ", this.props);
  }

  componentDidMount() {
    this.props.onCountryList();
    const {
      id: branch_id,
      businessSlug: business_slug
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
    console.log("add banch props: ", nextProps);
    const { branch } = nextProps;
    // console.log("branchprops: ", nextProps);
    // console.log("branch onlytoogle props branch: ", nextProps);
    if (branch && nextProps.EDIT) {
      nextProps.ToogleEDIT(!nextProps.EDIT);

      console.log("branch if run");
      return {
        address_title: branch.address_title ? branch.address_title : "",
        contactPerson: branch.contactPerson ? branch.contactPerson : [],
        landlineNumber: branch.landlineNumber ? branch.landlineNumber : "",
        otherLandlineNumber: branch.otherLandlineNumber
          ? branch.otherLandlineNumber
          : "",
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
      console.log("branchs else run");
      return null;
    }
  };

  onChange = (key, event) => {
    if (key === "addressLine1" || key === "addressLine2") {
      this.setState({
        [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
      });
    } else {
      this.setState({ [key]: event.target.value });
    }
  };

  onChangeLatLng = ({ latLng }) => {
    // console.log("latLang: ", this.state.latitude, this.state.longitude);
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
    console.log("Value: ", value.name);
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
        console.log("latLang: ", this.state.latitude, this.state.longitude);
      } else {
        console.log("Location not found in map. Select Manually");
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
      contactPerson: []
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
    // console.log("herau: ", index, data);
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

      console.log("property: ", property, this.state[property]);

      reformed =
        temp[property] !== "" &&
        temp[property] !== null &&
        temp[property] !== undefined
          ? { ...reformed, [property]: temp[property] }
          : reformed;
    }
    console.log("branch address reformed: ", reformed);
    return reformed;
  };

  getRefinedState = () => {
    console.log("branch props ok: ", this.props);

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

    console.log("contectPerson: ", contactPerson);
    return {
      ...this.refineBranchState(),
      contactPerson
    };
  };

  onBranchSave = () => {
    this.props.onBranchAdd({
      body: {
        branchAddress: [this.getRefinedState()]
      },
      business_slug: this.props.match.params.businessSlug
    });
  };

  onBranchEdit = () => {
    this.props.onBranchEdit({
      body: {
        ...this.getRefinedState()
      },
      branch_id: this.props.match.params.id,
      business_slug: this.props.match.params.businessSlug
    });
  };

  render() {
    console.log("add branch state: ", this.state);
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
                  <Input
                    type="text"
                    value={this.state.otherLandlineNumber}
                    onChange={event => {
                      this.setState({
                        otherLandlineNumber: [event.target.value]
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
    auth: {
      cookies: {
        token_data: { access_token }
      }
    },
    AdminContainer: {
      business_reducer: { branch, EDIT },
      general_setup: { countries }
    }
  }) => ({
    access_token,
    branch,
    EDIT,
    countries
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
