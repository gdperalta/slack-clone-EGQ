import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./assets/styles/css/App.css";
import { fetchUsers, logIn, register } from "./Utils/api";
import { useEffect, useState } from "react";
import { getHeaders } from "./Utils/getHeaders";

const App = () => {
  const [users, setUsers] = useState(null);
  const [header, setHeader] = useState(null);

  useEffect(() => {
    logInUser();
  }, []);

  useEffect(() => {
    if (header) {
      getUsers();
    }
  }, [header]);

  const getUsers = async () => {
    const data = await fetchUsers(header);
    setUsers(data);
  };

  const logInUser = async () => {
    const userData = await logIn();
    const userHeader = getHeaders(userData);
    setHeader(userHeader);
  };

  return (
    <div className="wrapper">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default App;
