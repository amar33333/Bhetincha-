import React from "react";
import { Table, Button } from "reactstrap";

export default props => (
  <div>
    {props.teleUsers.length ? (
      <Table size="sm" hover striped>
        <thead>
          <tr>
            <th>Name (Number)</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {props.teleUsers.map((user, i) => {
            let name = "";
            let number = "";
            let address = "";
            let id = i;
            if (user.at === "c") {
              name = user.name;
              id = user.business_id;
            } else {
              name = `${user.first_name} ${user.last_name}`;
              id = user.id;
            }
            if (user.at === "m") {
              number = user.phone_number;
            } else {
              number = user.mobileNumber;
            }
            if (user.area || user.city) {
              address = `${user.area ? user.area.name : ""}${
                user.area && user.city ? ", " : ""
              }${user.city ? user.city.name : ""}`;
            } else if (user.district) {
              address = user.district.name;
            } else if (user.state) {
              address = user.state.name;
            } else if (user.country) {
              address = user.country.name;
            }
            return (
              <tr
                key={id}
                onClick={() => {
                  props.changeNumber(number);
                  props.onTeleUserList({ params: { phone: number } });
                }}
                style={{ cursor: "pointer" }}
              >
                <td>{`${name} (${number})`}</td>
                <td>{address}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    ) : (
      <p>No Users Found</p>
    )}
    {props.teleUsers.length >= props.total && (
      <Button color="link" size="sm" onClick={props.onLoadMoreName}>
        Load More
      </Button>
    )}
  </div>
);
