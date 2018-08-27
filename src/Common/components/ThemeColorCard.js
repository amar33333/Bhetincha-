import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";

import { PopoverDelete } from "../../Common/components";

class ThemeColorCard extends Component {
  render() {
    console.log("color coar: ", this.props);
    return this.props.theme ? (
      <div>
        <Card>
          <Card.Content>
            <Card.Header>{this.props.theme.title}</Card.Header>
            <Card.Description>
              <div className="theme-card-color__wrapper">
                <div
                  className="theme-card-color"
                  style={{
                    backgroundColor: this.props.theme.brandPrimaryColor.color
                  }}
                />
                <div
                  className="theme-card-color"
                  style={{
                    backgroundColor: this.props.theme.brandDarkColor.color
                  }}
                />
                <div
                  className="theme-card-color"
                  style={{
                    backgroundColor: this.props.theme.brandLightColor.color
                  }}
                />
                <div
                  className="theme-card-color"
                  style={{
                    backgroundColor: this.props.theme.brandInfoColor.color
                  }}
                />
                <div
                  className="theme-card-color"
                  style={{
                    backgroundColor: this.props.theme.brandSuccessColor.color
                  }}
                />
                <div
                  className="theme-card-color"
                  style={{
                    backgroundColor: this.props.theme.brandDangerColor.color
                  }}
                />
                {/* <div
                  className="theme-card-color"
                  style={{
                    backgroundColor: this.props.theme.brandWarningColor.color
                  }}
                /> */}
              </div>
            </Card.Description>
          </Card.Content>
          <Button
            color="primary"
            onClick={() =>
              this.props.history.push(
                `${this.props.match.url}/${this.props.theme.id}/edit`
              )
            }
          >
            Edit
          </Button>

          {/* <Button
            color="danger"
            onClick={() =>
              this.props.onBusinessThemeRemove({ id: this.props.theme.id })
            }
          >
            Delete
          </Button> */}
          <PopoverDelete
            id={`delete-${this.props.theme.id}`}
            onClick={() =>
              this.props.onBusinessThemeRemove({ id: this.props.theme.id })
            }
          />
        </Card>
      </div>
    ) : (
      <div style={{ color: "red" }}>Theme Error</div>
    );
  }
}

export default ThemeColorCard;
