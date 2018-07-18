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
      this.setState({
        logs: orderby(
          this.props.logs.map(log => ({ ...log, loadmore: false })),
          ["date"],
          ["desc"]
        )
      });
    }
  }

  handleLoadmore = (index, loadmore) => {
    this.setState({
      logs: this.state.logs.map((log, i) => ({
        ...log,
        loadmore: i === index ? loadmore : log.loadmore
      }))
    });
  };

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
                    <td>
                      {log.loadmore ? (
                        <span>
                          {log.message}
                          <small
                            style={{ cursor: "pointer", color: "blue" }}
                            onClick={() => this.handleLoadmore(i, false)}
                          >
                            Less
                          </small>
                        </span>
                      ) : (
                        <span>
                          {`${log.message.slice(0, 12)}${
                            log.message.length > 12 ? " ..." : ""
                          }`}
                          {log.message.length > 12 ? (
                            <small
                              style={{ cursor: "pointer", color: "blue" }}
                              onClick={() => this.handleLoadmore(i, true)}
                            >
                              More
                            </small>
                          ) : null}
                        </span>
                      )}
                    </td>
                    <td>{log.type === "regular" ? "Regular" : "Two Way"}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
        {this.state.logs.length > 5 && (
          <Button
            color="link"
            size="sm"
            onClick={() => this.setState({ limit: !this.state.limit })}
          >
            {this.state.limit ? "Load All Remaining Logs" : "Minimize Logs"}
          </Button>
        )}
      </div>
    );
  }
}

export default CallerLogs;
