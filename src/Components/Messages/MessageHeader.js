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
          <h2>{receiver.email.split("@")[0]}</h2>
        </div>
      ) : (
        <div className="outletHeader">
          <FaLock />
          <h2>{receiver.name}</h2>
          <div className="channel-details-icon"
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
