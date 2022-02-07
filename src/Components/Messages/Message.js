import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageInput from "./MessageInput";
import MessageScreen from "./MessageScreen";
import { sendMessageToServer, fetchMessages } from "../../Utils/api";
import { createUniqueArray } from "../../Utils/handleArrays";
import MessageHeader from "./MessageHeader";

const Message = ({
  users,
  userChannels,
  headerList,
  userDetails,
  messageTitle,
  messageWasSent,
}) => {
  const [receiver, setReceiver] = useState(null);
  const [messageClass, setMessageClass] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messageDisplay, setMessageDisplay] = useState(null);
  let params = useParams();

  //Handle Receiver
  useEffect(() => {
    setIsLoading(true);
    let routeParam = params.uid.split("_");
    if (routeParam[0] === "Channel") {
      if (userChannels) {
        let channelData = getChannel(parseInt(routeParam[1]));
        setReceiver(channelData);
        setMessageClass(routeParam[0]);
      }
    } else {
      if (users) {
        let receiverData = getUser(parseInt(routeParam[1]));
        setReceiver(receiverData);
        setMessageClass(routeParam[0]);
      }
    }
  }, [messageTitle, users]);

  const getUser = (id) => {
    return users.find((user) => user.id === id);
  };

  const getChannel = (id) => {
    return userChannels.find((channel) => channel.id === id);
  };

  //Handle Messages
  useEffect(() => {
    setIsLoading(true);
    if (receiver) {
      getMessages();
    }
  }, [receiver]);

  const filterMessages = (messages) => {
    let uniqueMessages = createUniqueArray(messages);

    return uniqueMessages;
  };

  const getMessages = async () => {
    const messages = await fetchMessages(headerList, messageClass, receiver.id);
    const filteredMessages = filterMessages(messages.data);

    setMessageDisplay(filteredMessages);
    setIsLoading(false);
  };

  const sendMessage = async (message) => {
    setIsLoading(true);
    const newMsg = await sendMessageToServer(
      headerList,
      receiver.id,
      message,
      messageClass
    );

    newMsg.data.sender = userDetails;
    setMessageDisplay([...messageDisplay, newMsg.data]);
    if (messageClass === "User") messageWasSent(receiver);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div className="outletWrapper">...Loading</div>;
  }

  return (
    <div className="outletWrapper">
      <MessageHeader receiver={receiver} />
      <div className="messageDisplay">
        <MessageScreen
          headerList={headerList}
          receiver={receiver}
          messageDisplay={messageDisplay}
        />
      </div>
      <div className="messageFooter">
        <MessageInput
          headerList={headerList}
          receiver={receiver}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Message;
