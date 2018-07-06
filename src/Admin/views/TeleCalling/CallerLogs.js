import React, { Component } from "react";
import { Table, Button } from "reactstrap";

class CallerLogs extends Component {
  render() {
    return (
      <div>
        Recent SMS Logs
        <Table size="sm" hover striped>
          <tbody>
            <tr>
              <td>3 days ago</td>
              <td>Tech Kunja regarding software development ...</td>
              <td>Two way SMS</td>
            </tr>
            <tr>
              <td>10 days ago</td>
              <td>Tech Kunja regarding mobile app development...</td>
              <td>Regular</td>
            </tr>
          </tbody>
        </Table>
        <Button color="link" size="sm">
          Load More Logs
        </Button>
      </div>
    );
  }
}

export default CallerLogs;
