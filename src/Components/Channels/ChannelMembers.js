import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { fetchUsers, getChannelDetails } from "../../Utils/api";

const ChannelMembers = ({ channelId, show, onClose }) => {
  const [users, setUsers] = useState(null);
  const [members, setMembers] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const headerList = JSON.parse(sessionStorage.getItem("header"));

      const data = await fetchUsers(headerList);
      setUsers(data.data);
    };

    getUsers().catch(console.error);
  }, []);

  useEffect(() => {
    const getMembers = async () => {
      const headerList = JSON.parse(sessionStorage.getItem("header"));

      const data = await getChannelDetails(channelId, headerList);
      setMembers(data.data.channel_members);
    };

    getMembers().catch(console.error);
  }, []);

  const getSpecificUser = (user_id) => {
    return users ? users.find(({ id }) => id === user_id) : "";
  };

  return ReactDOM.createPortal(
    <div className={`modal ${show ? "show" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Channel members [{members? members.length : 0}]</h4>
        </div>
        <div className="modal-body">
          <div style={{ height: "300px", overflowY: "scroll" }}>
            {members
              ? members.map((item) => {
                  return (
                    <div key={item.id} style={{ paddingBottom: "10px", paddingLeft: "10px" }}>
                      {getSpecificUser(item.user_id).email}
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>,
    document.getElementById("root")
  );
};

export default ChannelMembers;
