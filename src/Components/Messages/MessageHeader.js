import { useState } from "react";
import AddNewChannel from "../Channels/AddNewChannel";
import { FaLock } from "react-icons/fa";

const MessageHeader = ({ receiver }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {receiver.email ? (
        <div className="messageHeader">
          <span className="icon">{receiver.email.charAt(0).toUpperCase()}</span>
          <h3>{receiver.email.split("@")[0]}</h3>
        </div>
      ) : (
        <div className="messageHeader">
          <FaLock />
          <h3>{receiver.name}</h3>
          <div
            className="channel-add-member-button"
            onClick={() => setShow(true)}
          >
            Add members
          </div>
          <AddNewChannel
            title="Create new channel"
            channelName={receiver.name}
            onClose={() => setShow(false)}
            show={show}
            mode="addMember"
          />
        </div>
      )}
    </>
  );
};

export default MessageHeader;
