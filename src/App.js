import "./assets/styles/css/App.css";
import { logIn, fetchUsers, register } from "./Utils/api";
import { useEffect, useState } from "react";
import { getHeaders } from "./Utils/getHeaders";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./Components/Users/Users";
import Message from "./Components/Messages/Message";
import Layout from "./Pages/Layout";
import Login from "./Components/Login/Login";

/* import { io } from "socket.io-client";
const socket = io("http://localhost:3001");
socket.on("connect", () => {
  console.log(`You connected with ${socket.id}`);
}); */

const App = () => {
  const [userDetails, setUserDetail] = useState({
    email: "",
    id: "",
  });
  const [headerList, setHeaderList] = useState(null);
  const [users, setUsers] = useState(null);
  const [receiverEmail, setReceiverEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const oldHeader = JSON.parse(sessionStorage.getItem("header"));

    if (oldHeader) {
      setIsLoggedIn(true);
      setHeaderList(oldHeader);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (headerList) {
      getUsers();
    }
  }, [headerList]);

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
  };

  const getUsers = async () => {
    const data = await fetchUsers(headerList);
    setUsers(data.data);
  };

  const handleLogin = () => {
    logInUser();
    setIsLoggedIn(true);
  };

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
