import React, { Component } from "react";
import { toast } from "react-toastify";

import MapComponent from "../../MapComponent";

import Select from "react-select";

class GetDirectionModal extends Component {
  state = {
    position: { lat: 27.7172453, lng: 85.32391758465576 },
    source: null,
    destination: null,
    address: "",
    source_error: false,
    destination_error: false
  };

  componentDidMount() {
    this.setState(
      {
        source: this.props.data.source,
        address: this.props.data.addresses.length
          ? this.props.data.addresses[0]
          : "",
        destination: {
          latitude:
            this.props.data.addresses.length &&
            this.props.data.addresses[0].location &&
            this.props.data.addresses[0].location.lat,
          longitude:
            this.props.data.addresses.length &&
            this.props.data.addresses[0].location &&
            this.props.data.addresses[0].location.lon
        }
      },
      () => {
        if (!this.state.source.latitude || !this.state.source.longitude) {
          this.setState({ source_error: true });
        } else this.setState({ source_error: false });

        if (
          !this.state.destination.latitude ||
          !this.state.destination.longitude
        ) {
          this.setState({ destination_error: true });
        } else this.setState({ destination_error: false });
      }
    );
  }

  handleSelectChange = value => {
    this.setState({
      address: value,
      destination: {
        latitude: value.location ? value.location.lat : "",
        longitude: value.location ? value.location.lon : ""
      }
    });
  };

  renderMapComponent = () => (
    <div>
      <MapComponent
        position={this.state.position}
        source={this.state.source}
        destination={this.state.destination}
      />
      <Select
        name="Primary-Branch Address"
        placeholder="Select a Different Branch"
        className="Primary-Branch"
        value={this.state.address && this.state.address.addressID}
        onChange={this.handleSelectChange}
        options={this.props.data ? this.props.data.addresses : []}
        valueKey="addressID"
        labelKey="address_title"
      />
    </div>
  );

  renderErrorComponent = () => {
    if (this.state.source_error)
      return (
        <div>
          <p>
            Location Disabled! Please Refresh the Page & Click "Allow Location
            Access"
          </p>
        </div>
      );
    else if (this.state.destination_error)
      return (
        <div>
          <p>Selected Address Does Not Have Location Coordinates</p>
        </div>
      );
    else
      return (
        <div>
          <p> Unknown Error !!! </p>
        </div>
      );
  };

  render() {
    return this.state.source_error || this.state.destination_error
      ? this.renderErrorComponent()
      : this.renderMapComponent();
  }
}

export default GetDirectionModal;
