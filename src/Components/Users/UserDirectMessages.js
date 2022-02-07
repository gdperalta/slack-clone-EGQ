import { useEffect, useState } from "react";
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
    const recentDMs = await fetchRecentMsgs(headerList);
    const uniqueUsers = createUniqueArray(recentDMs.data);
    const messageList = [];

    for (const user of uniqueUsers) {
      const message = await fetchMessages(headerList, "User", user.id);
      let i = message.data.length - 1;
      messageList.push(message.data[i]);
    }
    console.log(messageList);
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
              <div className="messageBody">
                <div>
                  {userDetails.email === message.sender.email ? (
                    <div>
                      <b className="iconUsers">
                        {message.receiver.email.charAt(0).toUpperCase()}
                      </b>
                      <div className="msg">
                        <h3>{message.receiver.email.split("@")[0]}</h3>
                        <span>You: </span>
                        <span>{message.body}</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <b className="iconUsers">
                        {message.sender.email.charAt(0).toUpperCase()}
                      </b>
                      <div className="msg">
                        <h3>{message.sender.email.split("@")[0]}</h3>
                        <span>{`${message.sender.email.split("@")[0]}: `}</span>
                        <span>{message.body}</span>
                      </div>
                    </div>
                  )}
                </div>

                {getTime(message.created_at)}
              </div>
            </div>
          );
      })}
    </div>
  );
};

export default UserDirectMessages;
