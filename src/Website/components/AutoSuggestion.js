import React, { Component } from "react";
import { Input } from "reactstrap";
import { Link } from "react-router-dom";
import Autosuggest from "react-autosuggest";

class AutoSuggestion extends Component {
  state = { value: "" };

  componentDidMount() {
    console.log(this.props.valueKey);
  }

  onSuggestionsClearRequested = () => {};

  getSuggestionValue = suggestion => suggestion[this.props.valueKey];

  renderSuggestion = suggestion => <div>{suggestion[this.props.valueKey]}</div>;

  render() {
    return (
      <Autosuggest
        suggestions={this.props.suggestions}
        onSuggestionsFetchRequested={({ value }) => {
          console.log(value);
          value.length > 0 &&
            this.props.onSuggestionsFetchRequested({ query: value });
        }}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        onSuggestionSelected={() => console.log("select vayo")}
        renderInputComponent={inputProps => (
          <div>
            <form
              onSubmit={event => {
                event.preventDefault();
                console.log("enter press vayo");
              }}
            >
              <Input
                {...inputProps}
                autoFocus
                style={{
                  border: "1px solid #aaa",
                  borderRadius: "0px"
                }}
              />
            </form>
          </div>
        )}
        inputProps={{
          placeholder: "Search anything...",
          value: this.state.value,
          onChange: (event, { newValue }) => this.setState({ value: newValue })
        }}
      />
    );
  }
}

export default AutoSuggestion;
