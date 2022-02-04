import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchRecentMsgs } from "../../Utils/api";
import { createUniqueArray } from "../../Utils/createUniqueArray";

const DirectMessages = ({ headerList, changeReceiver }) => {
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

    setRecentMessages(uniqueUsers);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <p>Messages</p>
      <nav>
        {recentMessages.map((user) => {
          return (
            <NavLink
              style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "green" : "",
                };
              }}
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
