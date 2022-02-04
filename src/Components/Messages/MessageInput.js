import { useState } from "react";

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  return (
    <div>
      <input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={() => sendMessage(message)}>Send</button>
    </div>
  );
};

export default MessageInput;
