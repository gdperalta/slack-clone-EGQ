const MessageHeader = ({ receiver }) => {
  return (
    <div className="messageHeader">
      <span className="icon">{receiver.uid.charAt(0).toUpperCase()}</span>
      <h3>{receiver.uid}</h3>
    </div>
  );
};

export default MessageHeader;
