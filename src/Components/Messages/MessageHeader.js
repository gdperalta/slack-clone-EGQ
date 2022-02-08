import { useState } from "react";
import AddNewChannel from "../Channels/AddNewChannel";
import { FaLock, FaInfoCircle, FaPen } from "react-icons/fa";
import ChannelMembers from "../Channels/ChannelMembers";

const MessageHeader = ({ receiver }) => {
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showChannelDetailsModal, setshowChannelDetailsModal] = useState(false);

  return (
    <>
      {receiver.email ? (
        <div className="outletHeader">
          <span className="icon">{receiver.email.charAt(0).toUpperCase()}</span>
          <h3>{receiver.email.split("@")[0]}</h3>
        </div>
      ) : (
        <div className="outletHeader">
          <FaLock />
          <h3>{receiver.name}</h3>
          <div
            style={{ paddingLeft: "3px" }}
            onClick={() => {
              setshowChannelDetailsModal(true);
              
            }}
          >
            <FaInfoCircle
              style={{
                fill: "darkgray",
                cursor: "pointer",
              }}
            />
          </div>

          <div
            className="channel-add-member-button"
            onClick={() => setShowAddMemberModal(true)}
          >
            <FaPen />
            Add members
          </div>
          {showAddMemberModal ? (
            <AddNewChannel
              title="Create new channel"
              channelId={receiver.id}
              selectedChannelName={receiver.name}
              onClose={() => setShowAddMemberModal(false)}
              show={showAddMemberModal}
              toggleAddUsers={true}
            />
          ) : null}

          {showChannelDetailsModal ? (
            <ChannelMembers channelId={receiver.id}
            onClose={() => setshowChannelDetailsModal(false)}
              show={showChannelDetailsModal} />
          ) : null}
        </div>
      )}
    </>
  );
};

export default MessageHeader;
