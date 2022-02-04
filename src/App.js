import "./assets/styles/css/App.css";
import { logIn, fetchUsers, register } from "./Utils/api";
import { useEffect, useState } from "react";
import { getHeaders } from "./Utils/getHeaders";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./Components/Users/Users";
import Message from "./Components/Messages/Message";
import Layout from "./Pages/Layout";
import Login from "./Components/Login/Login";

const App = () => {
  const [userDetails, setUserDetail] = useState({
    email: "",
    id: "",
  });
  const [headerList, setHeaderList] = useState(null);
  const [users, setUsers] = useState(null);
  const [receiverEmail, setReceiverEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Log in
  useEffect(() => {
    const oldHeader = JSON.parse(sessionStorage.getItem("header"));

    if (oldHeader) {
      logInUser();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const logInUser = async () => {
    const userData = await logIn();
    const userHeader = getHeaders(userData);
    const details = await userData.json();
    const { email, id } = details.data;
    setUserDetail({
      email: email,
      id: id,
    });
    setHeaderList(userHeader);
    sessionStorage.setItem("header", JSON.stringify(userHeader));
    sessionStorage.setItem("user", JSON.stringify({ email, id }));
    setIsLoggedIn(true);
  };

  const handleLogin = () => {
    logInUser();
  };

  //Fetch All Users
  useEffect(() => {
    if (headerList) {
      getUsers();
    }
  }, [headerList]);

  const getUsers = async () => {
    const data = await fetchUsers(headerList);
    setUsers(data.data);
  };

  //Message Receiver
  const changeReceiver = (e) => {
    setReceiverEmail(e.target.textContent);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Layout
                  headerList={headerList}
                  changeReceiver={changeReceiver}
                />
              ) : (
                <Login onclick={handleLogin} />
              )
            }
          >
            <Route
              index
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Select a Channel</p>
                </main>
              }
            />
            <Route
              path="users"
              element={<Users users={users} changeReceiver={changeReceiver} />}
            />
            <Route
              path=":uid"
              element={
                <Message
                  users={users}
                  userDetails={userDetails}
                  headerList={headerList}
                  receiverEmail={receiverEmail}
                />
              }
            />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
