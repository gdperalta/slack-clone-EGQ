import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageInput from "./MessageInput";
import MessageScreen from "./MessageScreen";

const Message = ({ users, headerList }) => {
  const [receiver, setReceiver] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (users) {
      let receiver = getUser(parseInt(params.uid));
      setReceiver(receiver);
      setIsLoading(false);
    }
  }, [users]);
  let params = useParams();

  const getUser = (id) => {
    return users.find((user) => user.id === id);
  };

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <p>{receiver.uid}</p>
      <p>{receiver.id}</p>
      <MessageScreen headerList={headerList} receiver={receiver} />
      <MessageInput headerList={headerList} receiver={receiver} />
    </div>
  );
};

export default Message;
