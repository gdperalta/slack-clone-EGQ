import { response } from "msw";
import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  createChannel,
  addNewMemberToChannel,
  getChannelDetails,
  fetchUsers,
} from "../../Utils/api";

const AddNewChannel = ({
  title,
  channelId,
  selectedChannelName,
  toggleAddUsers,
  show,
  onClose,
  getChannels,
}) => {
  let navigate = useNavigate();
  const [channelName, setChannelName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [users, setUsers] = useState(null);
  const [members, setMembers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [selectedUserIDs, setSelectedUserIDs] = useState([]);
  const [isShowAddUsers, setIsShowAddUsers] = useState(toggleAddUsers);
  const [errors, setErrors] = useState(null);
  const [showErrorChannelExists, setShowErrorChannelExists] = useState(false);
  const [showErrorChannelTooShort, setshowErrorChannelTooShort] =
    useState(false);
  const [showErrorChannelTooLong, setshowErrorChannelTooLong] = useState(false);

  //Notes: changes on the states trigger re-rendering
  //useEffects run at first then runs again if a dependency changes
  useEffect(() => {
    const getUsers = async () => {
      const headerList = JSON.parse(sessionStorage.getItem("header"));

      const data = await fetchUsers(headerList);
      if (data.data) setUsers(data.data);
    };

    getUsers().catch(console.error);
  }, []);

  useEffect(() => {
    const getMembers = async () => {
      const headerList = JSON.parse(sessionStorage.getItem("header"));

      const data = await getChannelDetails(channelId, headerList);
      if (data.data) setMembers(data.data.channel_members);
    };

    getMembers().catch(console.error);
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

  const handleChange = (event) => {
    event.preventDefault();

    if (event.target.name === "channelName") {
      setChannelName(event.target.value);
    } else if (event.target.name === "filterEmailAdd") {
      setFilterEmail(event.target.value);
    }
  };

  const registerChannel = async () => {
    const header = JSON.parse(sessionStorage.getItem("header"));
    const result = await createChannel(channelName, selectedUserIDs, header);

    if (result.errors) {
        setErrors(result.errors);

      if (result.errors[0] === "Name is too short (minimum is 3 characters)")
        setshowErrorChannelTooShort(true);
      else if (result.errors[0] === "Name is too long (maximum is 15 characters)")
        setshowErrorChannelTooLong(true);
      else if (result.errors[0] === "Name has already been taken")
        setShowErrorChannelExists(true);
    } else {
      setChannelName("");
      setFilterEmail("");
      setFilteredUsers(null);
      setSelectedUserIDs([]);
      onClose();
      getChannels();
      navigate("/");
    }
  };

  const registerNewMembersToChannel = async () => {
    const header = JSON.parse(sessionStorage.getItem("header"));

    var result = {};
    selectedUserIDs.map((userId) => {
      addNewMemberToChannel(channelId, userId, header)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    if (result.errors !== undefined) {
    } else {
      setChannelName("");
      setFilterEmail("");
      setFilteredUsers(null);
      setSelectedUserIDs([]);
      onClose();
    }
  };

  const getMembers = async () => {
    const headerList = JSON.parse(sessionStorage.getItem("header"));

    const data = await getChannelDetails(channelId, headerList);
    return data.data.channel_members;
  };

  const AddToSelectedUsers = (id) => {
    if (channelId) {
      if (members.find(({ user_id }) => user_id == id) !== undefined)
        alert("User is already a member");
      else {
        setSelectedUserIDs([...selectedUserIDs, id]);
        setFilterEmail("");
      }
    } else {
      setSelectedUserIDs([...selectedUserIDs, id]);
      setFilterEmail("");
    }
  };

  const renderFilteredUsers = () => {
    if (filteredUsers !== null) {
      return filteredUsers.map((item) => {
        return (
          <div
            style={{ cursor: "pointer", paddingBottom: "10px", color: "black" }}
            key={item.id}
            onClick={AddToSelectedUsers.bind(this, item.id)}
          >
            <span> {item.email} </span>
          </div>
        );
      });
    }
  };

  const getSpecificUser = (user_id) => {
    return users.find(({ id }) => id === user_id);
  };

  const removeFromSelectedUsers = (id) => {
    selectedUserIDs.pop(id);
    setSelectedUserIDs([...selectedUserIDs]);
  };

  const renderSelectedUsers = () => {
    return (
      <div className="channel-user-selected-userlist">
        {selectedUserIDs.map((id, index) => {
          return (
            <div className="selected-user" key={index}>
              {getSpecificUser(id).email}
              <a onClick={removeFromSelectedUsers.bind(this, id)}> X</a>
            </div>
          );
        })}
      </div>
    );
  };

  const showAddUsers = (e) => {
    e.preventDefault();
    setIsShowAddUsers(true);
  };

  const saveChannel = () => {
    if (channelId) {
      registerNewMembersToChannel();
    } else {
      registerChannel();
    }
  };

  return (
    <div className={`modal ${show ? "show" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {!isShowAddUsers ? (
          <div className="modal-header">
            <h4 className="modal-title">{title} </h4>
          </div>
        ) : (
          <div className="modal-header">
            <h4 className="modal-title">
              <span>Add members to </span>
              <span
                id="channel-name"
                style={errors ? { fontSize: ".8em", color: "red" } : null}
              >
                {selectedChannelName ? selectedChannelName : channelName}
              </span>
            </h4>
          </div>
        )}
        <div className="modal-body">
          {!isShowAddUsers ? (
            /* For setting the channel name */
            <div
              id="set-channel-name"
              style={{ position: "relative", marginBottom: "10px" }}
            >
              <span style={{ fontSize: ".8em", color: "black" }}>
                Channels are where your team communicates. They're best when
                organized around a topic - #programming for example.
              </span>
              <div
                style={{
                  paddingTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label
                  style={{
                    fontWeight: "bold",
                    fontSize: ".8em",
                    color: "black",
                  }}
                >
                  Channel Name
                </label>
                <input
                  style={{ marginTop: "10px", padding: "10px" }}
                  type="text"
                  name="channelName"
                  value={channelName}
                  onChange={handleChange}
                  placeholder="#programming"
                />
                <button
                  onClick={showAddUsers}
                  style={{
                    alignSelf: "flex-end",
                    cursor: "pointer",
                    width: "100px",
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            /* For adding users to the channel */
            <div
              id="user-selection"
              style={{
                position: "relative",
              }}
            >
              <div>
                <input
                  type="search"
                  name="filterEmailAdd"
                  placeholder="Search by name or email address"
                  value={filterEmail}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    padding: "10px",
                  }}
                />
                <div style={{ position: "relative" }}>
                  <div className="channel-user-custom-dropdown">
                    {renderFilteredUsers()}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h4 style={{ color: "black" }}>Selected users</h4>
                  <div>{renderSelectedUsers()}</div>
                  <button
                    style={{ alignSelf: "flex-end" }}
                    className="channel-save-channel-button"
                    onClick={saveChannel}
                  >
                    Done
                  </button>
                </div>
                {showErrorChannelExists ? (
                  <h5 style={{ color: "red" }}>{errors[0]}</h5>
                ) : null}
                {showErrorChannelTooShort ? (
                  <h5 style={{ color: "red" }}>{errors[0]}</h5>
                ) : null}
                {showErrorChannelTooLong ? (
                  <h5 style={{ color: "red" }}>{errors[0]}</h5>
                ) : null}
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
};

export default AddNewChannel;
