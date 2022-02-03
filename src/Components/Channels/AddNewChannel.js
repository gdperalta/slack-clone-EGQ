import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { createChannel } from "../../Utils/channelAPI";
import { fetchUsers } from "../../Utils/api";
import "../../assets/styles/css/App.css";

const AddNewChannel = (props) => {
  let navigate = useNavigate();
  const [channelName, setChannelName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [users, setUsers] = useState(null);
  const headerList = JSON.parse(sessionStorage.getItem("header"));

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers(headerList);
      setUsers(data.data);
    };

    getUsers().catch(console.error);
  }, []);

  const handleChange = (event) => {
    event.preventDefault();

    if (event.target.name === "channelName") {
      setChannelName(event.target.value);
    } else if (event.target.name === "filterEmailAdd") {
      setFilterEmail(event.target.value);
    }
  };

  const registerChannel = async (event) => {
    event.preventDefault();

    const header = JSON.parse(sessionStorage.getItem("header"));
    const result = await createChannel(channelName, header);
    console.log(result);
    props.onClose();
    navigate("/");
  };

  return ReactDOM.createPortal(
    <div
      className={`modal ${props.show ? "show" : ""}`}
      onClick={props.onClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title"> {props.title}</h4>
        </div>
        <div className="modal-body">
          <form onSubmit={registerChannel}>
            <label>Channel Name: </label>
            <input
              type="text"
              name="channelName"
              value={channelName}
              onChange={handleChange}
            />
            <div>
              <div>
                <h4>Add members</h4>
                <input
                  type="search"
                  name="filterEmailAdd"
                  placeholder="Search by name or email address"
                  value={filterEmail}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input value="Save" type="submit" />
              </div>
            </div>
          </form>
           { users!= null  ? ( users
            .filter((user) => {
              return user.uid.startsWith("gdp");
            })
            .map((item, index) => {
              return (
                <div key={index}>
                  <span> {item.email} </span>
                </div>
              );
            })) : ""}  
        </div>
        <div className="modal-footer">
          <button onClick={props.onClose} className="button">
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("root")
  );

  /* return (
    <div>
      <ChannelModal
        title="My modal"
        users={users}
        onClose={() => {
          setShow(false);
          navigate("/");
        }}
        show={show}
        
      >
        
      </ChannelModal>
    </div>
  ); */
};

export default AddNewChannel;
