import { useEffect, useState } from "react";
import { fetchMessages } from "../../Utils/api";

const MessageScreen = ({ headerList, receiver }) => {
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
      {messageDisplay.map((data) => {
        return <div key={data.id}>{data.body}</div>;
      })}
    </div>
  );
};

export default MessageScreen;
