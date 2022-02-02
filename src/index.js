
import {render} from "react-dom";
import App from './App';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import "./index.css";
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import React from "react";
import Users from "./Components/Users/Users";
import Message from "./Components/Messages/Message";
import { UserProvider } from "./Contexts/context";

render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<Login/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route
            index
            element={
              <main style={{ padding: "1rem" }}>
                <p>Select a Channel</p>
              </main>
            }
          />
          <Route path="users" element={<Users />} />
          <Route path=":uid" element={<Message />} />
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
  </UserProvider>,
  document.getElementById("root")
);
