import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { fetchRecentMsgs } from "../../Utils/api";
import { createUniqueArray } from "../../Utils/handleArrays";
import {
  AiFillCaretRight,
  AiFillCaretDown,
  AiOutlinePlus,
} from "react-icons/ai";
import { IconContext } from "react-icons";

const DirectMessages = ({ headerList, changeMessageDisplay, messageSent }) => {
  const [recentMessages, setRecentMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setisCollapsed] = useState(true);
  const collapsibleContent = useRef(null);

  useEffect(() => {
    if (messageSent) {
      let oldUser = recentMessages.find((user) => user.uid === messageSent.uid);

      if (oldUser) {
        return;
      }
    }
    setIsLoading(true);
    if (headerList) {
      getDirectMessages();
    }
  }, [messageSent]);

  const getDirectMessages = async () => {
    const recentDMs = await fetchRecentMsgs(headerList).catch(console.error);
    const uniqueUsers = createUniqueArray(recentDMs.data);

    setRecentMessages(uniqueUsers);

    setIsLoading(false);
  };

  const handleCollapse = () => {
    isCollapsed === true ? setisCollapsed(false) : setisCollapsed(true);

    if (collapsibleContent.current.style.maxHeight) {
      collapsibleContent.current.style.maxHeight = null;
    } else {
      collapsibleContent.current.style.maxHeight =
        collapsibleContent.current.scrollHeight + "px";
    }
  };

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <div className="directMsgBtn">
        <button className="collapsibleWrapper" onClick={handleCollapse}>
          <IconContext.Provider value={{ color: "white", size: "20px" }}>
            <div>
              {isCollapsed ? <AiFillCaretRight /> : <AiFillCaretDown />}
            </div>
          </IconContext.Provider>
          <h3>Direct Messages</h3>
        </button>
        <Link
          to="/users"
          className="addUserButton"
          title="Open a Direct Message"
        >
          <IconContext.Provider value={{ color: "white", size: "20px" }}>
            <div>
              <AiOutlinePlus />
            </div>
          </IconContext.Provider>
        </Link>
      </div>
      <nav className="collapsibleContent" ref={collapsibleContent}>
        {recentMessages.map((user) => {
          return (
            <NavLink
              className={({ isActive }) =>
                isActive ? "recentMessages activeMsg" : "recentMessages"
              }
              to={`/User_${user.id}`}
              key={user.id}
              onClick={changeMessageDisplay}
            >
              <span className="iconDM">{user.uid.charAt(0).toUpperCase()}</span>
              <span>{user.uid.split("@")[0]}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default DirectMessages;
