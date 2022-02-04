const MessageHeader = ({ receiver }) => {
  return (
    <div className="messageHeader">
      <h3>{receiver.uid}</h3>
    </div>
  );
};

export default MessageHeader;
