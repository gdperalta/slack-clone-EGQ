import React, { useState, useEffect, useRef } from "react";
import Channel from "./Channel";
import AddNewChannel from "./AddNewChannel";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import { IconContext } from "react-icons";

const Channels = ({ changeMessageDisplay, userChannels, getChannels }) => {
  const [show, setShow] = useState(false);
  //Collapsible content
  const [isCollapsed, setisCollapsed] = useState(true);
  const collapsibleContent = useRef(null);

  useEffect(() => {
    getChannels();
  }, [show]);

  const renderChannelList = () => {
    return userChannels.map((item, index) => {
      return (
        <Channel
          key={index}
          id={item.id}
          name={item.name}
          changeMessageDisplay={changeMessageDisplay}
        />
      );
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
      <button
        className="collapsibleWrapper"
        style={{ paddingLeft: "0.5rem" }}
        onClick={handleCollapse}
      >
        <IconContext.Provider value={{ color: "white", size: "20px" }}>
          <div>{isCollapsed ? <AiFillCaretRight /> : <AiFillCaretDown />}</div>
        </IconContext.Provider>
        <h3>Channels</h3>
      </button>
      <nav className="collapsibleContent" ref={collapsibleContent}>
        {userChannels ? renderChannelList() : <p>Loading channels</p>}
        <button onClick={() => setShow(true)}>Add new channel</button>
      </nav>
      <AddNewChannel
        title="Create new channel"
        onClose={() => setShow(false)}
        show={show}
        mode="createChannel"
      />
    </div>
  );
};

export default Channels;
