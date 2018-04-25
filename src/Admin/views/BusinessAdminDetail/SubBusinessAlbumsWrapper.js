import React, { Component } from "react";

import { Row, Col, Button, Card, CardHeader, CardBody } from "reactstrap";

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

  clearState = () => {
    this.setState({
      albumComponentList: [],
      albums: []
    });
  };

  onAlbumAdd = () => {
    this.setState({
      albumComponentList: [
        ...this.state.albumComponentList,
        <SubBusinessAlbum
          key={new Date().getTime()}
          id={new Date().getTime()}
          onValueChange={(value, id) => {
            let albums = [...this.state.albums];
            let index = null;

            albums.map((album, i) => {
              console.log("key: ", album.key, "id: ", id);
              if (id === Number(album.key)) {
                console.log("index: ", i);
                index = i;
              }
            });
            console.log("index: ", index);

            if (albums.length > 0 && index !== null) {
              console.log("edit ran: ", value);

              albums[index].name = value.album;

              this.setState({ albums });
            } else {
              console.log("new add ran");

              this.setState(
                {
                  albums: [...this.state.albums, { name: value.album, key: id }]
                },
                () => {
                  console.log("else monitor state: ", this.state.albums);
                  this.onAlbumAdd();
                }
              );
            }

            {
              /* this.setState({
              albums: this.state.albums.filter(album => {
                if (id === Number(album.key))
                  return { ...album, name: value.album, key: id };
                else {
                  // cant call this one Aye...
                  // this.onAlbumAdd();
                  return [...this.state.albums, { name: value.album, key: id }];
                }
              })
            }); */
            }

            /* this.setState(
              {
                albums: [...this.state.albums, { name: value.album, key: id }]
              },
              () => {
                console.log("else monitor state: ", this.state.albums);
                this.onAlbumAdd();
              }
            ); */
          }}
          onDelete={id => {
            this.setState({
              albumComponentList: this.state.albumComponentList.filter(
                albumList => id !== Number(albumList.key)
              ),
              albums: this.state.albums.filter(
                album => id !== Number(album.key)
              )
            });
          }}
        />
      ]
    });
  };

  // onAlbumAdd = () => {
  //   // this.setState(
  //   //   { albums: [...this.state.albums, { name: this.state.album }] },
  //   //   () => console.log("ablu ssubmit: ", this.state)
  //   // );
  //   let albums = [...this.state.albums];
  //   this.setState({
  //     albumComponentList: [
  //       ...this.state.albumComponentList,
  //       <SubBusinessAlbum
  //         key={this.state.albumComponentList.length}
  //         id={this.state.albumComponentList.length}
  //         onValueChange={(value, id) => {
  //           console.log("albus len: ", albums.length + 1);

  //           console.log(
  //             "albumlist len: ",
  //             this.state.albumComponentList.length
  //           );

  //           console.log("befor album: ", albums);

  //           // albums =
  //           //   albums.length + 1 <= this.state.albumComponentList.length
  //           //     ? [...this.state.albums]
  //           //     : albums;

  //           if (albums[id]) {
  //             albums[id].name = value.album;
  //             console.log("if satisfied albums ste: ", albums);

  //             this.setState({ albums: albums });
  //           } else {
  //             this.setState(
  //               {
  //                 albums: [...albums, { name: value.album, key: id }]
  //               },
  //               () => console.log("else monitor state: ", this.state.albums)
  //             );
  //             console.log("else  albums ste: ", albums);
  //           }

  //           if (albums.length + 1 <= this.state.albumComponentList.length) {
  //             console.log("before if satisfied: ", albums);
  //             albums = [...this.state.albums];
  //             console.log("after if satisfied album : ", albums);
  //           } else {
  //             console.log("NOT - satisfied: ", albums);
  //           }
  //         }}
  //         onDelete={id => {
  //           {
  //             /* albums.splice(id, 1);
  //           console.log("album splice: ", albums); */
  //           }

  //           this.setState({
  //             albumComponentList: this.state.albumComponentList.filter(
  //               albumList => id !== Number(albumList.key)
  //             ),
  //             albums: albums.filter(album => id !== Number(album.key))
  //           });
  //         }}
  //       />
  //     ]
  //   });
  // };

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
