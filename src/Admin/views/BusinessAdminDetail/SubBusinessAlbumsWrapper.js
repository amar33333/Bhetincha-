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
            console.log("value album: ", value, id);
            console.log("albus len: ", albums.length);
            console.log(
              "albumlist len: ",
              this.state.albumComponentList.length
            );
            albums =
              albums.length <= this.state.albumComponentList.length - 2
                ? [...this.state.albums]
                : albums;

            this.setState({
              albums: this.state.albums.map((album, index) => {
                if (id === Number(album.key)) {
                  console.log("found in id: ", id);
                  return { ...album, name: value.album };
                }
                return album;
              })
            });

            this.setState({
              albums: [...albums, { name: value.album, key: id }]
            });
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
    console.log("render state: ", this.state);
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
