import React, { useState, useEffect, useCallback } from "react";

import UserList from "./components/UsersList";
import "./App.css";
import { CSVLink } from "react-csv";
import { Route } from "react-router-dom";
import EditUser from "./components/EditUser";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [csvExport, setCsvExport] = useState({
    data: [],
    headers: [],
    filename: "",
  });
  const headers = [
    { label: "Id", key: "id" },
    { label: "Gender", key: "gender" },
    { label: "PictureUrl", key: "pictureUrl" },
    { label: "FirstName", key: "firstName" },
    { label: "LastName", key: "lastName" },
    { label: "TitleName", key: "titleName" },
    { label: "Street", key: "street" },
    { label: "City", key: "city" },
    { label: "State", key: "state" },
    { label: "PostalCode", key: "postalCode" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "PictureUrl", key: "pictureUrl" },
  ];

  const fetchUsersHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const transformedUsers = data.map((userData) => {
        return {
          id: userData.id,
          gender: userData.gender,
          firstName: userData.firstName,
          lastName: userData.lastName,
          title: userData.titleName,
          street: userData.street,
          titleName: userData.titleName,
          city: userData.city,
          state: userData.state,
          postalCode: userData.postalCode,
          email: userData.email,
          phone: userData.phone,
          url: userData.pictureUrl,
        };
      });
      setUsers(transformedUsers);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  const exportUsersHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const transformedUsers = data.map((userData) => {
        return {
          id: userData.id,
          gender: userData.gender,
          firstName: userData.firstName,
          lastName: userData.lastName,
          title: userData.titleName,
          street: userData.street,
          titleName: userData.titleName,
          city: userData.city,
          state: userData.state,
          postalCode: userData.postalCode,
          email: userData.email,
          phone: userData.phone,
          url: userData.pictureUrl,
        };
      });
      setUsers(transformedUsers);

      setCsvExport({
        data: data,
        headers: headers,
        filename: "test.csv",
      });
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchUsersHandler();
    exportUsersHandler();
  }, [fetchUsersHandler]);

  let content = <p>Found no users.</p>;

  if (users.length > 0) {
    content = <UserList users={users} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <main>
      <Route path="/editUser/:userId" exact>
        <EditUser />
      </Route>
      <Route path="/" exact>
        <section>
          <CSVLink {...csvExport}>Export to CSV</CSVLink>
        </section>
        <section>
          <button onClick={exportUsersHandler}>Refresh users</button>
        </section>
        <section>{content}</section>
      </Route>
    </main>
  );
}

export default App;
