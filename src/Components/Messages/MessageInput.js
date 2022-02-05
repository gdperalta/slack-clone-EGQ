import { useState } from "react";
import sendButton from "../../assets/images/send.png";

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  return (
    <div className="inputWrapper">
      <input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        placeholder="Type a message"
      />

      <button onClick={() => sendMessage(message)}>
        <img src={sendButton} />
      </button>
    </div>
  );
};

export default MessageInput;
