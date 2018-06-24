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

  // renderInputComponent = inputProps => (
  //   <div className="inputContainer">
  //     <input {...inputProps} />
  //     <i className="fa fa-search" />
  //   </div>
  // );

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
          event.type === "click" &&
            //  || this.state.selected
            this.props.onSearchComplete(suggestion[this.props.valueKey]);
          // this.props.onSearchItemSelected(suggestion);
        }}
        renderInputComponent={inputProps => (
          <div>
            <form
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
                style={{
                  // border: "1px solid #aaa",
                  border: "none",
                  borderRadius: "0px",
                  backgroundColor: "white",
                  webkitBoxShadow: "0px 1px 6px 1px rgba(196,174,196,0.79)",
                  mozBoxShadow: "0px 1px 6px 1px rgba(196,174,196,0.79)",
                  boxShadow: "0px 2px 4px 1px rgba(196,174,196,0.79)"
                }}
              />
              <i
                className="fa fa-search"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "25%",
                  fontSize: "20px",
                  color: "grey"
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
