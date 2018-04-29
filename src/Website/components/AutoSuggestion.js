import React, { Component } from "react";
import Autosuggest from "react-autosuggest";

class AutoSuggestion extends Component {
  state = { value: "", selected: false };

  onSuggestionsClearRequested = () => {};

  getSuggestionValue = suggestion => {
    this.setState({ selected: true });
    return suggestion[this.props.valueKey];
  };

  renderSuggestion = suggestion => <div>{suggestion[this.props.valueKey]}</div>;

  render() {
    return (
      <Autosuggest
        suggestions={this.props.suggestions}
        onSuggestionsFetchRequested={({ value }) => {
          value.length > 0 &&
            this.props.onSuggestionsFetchRequested({ query: value });
        }}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        onSuggestionSelected={(event, { suggestion }) => {
          (event.type === "click" || this.state.selected) &&
            this.props.onSearchItemSelected(suggestion);
        }}
        renderInputComponent={inputProps => (
          <div>
            <form
              onSubmit={event => {
                event.preventDefault();
                this.state.selected
                  ? this.setState({ selected: false })
                  : this.props.onSearchComplete(this.state.value);
              }}
            >
              <input
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
          placeholder: this.props.placeholder,
          value: this.state.value,
          onChange: (event, { newValue }) => this.setState({ value: newValue })
        }}
      />
    );
  }
}

export default AutoSuggestion;
