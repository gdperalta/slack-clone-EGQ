import React from "react";
import "./Modal.css";
import { useState } from "react";
import user2 from "../../assets/images/user2.png";

const Modal = (props) => {
  const getUser = () => {
    var user = sessionStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    } else {
      return [];
    }
  };
  const [userName, setUserName] = useState(getUser());

  const Signout = () => {
    window.sessionStorage.clear();
    window.location.replace("/slack-clone-egq/login");
  };

  const { show, close } = props;

  if (!show) {
    return null;
  }

  return (
    <>
      <div className="profileModal">
        <div>
          <img src={user2} alt="User" className="image-main" />
        </div>
        <div className="profileName"> {userName.email}</div>
        <div className="Signout" onClick={Signout}>
          Sign out
        </div>
      </div>
    </>
  );
};
export default Modal;
