import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import moment from "moment";
import orderby from "lodash.orderby";

class CallerLogs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: props.logs ? orderby(props.logs, ["date"], ["desc"]) : [],
      limit: true
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.logs !== prevProps.logs) {
      this.setState({ logs: orderby(this.props.logs, ["date"], ["desc"]) });
    }
  }

  render() {
    return (
      <div>
        Recent SMS Logs
        {!this.state.logs.length ? (
          <p>No logs found</p>
        ) : (
          <Table size="sm" hover striped>
            <tbody>
              {this.state.logs.map((log, i) => {
                if (this.state.limit && i > 4) {
                  return null;
                }
                return (
                  <tr key={i}>
                    <td>{moment(log.date).fromNow()}</td>
                    <td>{log.message}</td>
                    <td>{log.type === "regular" ? "Regular" : "Two Way"}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
        <Button
          color="link"
          size="sm"
          onClick={() => this.setState({ limit: !this.state.limit })}
        >
          {this.state.limit ? "Load All Remaining Logs" : "Minimize Logs"}
        </Button>
      </div>
    );
  }
}

export default CallerLogs;
