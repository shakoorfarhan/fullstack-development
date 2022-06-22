import React from "react";

import User from "./User";
import classes from "./UsersList.module.css";

const UserList = (props) => {
  return (
    <ul className={classes["users-list"]}>
      {props.users.map((user) => (
        <User
          id={user.id}
          key={user.id}
          titleName={user.titleName}
          url={user.url}
          gender={user.gender}
          firstName={user.firstName}
          lastName={user.lastName}
          state={user.state}
          city={user.city}
          postalCode={user.postalCode}
          street={user.street}
          phone={user.phone}
          email={user.email}
        />
      ))}
    </ul>
  );
};

export default UserList;
