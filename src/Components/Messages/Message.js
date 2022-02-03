import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageInput from "./MessageInput";
import MessageScreen from "./MessageScreen";

const Message = ({ users, headerList, userDetails, receiverEmail }) => {
  const [receiver, setReceiver] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (users) {
      let receiverData = getUser(parseInt(params.uid));
      setReceiver(receiverData);
      setIsLoading(false);
    }
  }, [receiverEmail, users]);
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
      <MessageScreen
        userDetails={userDetails}
        headerList={headerList}
        receiver={receiver}
      />
      <MessageInput headerList={headerList} receiver={receiver} />
    </div>
  );
};

export default Message;
