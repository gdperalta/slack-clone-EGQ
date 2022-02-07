import { FaLock } from "react-icons/fa";

const MessageHeader = ({ receiver }) => {
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
        </div>
      )}
    </>
  );
};

export default MessageHeader;
