import { useState } from "react";
import AddNewChannel from "../Channels/AddNewChannel";
import { FaLock, FaPen } from "react-icons/fa";

const MessageHeader = ({ receiver }) => {
  const [show, setShow] = useState(false);

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
          <div
            className="channel-add-member-button"
            onClick={() => setShow(true)}
          >
            <FaPen />
            Add members
          </div>
          {show ? (
            <AddNewChannel
              title="Create new channel"
              channelId={receiver.id}
              selectedChannelName={receiver.name}
              onClose={() => setShow(false)}
              show={show}
              toggleAddUsers={true}
            />
          ) : null}
        </div>
      )}
    </>
  );
};

export default MessageHeader;
