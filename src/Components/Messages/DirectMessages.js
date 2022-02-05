import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchRecentMsgs } from "../../Utils/api";
import { createUniqueArray } from "../../Utils/handleArrays";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import { IconContext } from "react-icons";

const DirectMessages = ({ headerList, changeReceiver, messageSent }) => {
  const [recentMessages, setRecentMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setisCollapsed] = useState(true);
  const collapsibleContent = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    if (headerList) {
      getDirectMessages();
    }
  }, [messageSent]);

  const getDirectMessages = async () => {
    const recentDMs = await fetchRecentMsgs(headerList);
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
      <button className="collapsibleWrapper" onClick={handleCollapse}>
        <IconContext.Provider value={{ color: "white", size: "20px" }}>
          <div>{isCollapsed ? <AiFillCaretRight /> : <AiFillCaretDown />}</div>
        </IconContext.Provider>
        <h3>Direct Messages</h3>
      </button>
      <nav className="collapsibleContent" ref={collapsibleContent}>
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
