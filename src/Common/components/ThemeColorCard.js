import React, { Component } from "react";
import { Card } from "semantic-ui-react";

class ThemeColorCard extends Component {
  render() {
    return (
      <div>
        <Card>
          <Card.Content>
            <Card.Header>{this.props.theme.themeTitle}</Card.Header>
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
                <div
                  className="theme-card-color"
                  style={{
                    backgroundColor: this.props.theme.brandWarningColor.color
                  }}
                />
              </div>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default ThemeColorCard;
