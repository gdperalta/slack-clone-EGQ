import { useState } from "react";
import { MdSend } from "react-icons/md";
import { IconContext } from "react-icons";

const MessageInput = ({ sendMessage, receiver }) => {
  const [message, setMessage] = useState("");

  const enterKey = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      sendMessage(message);
    }
  };

  return (
    <div className="inputWrapper">
      <input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyDown={message ? enterKey : null}
        placeholder={
          receiver.email
            ? `Message ${receiver.email.split("@")[0]}`
            : `Message Channel: ${receiver.name}`
        }
      />

      <button
        className={message ? "" : "disabledButton"}
        onClick={() => sendMessage(message)}
        title="Send Message"
      >
        <IconContext.Provider
          value={{
            color: message ? "#47aa0d" : "rgb(185, 185, 185)",
            size: "25px",
          }}
        >
          <div>
            <MdSend />
          </div>
        </IconContext.Provider>
      </button>
    </div>
  );
};

export default MessageInput;
