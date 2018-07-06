import React from "react";
import { Table, Button } from "reactstrap";

export default props => (
  <div>
    <Table size="sm" hover striped>
      <thead>
        <tr>
          <th>Name (Number)</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr
          onClick={() => console.log("clicked")}
          style={{ cursor: "pointer" }}
        >
          <td>Mark (9823423223)</td>
          <td>Narayantar, Jorpati</td>
        </tr>
        <tr>
          <td>Mark (9823423223)</td>
          <td>Narayantar, Jorpati</td>
        </tr>
        <tr>
          <td>Mark (9823423223)</td>
          <td>Narayantar, Jorpati</td>
        </tr>
      </tbody>
    </Table>
    <Button color="link" size="sm">
      Load More
    </Button>
  </div>
);
