import React, { Component } from "react";

import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  Input
} from "reactstrap";

import SubBusinessAlbum from "./SubBusinessAlbum";

class SubBusinessAlbumsWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albumComponentList: [],
      albums: []
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.onSubmit) this.props.onSubmit({ albums: nextState.albums });
  }

  onChange = (key, event) =>
    this.setState({ [key]: event.target.value }, () =>
      console.log("ablu stat: ", this.state)
    );

  clearState = () => {
    this.setState({
      albumComponentList: [],
      albums: []
    });
  };

  onAlbumAdd = () => {
    // this.setState(
    //   { albums: [...this.state.albums, { name: this.state.album }] },
    //   () => console.log("ablu ssubmit: ", this.state)
    // );
    let albums = [...this.state.albums];
    this.setState({
      albumComponentList: [
        ...this.state.albumComponentList,
        <SubBusinessAlbum
          key={this.state.albumComponentList.length}
          id={this.state.albumComponentList.length}
          onValueChange={(value, id) => {
            console.log("albus len: ", albums.length + 1);
            console.log("albums itselg: ", albums);

            console.log(
              "albumlist len: ",
              this.state.albumComponentList.length
            );
            albums =
              albums.length + 1 <= this.state.albumComponentList.length
                ? [...this.state.albums]
                : albums;

            {
              /* if (albums.length + 1 <= this.state.albumComponentList.length) {
              console.log("satisfied: ", this.state.albums);
              albums = [...this.state.albums];
            } else {
              console.log("NOT - satisfied: ", this.state.albums);
            } */
            }

            if (albums[id]) {
              albums[id].name = value.album;
              console.log("satisfied albums ste: ", albums);

              this.setState({ albums: albums });
            } else {
              this.setState({
                albums: [...albums, { name: value.album, key: id }]
              });
              console.log("else  albums ste: ", albums);
            }
          }}
          onDelete={id => {
            albums.splice(id, 1);

            this.setState({
              albumComponentList: this.state.albumComponentList.filter(
                albumList => id !== Number(albumList.key)
              ),
              albums: albums
            });
          }}
        />
      ]
    });
  };

  render() {
    console.log("render state: ", this.state.albums);
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Add Albums Name</strong>
          </CardHeader>
          <CardBody>
            {this.state.albumComponentList}
            <Row style={{ marginTop: 15 }}>
              <Col xs="6" md="6">
                <Button color="primary" onClick={this.onAlbumAdd}>
                  Add New Album
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SubBusinessAlbumsWrapper;
