import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import MessageInput from "./MessageInput";
import MessageScreen from "./MessageScreen";
import { sendMessageToServer, fetchMessages } from "../../Utils/api";
import { createUniqueArray } from "../../Utils/handleArrays";
import MessageHeader from "./MessageHeader";
import { ErrorMessage } from "../../Pages/Errors";

const Message = ({
  users,
  userChannels,
  headerList,
  userDetails,
  messageTitle,
  messageWasSent,
}) => {
  const [receiver, setReceiver] = useState(null);
  const [channelOwner, setChannelOwner] = useState(null);
  const [messageClass, setMessageClass] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [messageDisplay, setMessageDisplay] = useState(null);
  let params = useParams();
  let location = useLocation();

  //Handle Receiver
  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    let chatType = location.pathname.split("/")[1];
    if (chatType === "Channel") {
      if (userChannels) {
        let channelData = getChannel(parseInt(params.uid));
        if (!channelData) {
          setIsError(true);
          return;
        }

        let currentOwner = getUser(channelData.owner_id);

        if (receiver === channelData) {
          setIsLoading(false);
          return;
        }

        setReceiver(channelData);
        setMessageClass(chatType);
        setChannelOwner(currentOwner);
      }
    } else {
      if (users) {
        let receiverData = getUser(parseInt(params.uid));

        if (!receiverData) {
          setIsError(true);
          return;
        }

        if (receiver === receiverData) {
          setIsLoading(false);
          return;
        }

        setReceiver(receiverData);
        setMessageClass(chatType);
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
    const messages = await fetchMessages(
      headerList,
      messageClass,
      receiver.id
    ).catch(console.error);
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

  if (isError) {
    return (
      <div className="outletWrapper">
        <ErrorMessage chatType={location.pathname.split("/")[1]} />
      </div>
    );
  }

  if (isLoading) {
    return <div className="outletWrapper">...Loading</div>;
  }

  return (
    <div className="outletWrapper">
      <MessageHeader receiver={receiver} />
      <div className="messageDisplay">
        <MessageScreen
          receiver={receiver}
          messageDisplay={messageDisplay}
          channelOwner={channelOwner}
        />
      </div>
      <div className="messageFooter">
        <MessageInput receiver={receiver} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Message;
