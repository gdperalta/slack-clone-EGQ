import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchRecentMsgs } from "../../Utils/api";
import { createUniqueArray } from "../../Utils/handleArrays";

const DirectMessages = ({
  headerList,
  changeReceiver,
  receiverEmail,
  messageSent,
}) => {
  const [recentMessages, setRecentMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (headerList) {
      getDirectMessages();
    }
  }, [messageSent]);

  const getDirectMessages = async () => {
    /* if (recentMessages) {
      const i = recentMessages.findIndex((user) => {
        return user.email === receiverEmail;
      });
    } */

    const recentDMs = await fetchRecentMsgs(headerList);
    const uniqueUsers = createUniqueArray(recentDMs.data);

    setRecentMessages(uniqueUsers);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <h3>Messages</h3>
      <nav>
        {recentMessages.map((user) => {
          return (
            <NavLink
              className={({ isActive }) =>
                isActive ? "recentMessages activeMsg" : "recentMessages"
              }
              to={`/${user.id}`}
              key={user.id}
              onClick={changeReceiver}
            >
              {user.uid}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default DirectMessages;
