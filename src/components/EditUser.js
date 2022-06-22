import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./EditUser.module.css";
import { useHistory } from "react-router-dom";

const EditUser = () => {
  const params = useParams();
  const history = useHistory();
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    titleName: "",
    gender: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
    email: "",
  });
  const fetchUserById = useCallback(async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/user/?id=${params.userId}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      setUser({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        titleName: data.titleName,
        street: data.street,
        city: data.city,
        postalCode: data.postalCode,
        phone: data.phone,
        gender: data.gender,
        state: data.state,
      });
    } catch (error) {
      return <h2>error.message</h2>;
    }
  }, [params.userId]);
  useEffect(() => {
    fetchUserById();
  }, [fetchUserById]);
  const submitHandler = async (event) => {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/updateUser", {
      method: "POST",
      body: JSON.stringify(user),
      "Content-Type": "application/json",
    });
    const data = await response.json();
    if (data.updated === true) {
      history.push("/");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="titleName">Title Name</label>
        <input
          type="text"
          id="titleName"
          value={user.titleName}
          onChange={(e) => setUser({ ...user, titleName: e.target.value })}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="gender">Gender</label>
        <input
          type="text"
          id="gender"
          value={user.gender}
          onChange={(e) => setUser({ ...user, gender: e.target.value })}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">street</label>
        <input
          type="text"
          id="street"
          value={user.street}
          onChange={(e) => setUser({ ...user, street: e.target.value })}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={user.city}
          onChange={(e) => setUser({ ...user, city: e.target.value })}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          value={user.state}
          onChange={(e) => setUser({ ...user, state: e.target.value })}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="postalCode">PostalCode</label>
        <input
          type="text"
          id="postalCode"
          value={user.postalCode}
          onChange={(e) => setUser({ ...user, postalCode: e.target.value })}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className={classes.control}>
        <button>Save</button>
      </div>
    </form>
  );
};

export default EditUser;
