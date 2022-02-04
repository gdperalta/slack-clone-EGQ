import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageInput from "./MessageInput";
import MessageScreen from "./MessageScreen";
import { sendMessageToServer, fetchMessages } from "../../Utils/api";
import { createUniqueArray } from "../../Utils/createUniqueArray";

const Message = ({ users, headerList, userDetails, receiverEmail }) => {
  const [receiver, setReceiver] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messageDisplay, setMessageDisplay] = useState(null);
  let params = useParams();

  //Handle Receiver
  useEffect(() => {
    setIsLoading(true);
    if (users) {
      let receiverData = getUser(parseInt(params.uid));
      setReceiver(receiverData);
    }
  }, [receiverEmail, users]);

  const getUser = (id) => {
    return users.find((user) => user.id === id);
  };

  //Handle Messages
  useEffect(() => {
    setIsLoading(true);
    if (receiver) {
      getMessages();
    }
  }, [receiver]);

  const getMessages = async () => {
    const messages = await fetchMessages(headerList, receiver.id);
    const uniqueMessages = createUniqueArray(messages.data);

    setMessageDisplay(uniqueMessages);
    setIsLoading(false);
  };

  const sendMessage = async (message) => {
    setIsLoading(true);
    const newMsg = await sendMessageToServer(headerList, receiver.id, message);

    newMsg.data.sender = userDetails;
    setMessageDisplay([...messageDisplay, newMsg.data]);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <p>{receiver.uid}</p>
      <p>{receiver.id}</p>
      <MessageScreen
        userDetails={userDetails}
        headerList={headerList}
        receiver={receiver}
        messageDisplay={messageDisplay}
      />
      <MessageInput
        headerList={headerList}
        receiver={receiver}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Message;
