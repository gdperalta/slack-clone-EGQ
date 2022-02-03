import { useEffect, useState } from "react";
import { fetchMessages } from "../../Utils/api";

const MessageScreen = ({ headerList, receiver, userDetails }) => {
  const [messageDisplay, setMessageDisplay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (receiver) {
      getMessages();
    }
  }, [receiver]);

  const getMessages = async () => {
    const messages = await fetchMessages(headerList, receiver.id);
    setMessageDisplay(messages.data);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <p>Messages</p>
      <div
        className="messageScreen"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {messageDisplay.map((data) => {
          return (
            <div key={data.id}>
              <h3>
                {data.sender.id === userDetails.id
                  ? userDetails.email
                  : data.sender.email}
              </h3>
              <p>{data.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageScreen;