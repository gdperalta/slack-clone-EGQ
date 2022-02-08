import { useState } from "react";
import sendButton from "../../assets/images/send.png";

const MessageInput = ({ sendMessage, receiver }) => {
  const [message, setMessage] = useState("");

  return (
    <div className="inputWrapper">
      <input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        placeholder={
          receiver.email
            ? `Message ${receiver.email.split("@")[0]}`
            : `Message Channel: ${receiver.name}`
        }
      />

      <button onClick={() => sendMessage(message)}>
        <img src={sendButton} />
      </button>
    </div>
  );
};

export default MessageInput;
