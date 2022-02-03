import { useEffect, useState } from "react";
import {
  useLocation,
  Outlet,
  NavLink,
  useSearchParams,
} from "react-router-dom";
import { fetchRecentMsgs } from "../../Utils/api";

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

    const uniqueUsers = recentDMs.data.filter((item, index) => {
      const i = recentDMs.data.findIndex((user) => {
        return user.uid === item.uid;
      });
      return i === index;
    });

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
