import React from "react";
import { Link } from "react-router-dom";

import classes from "./User.module.css";

const User = (props) => {
  return (
    <li className={classes.user}>
      <img src={props.url} alt="img" />
      <h3>{props.firstName}</h3>
      <h3>{props.lastName}</h3>
      <h3>{props.titleName}</h3>
      <h3>{props.gender}</h3>
      <h3>{props.street}</h3>
      <h3>{props.city}</h3>
      <h3>{props.state}</h3>
      <h3>{props.postalCode}</h3>
      <h3>{props.email}</h3>
      <h3>{props.phone}</h3>
      <Link to={`/editUser/${props.id}`}>edit</Link>
    </li>
  );
};

export default User;
