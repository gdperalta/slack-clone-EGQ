import { getFullDate, getDate, getTimeOnly } from "../../Utils/handleDate";

const MessageScreen = ({ messageDisplay }) => {
  let currentUser, currentDate;

  return (
    <div className="messageScreen">
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
    </div>
  );
};

export default MessageScreen;
