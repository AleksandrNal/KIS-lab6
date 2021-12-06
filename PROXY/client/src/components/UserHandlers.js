import React from "react";
import { User } from "../components/UserHandler";

export const Users = ({ users }) => {
  if (!users.length) {
    return <p className="center">There is no users (how)</p>;
  }

  return (
    <div className="row" style={{ marginTop: 20 }}>
      <div className="col s12 yellow darken-2">
        {users.map((user) => {
          return <User user={user} key={user._id} />;
        })}
      </div>
    </div>
  );
};
