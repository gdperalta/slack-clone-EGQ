
import './App.css'
import "./assets/styles/css/App.css";
import { logIn, fetchUsers } from "./Utils/api";
import { useEffect, useState } from "react";
import { getHeaders } from "./Utils/getHeaders";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./Components/Users/Users";
import Message from "./Components/Messages/Message";
import { Layout } from "./Pages/Layout";
import Login from "./Components/Login/Login"
import Signup from "./Components/Signup/Signup"

const App = () => {

  const [headerList, setHeaderList] = useState(null);
  const [users, setUsers] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const oldHeader = JSON.parse(sessionStorage.getItem("header"));

    if (oldHeader) {
      setIsLoggedIn(true);
      setHeaderList(oldHeader);
    } else {
      setIsLoggedIn(false);
    }
    logInUser();
  }, []);

  useEffect(() => {
    if (headerList) {
      getUsers();
    }
  }, [headerList]);



  const logInUser = async () => {
    const userData = await logIn();
    const userHeader = getHeaders(userData);
    setHeaderList(userHeader);
  };
  const getUsers = async () => {
    const data = await fetchUsers(headerList);
    setUsers(data.data);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
        {isLoggedIn ?<Route path="/" element={<Layout/>}> 
            <Route
              index
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Select a Channel</p>
                </main>
              }
            />
            
            <Route path="users" element={<Users users={users} />} />
            <Route
              path=":uid"
              element={<Message users={users} headerList={headerList} />}
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
          :<Route path="/" element={<Login />}/>}
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )};


export default App;
