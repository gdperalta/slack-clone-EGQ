import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMessages, fetchRecentMsgs } from "../../Utils/api";
import { createUniqueArray } from "../../Utils/handleArrays";
import { getDate, getTime } from "../../Utils/handleDate";

const UserDirectMessages = ({ headerList, userDetails }) => {
  const [recentMessages, setRecentMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (headerList) {
      getDirectMessages();
    }
  }, []);

  const getDirectMessages = async () => {
    const recentDMs = await fetchRecentMsgs(headerList).catch(console.error);
    const uniqueUsers = createUniqueArray(recentDMs.data);
    const messageList = [];

    for (const user of uniqueUsers) {
      const message = await fetchMessages(headerList, "User", user.id).catch(
        console.error
      );
      let i = message.data.length - 1;
      messageList.push(message.data[i]);
    }

    setRecentMessages(messageList);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <div className="userMessagesWrapper">
      {recentMessages.map((message) => {
        if (message)
          return (
            <div className="messageBodyWrapper" key={message.id}>
              {getDate(message.created_at)}
              {userDetails.email === message.sender.email ? (
                <Link
                  to={`/User/${message.receiver.id}`}
                  className="messageBody"
                >
                  <b className="iconUsers">
                    {message.receiver.email.charAt(0).toUpperCase()}
                  </b>
                  <div className="msg">
                    <h3>{message.receiver.email.split("@")[0]}</h3>
                    <span>You: </span>
                    <span>{message.body}</span>
                  </div>
                  {getTime(message.created_at)}
                </Link>
              ) : (
                <Link to={`/User/${message.sender.id}`} className="messageBody">
                  <b className="iconUsers">
                    {message.sender.email.charAt(0).toUpperCase()}
                  </b>
                  <div className="msg">
                    <h3>{message.sender.email.split("@")[0]}</h3>
                    <span>{`${message.sender.email.split("@")[0]}: `}</span>
                    <span>{message.body}</span>
                  </div>
                  {getTime(message.created_at)}
                </Link>
              )}
            </div>
          );
      })}
    </div>
  );
};

export default UserDirectMessages;
