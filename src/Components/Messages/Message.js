import { useParams } from "react-router-dom";

const Message = ({ users }) => {
  let params = useParams();

  const getUser = (id) => {
    return users.find((user) => user.id === id);
  };

  let user = getUser(parseInt(params.uid));

  return (
    <div>
      <p>{user.uid}</p>
    </div>
  );
};

export default Message;
