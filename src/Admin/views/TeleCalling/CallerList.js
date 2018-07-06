import React from "react";
import { Table } from "reactstrap";

export default props => (
  <Table size="sm" hover striped>
    <thead>
      <tr>
        <th>Name (Number)</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      <tr onClick={() => console.log("clicked")} style={{ cursor: "pointer" }}>
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
);
