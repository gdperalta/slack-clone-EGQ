import "./assets/styles/css/App.css";
import { fetchUsers } from "./Utils/api";
import { useEffect, useState } from "react";
import { getHeaders } from "./Utils/getHeaders";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./Components/Users/Users";
import Message from "./Components/Messages/Message";
import Layout from "./Pages/Layout";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import ChannelMessages from "./Components/Channels/ChannelMessages";
import { getUserChannels } from "./Utils/channelAPI";

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
    setIsLoggedIn(true);
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
    setMessageTitle(e.target.textContent);
  };

  const messageWasSent = (receiver) => {
    setMessageSent(receiver);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {isLoggedIn ? (
            <Route
              path="/"
              element={
                <Layout
                  headerList={headerList}
                  changeMessageDisplay={changeMessageDisplay}
                  messageSent={messageSent}
                  userChannels={userChannels}
                  getChannels={getChannels}
                />
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
                element={
                  <Users
                    users={users}
                    headerList={headerList}
                    userDetails={userDetails}
                    changeMessageDisplay={changeMessageDisplay}
                  />
                }
              />
              <Route path="channels/:channelId" element={<ChannelMessages />} />
              <Route
                path=":uid"
                element={
                  <Message
                    users={users}
                    userChannels={userChannels}
                    userDetails={userDetails}
                    headerList={headerList}
                    messageTitle={messageTitle}
                    messageWasSent={messageWasSent}
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
          ) : (
            <Route path="/">
              <Route index element={<Login onSuccess={logInUser} />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
