import "./assets/styles/css/App.css";
import { logIn, fetchUsers } from "./Utils/api";
import { useEffect, useState } from "react";
import { getHeaders } from "./Utils/getHeaders";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./Components/Users/Users";
import Message from "./Components/Messages/Message";
import { Layout } from "./Pages/Layout";
import AddNewChannel from "./Components/Channels/AddNewChannel";
import ChannelMessages from "./Components/Channels/ChannelMessages";

const App = () => {
  const [headerList, setHeaderList] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
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
          <Route path="/" element={<Layout />}>
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
              path="channels/:channelId"
              element={<ChannelMessages/>}
            />
            <Route path="addNewChannel" element={ <AddNewChannel/> } />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
