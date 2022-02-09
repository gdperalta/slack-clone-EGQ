import { getFullDate, getDate, getTimeOnly } from "../../Utils/handleDate";
import { FaLock } from "react-icons/fa";
import { useEffect, useRef } from "react";

const MessageScreen = ({ receiver, messageDisplay, channelOwner }) => {
  const bottomEl = useRef(null);
  let currentUser, currentDate;

  useEffect(() => {
    if (bottomEl.current) {
      bottomEl.current.scrollIntoView();
    }
  }, []);

  return (
    <div className="messageScreen" scrollTop={(e) => e.target.scrollHeight}>
      {receiver.email ? (
        <div className="messageStart">
          <div className="userInfo">
            <span>{receiver.email.charAt(0).toUpperCase()}</span>
            <div>
              <h3>{receiver.email.split("@")[0]}</h3>
              <i>{receiver.email}</i>
            </div>
          </div>
          <p>
            This is the very beginning of your direct message history with{" "}
            <b>{receiver.email.split("@")[0]}</b>
          </p>
        </div>
      ) : (
        <div className="messageStart">
          <div className="userInfo">
            <div className="channelIcon">
              <FaLock />
            </div>
            <h2>{receiver.name}</h2>
          </div>
          <p>
            {" "}
            {channelOwner.email.split("@")[0]} created this private channel on{" "}
            {getDate(channelOwner.created_at).props.children}. This is the very
            beginning of the <FaLock />
            {receiver.name} channel
          </p>
        </div>
      )}

      {messageDisplay.map((user) => {
        if (
          currentUser === user.sender.email &&
          currentDate === getDate(user.created_at).props.children
        ) {
          return (
            <div key={user.id} className="messageContainer">
              {getTimeOnly(user.created_at)}
              <p key={user.id}>{user.body}</p>
            </div>
          );
        } else {
          currentUser = user.sender.email;
          currentDate = getDate(user.created_at).props.children;
          return (
            <div className="messageContainer" key={user.id}>
              <span className="icon">
                {user.sender.email.charAt(0).toUpperCase()}
              </span>
              <div>
                <div>
                  <h3>{user.sender.email.split("@")[0]}</h3>
                  {getFullDate(user.created_at)}
                </div>
                <p key={user.id}>{user.body}</p>
              </div>
            </div>
          );
        }
      })}
      {/* Added div to scroll into bottom */}
      <div ref={bottomEl}></div>
    </div>
  );
};

export default MessageScreen;
