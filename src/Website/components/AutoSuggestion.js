import React, { Component } from "react";
import Autosuggest from "react-autosuggest";

class AutoSuggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialQuery || ""
      // selected: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initialQuery !== this.props.initialQuery) {
      this.setState({ value: this.props.initialQuery });
    }
  }

  onSuggestionsClearRequested = () => {};

  getSuggestionValue = suggestion => {
    // this.setState({ selected: true });
    return suggestion[this.props.valueKey];
  };

  renderSuggestion = suggestion => (
    <div
      style={{
        fontSize: "16px",
        marginBottom: "0px"
      }}
    >
      {suggestion[this.props.valueKey]}
    </div>
  );

  render() {
    return (
      <Autosuggest
        from={this.props.from}
        suggestions={this.props.suggestions}
        onSuggestionsFetchRequested={({ value }) => {
          value.length > 0 &&
            this.props.onSuggestionsFetchRequested({ query: value });
        }}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        onSuggestionSelected={(event, { suggestion }) => {
          event.type === "click" &&
            //  || this.state.selected
            this.props.onSearchComplete(suggestion[this.props.valueKey]);
          // this.props.onSearchItemSelected(suggestion);
        }}
        renderInputComponent={inputProps => (
          <div>
            <form
              classname="mb-0"
              style={{
                height: "50px"
              }}
              onSubmit={event => {
                event.preventDefault();
                // this.state.selected
                //   ? this.setState({ selected: false })
                //   : this.props.onSearchComplete(this.state.value);
                this.props.onSearchComplete(this.state.value);
              }}
            >
              <input
                {...inputProps}
                autoFocus={this.props.autoFocus}
                className={
                  this.props.from === "navbar"
                    ? `in-navbar__autosuggest__input`
                    : `react-autosuggest__input`
                }
                style={{
                  border: "none",
                  borderRadius: "0px",
                  backgroundColor: "white",
                  WebkitBoxShadow: "0px 1px 6px 1px rgba(196,174,196,0.79)",
                  MozBoxShadow: "0px 1px 6px 1px rgba(196,174,196,0.79)",
                  BoxShadow: "0px 2px 4px 1px rgba(196,174,196,0.79)"
                }}
              />
              <button
                type="submit"
                style={{
                  border: "none",
                  outline: "none",
                  background: "none"
                }}
              >
                <i
                  className={
                    this.props.from === "navbar"
                      ? `fa fa-search in-navbar-autosuggest-search-icon`
                      : `fa fa-search autosuggest-search-icon`
                  }
                />
              </button>
            </form>
          </div>
        )}
        inputProps={{
          placeholder: this.props.placeholder,
          value: this.state.value,
          onChange: (event, { newValue }) => this.setState({ value: newValue })
        }}
        // theme={this.props.theme}
      />
    );
  }
}

export default AutoSuggestion;
