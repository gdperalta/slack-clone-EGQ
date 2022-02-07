import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  createChannel,
  addNewMemberToChannel,
  fetchUsers,
} from "../../Utils/api";
import { FaPeopleArrows } from "react-icons/fa";

const AddNewChannel = (props) => {
  let navigate = useNavigate();
  const [channelName, setChannelName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [selectedUserIDs, setSelectedUserIDs] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const headerList = JSON.parse(sessionStorage.getItem("header"));

      const data = await fetchUsers(headerList);
      setUsers(data.data);
    };

    getUsers().catch(console.error);
  }, []);

  useEffect(() => {
    if (users !== null) {
      if (filterEmail !== "") {
        setFilteredUsers(
          users.filter((user) => {
            return user.uid.startsWith(filterEmail);
          })
        );
      } else {
        setFilteredUsers(null);
      }
    }
  }, [filterEmail]);

  useEffect(() => {
    console.log(selectedUserIDs);
  }, [selectedUserIDs]);

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
    const result = await createChannel(channelName, selectedUserIDs, header);

    if (result.errors !== undefined) {
      if (result.errors[0] == "Name has already been taken")
        alert("Name has already been taken");
    } else {
      setChannelName("");
      setFilterEmail("");
      setFilteredUsers(null);
      setSelectedUserIDs([]);
      props.onClose();
      navigate("/");
    }
  };

  const registerNewMembersToChannel = async (event) => {
    event.preventDefault();

    const header = JSON.parse(sessionStorage.getItem("header"));
    const result = await addNewMemberToChannel(2198, 1629, header);

    if (result.errors !== undefined) {
      console.log(result.errors);
    } else {
      setChannelName("");
      setFilterEmail("");
      setFilteredUsers(null);
      setSelectedUserIDs([]);
      props.onClose();
      navigate("/");
    }
  };

  const AddToSelectedUsers = (id) => {
    setSelectedUserIDs([...selectedUserIDs, id]);
  };

  const renderFilteredUsers = () => {
    if (filteredUsers !== null) {
      return filteredUsers.map((item) => {
        return (
          <div key={item.id}>
            <span> {item.email} </span>
            <FaPeopleArrows
              className="channel-user-add-user"
              id={item.id}
              onClick={AddToSelectedUsers.bind(this, item.id)}
              style={{ position: "absolute", right: "10px" }}
            />
          </div>
        );
      });
    }
  };

  const getSpecificUser = (user_id) => {
    return users.find(({ id }) => id === user_id);
  };

  const renderSelectedUsers = () => {
    return selectedUserIDs.map((item, index) => {
      return <p key={index}>{getSpecificUser(item).email}</p>;
    });
  };

  return ReactDOM.createPortal(
    <div
      className={`modal ${props.show ? "show" : ""}`}
      onClick={props.onClose}
    >
      {console.log(props.mode)}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {props.mode === "createChannel" ? (
          <div className="modal-header">
            <h4 className="modal-title">{props.title} </h4>
            <span>
              Channels are where your team communicates. They're best when
              organized around a topic - #programming for example.
            </span>
          </div>
        ) : (
          <div className="modal-header">
            <h4 className="modal-title"><span>Add new members to </span> {props.channelName} </h4>
          </div>
        )}

        {props.mode === "createChannel" ? (
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
                <div style={{ position: "relative" }}>
                  <input
                    type="search"
                    name="filterEmailAdd"
                    placeholder="Search by name or email address"
                    value={filterEmail}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                  />
                  <div style={{ position: "relative" }}>
                    <div className="channel-user-custom-dropdown">
                      {renderFilteredUsers()}
                    </div>
                  </div>
                  <div>
                    <h4>Selected users</h4>
                    <div>{renderSelectedUsers()}</div>
                    <input
                      className="channel-save-channel-button"
                      value="Create Channel"
                      type="submit"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="modal-body">
            <form onSubmit={registerNewMembersToChannel}>
              <div>
                <div style={{ position: "relative" }}>
                  <input
                    type="search"
                    name="filterEmailAdd"
                    placeholder="Search by name or email address"
                    value={filterEmail}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                  />
                  <div style={{ position: "relative" }}>
                    <div className="channel-user-custom-dropdown">
                      {renderFilteredUsers()}
                    </div>
                  </div>
                  <div>
                    <h4>Selected users</h4>
                    <div>{renderSelectedUsers()}</div>
                    <input
                      className="channel-save-new-member-to-channel-button"
                      value="Save new members"
                      type="submit"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        <div className="modal-footer"></div>
      </div>
    </div>,
    document.getElementById("root")
  );
};

export default AddNewChannel;
