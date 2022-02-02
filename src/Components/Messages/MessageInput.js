import { useState } from "react";
import { sendMessageToServer } from "../../Utils/api";

const MessageInput = ({ headerList, receiver }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    sendMessageToServer(headerList, receiver.id, message);
  };

  return (
    <div>
      <input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
