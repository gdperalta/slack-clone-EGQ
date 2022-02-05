import React, { useState, useEffect, useRef } from "react";
import { getUserChannels } from "../../Utils/channelAPI";
import Channel from "./Channel";
import AddNewChannel from "./AddNewChannel";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import { IconContext } from "react-icons";

const Channels = () => {
  const [userChannels, setUserChannels] = useState({});
  const [show, setShow] = useState(false);
  //Collapsible content
  const [isCollapsed, setisCollapsed] = useState(true);
  const collapsibleContent = useRef(null);

  useEffect(() => {
    const fetchChannels = async () => {
      const header = JSON.parse(sessionStorage.getItem("header"));
      const channels = await getUserChannels(header);
      setUserChannels(channels);
    };

    fetchChannels().catch(console.error);
  }, [show]);

  const renderChannelList = () => {
    return userChannels.data.map((item, index) => {
      return <Channel key={index} id={item.id} name={item.name} />;
    });
  };

  //Collapsible content
  const handleCollapse = () => {
    isCollapsed === true ? setisCollapsed(false) : setisCollapsed(true);

    if (collapsibleContent.current.style.maxHeight) {
      collapsibleContent.current.style.maxHeight = null;
    } else {
      collapsibleContent.current.style.maxHeight =
        collapsibleContent.current.scrollHeight + "px";
    }
  };

  return (
    <div>
      <button className="collapsibleWrapper" onClick={handleCollapse}>
        <IconContext.Provider value={{ color: "white", size: "20px" }}>
          <div>{isCollapsed ? <AiFillCaretRight /> : <AiFillCaretDown />}</div>
        </IconContext.Provider>
        <h3>Channels</h3>
      </button>
      <nav className="collapsibleContent" ref={collapsibleContent}>
        {userChannels.data !== undefined ? (
          renderChannelList()
        ) : (
          <p>Loading channels</p>
        )}
        <button onClick={() => setShow(true)}>Add new channel</button>
      </nav>
      <AddNewChannel
        title="Create new channel"
        onClose={() => setShow(false)}
        show={show}
      />
    </div>
  );
};

export default Channels;
