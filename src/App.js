import "./assets/styles/css/App.css";
import { fetchUsers, getUserChannels } from "./Utils/api";
import { useEffect, useState } from "react";
import { getHeaders } from "./Utils/getHeaders";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./Components/Users/Users";
import Message from "./Components/Messages/Message";
import Layout from "./Pages/Layout";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Home from "./Pages/Home";
import RequireAuth from "./Utils/RequireAuth";
import ErrorPage from "./Pages/Errors";

const App = () => {
  const [userDetails, setUserDetail] = useState({
    email: "",
    id: "",
  });
  const [headerList, setHeaderList] = useState(null);
  const [users, setUsers] = useState(null);
  const [userChannels, setUserChannels] = useState(null);
  const [messageTitle, setMessageTitle] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  //Log in
  useEffect(() => {
    
    const oldHeader = JSON.parse(sessionStorage.getItem("header"));
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (oldHeader) {
      setIsLoggedIn(true);
      setHeaderList(oldHeader);
      setUserDetail(user);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const logInUser = async (userData, header) => {
    const userHeader = getHeaders(header);

    const { email, id } = userData.data;
    setUserDetail({
      email: email,
      id: id,
    });
    setHeaderList(userHeader);
    sessionStorage.setItem("header", JSON.stringify(userHeader));
    sessionStorage.setItem("user", JSON.stringify({ email, id }));
    sessionStorage.setItem("auth", JSON.stringify(true));

    setIsLoggedIn(true);
    console.log(userHeader);
  };

  //Fetch All Users and Channels
  useEffect(() => {
    if (headerList) {
      getUsers();
      getChannels();
    }
  }, [headerList]);

  const getUsers = async () => {
    const data = await fetchUsers(headerList);
    setUsers(data.data);
  };

  const getChannels = async () => {
    if (headerList) {
      const data = await getUserChannels(headerList);
      setUserChannels(data.data);
    }
  };

  //Message Receiver
  const changeMessageDisplay = (e) => {
    setMessageTitle(e.currentTarget.textContent);
  };

  const messageWasSent = (receiver) => {
    setMessageSent(receiver);
  };

  return (
    <BrowserRouter basename="/slack-clone-egq">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onSuccess={logInUser} />} />
        <Route
          path="/"
          element={
            <RequireAuth isLoggedIn={isLoggedIn}>
              <Layout
                users={users}
                headerList={headerList}
                changeMessageDisplay={changeMessageDisplay}
                messageSent={messageSent}
                userChannels={userChannels}
                getChannels={getChannels}
              />
            </RequireAuth>
          }
        >
          <Route index element={<Home getChannels={getChannels} />} />
          <Route
            path="direct-messages"
            element={
              <RequireAuth isLoggedIn={isLoggedIn}>
                <Users
                  users={users}
                  headerList={headerList}
                  userDetails={userDetails}
                  changeMessageDisplay={changeMessageDisplay}
                />
              </RequireAuth>
            }
          />
          <Route path="Channel">
            <Route
              path=":uid"
              element={
                <RequireAuth isLoggedIn={isLoggedIn}>
                  <Message
                    users={users}
                    userChannels={userChannels}
                    userDetails={userDetails}
                    headerList={headerList}
                    messageTitle={messageTitle}
                    messageWasSent={messageWasSent}
                  />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="User">
            <Route
              path=":uid"
              element={
                <RequireAuth isLoggedIn={isLoggedIn}>
                  <Message
                    users={users}
                    userChannels={userChannels}
                    userDetails={userDetails}
                    headerList={headerList}
                    messageTitle={messageTitle}
                    messageWasSent={messageWasSent}
                  />
                </RequireAuth>
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
