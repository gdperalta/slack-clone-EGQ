import React from "react";
import { useState, useEffect } from "react";
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
  const [showErrorChannelIsBlank, setShowErrorChannelIsBlank] = useState(false);
  const [showErrorChannelTooShort, setshowErrorChannelTooShort] = useState(false);
  const [showErrorChannelTooLong, setshowErrorChannelTooLong] = useState(false);
  const [showErrorOnExistingMember, setShowErrorOnExistingMember] = useState(false);

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

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.name === "channelName") {
      if (e.target.value === "") setShowErrorChannelIsBlank(true);
      else setShowErrorChannelIsBlank(false);
      setChannelName(e.target.value);
    } else if (e.target.name === "filterEmailAdd") {
      setFilterEmail(e.target.value);
    }
  };

  const registerChannel = async () => {
    const header = JSON.parse(sessionStorage.getItem("header"));
    const result = await createChannel(channelName, selectedUserIDs, header);

    setErrors(result.errors);

    if (result.errors) {
      if (result.errors[0] === "Name can't be blank")
        setShowErrorChannelIsBlank(true);
      else if (
        result.errors[0] === "Name is too short (minimum is 3 characters)"
      )
        setshowErrorChannelTooShort(true);
      else if (
        result.errors[0] === "Name is too long (maximum is 15 characters)"
      )
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
        setShowErrorOnExistingMember(true);
      else {
        setShowErrorOnExistingMember(false);
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
            className="channel-user-custom-dropdown-item"
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

  const showAddUsers = () => {
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
            <div id="set-channel-name">
              <span className="modal-subtitle">
                Channels are where your team communicates. They're best when
                organized around a topic - #programming for example.
              </span>
              <div className="channel-details-container">
                <label className="channel-name-label">Channel Name</label>
                <input className="channel-name-input"
                  type="text"
                  name="channelName"
                  data-testid="input-channel-name"
                  value={channelName}
                  onChange={handleChange}
                  placeholder="#programming"
                />
                {showErrorChannelIsBlank ? (<h5 className="error-message">Name cannot be blank</h5>) : null}
                <button className="channel-next"
                  onClick={() =>
                    channelName !== ""
                      ? showAddUsers()
                      : setShowErrorChannelIsBlank(true)
                  }                  
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            /* For adding users to the channel */
            <div
              id="user-selection"
              className="channel-user-container"             
            >
              <div style={{position: "relative"}}>
                <input className="channel-user-filter"
                  type="search"
                  name="filterEmailAdd"
                  placeholder="Search by name or email address"
                  value={filterEmail}
                  onChange={handleChange}                  
                />
                {showErrorOnExistingMember? <div className="error-message-on-input">User is already a member!</div> : null }
                <div style={{ position: "relative" }}>
                  <div className="channel-user-custom-dropdown">
                    {renderFilteredUsers()}
                  </div>
                </div>
                <div className="channel-selected-users-container">
                  <h4 className="header-label">Selected users</h4>
                  <div>{renderSelectedUsers()}</div>
                  <button className="channel-save-channel-button"
                    onClick={saveChannel}
                  >
                    Done
                  </button>
                </div>
                {showErrorChannelExists ||
                showErrorChannelTooShort ||
                showErrorChannelTooLong ? (
                  <h5 className="error-message">{errors[0]}</h5>
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
