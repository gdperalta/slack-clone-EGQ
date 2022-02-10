import React, { useState, useEffect, useRef } from "react";
import Channel from "./Channel";
import AddNewChannel from "./AddNewChannel";
import {
  AiFillCaretRight,
  AiFillCaretDown,
  AiOutlinePlus,
} from "react-icons/ai";
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
      collapsibleContent.current.style.maxHeight = "fit-content";
    }
  }; 

  return (
    <div>
      <div className="channels-button">
        <button className="collapsibleWrapper" onClick={handleCollapse}>
          <IconContext.Provider value={{ color: "white", size: "20px" }}>
            <div>
              {isCollapsed ? <AiFillCaretRight /> : <AiFillCaretDown />}
            </div>
          </IconContext.Provider>
          <h3>Channels</h3>
        </button>
        <a
          className="add-channel-button"
          title="Create a new channel"
          onClick={() => setShow(true)}
        >
          <IconContext.Provider value={{ color: "white", size: "20px" }}>
            <div>
              <AiOutlinePlus />
            </div>
          </IconContext.Provider>
        </a>
      </div>
      <nav className="collapsibleContent" ref={collapsibleContent}>
        {userChannels ? renderChannelList() : <p>Loading channels</p>}
      </nav>
      <div role="createChannelButton" className="channel-create-button" onClick={() => setShow(true)}>
        <IconContext.Provider value={{ color: "white", size: "20px" }}>
          <div>
            <AiOutlinePlus />
          </div>
        </IconContext.Provider>
        <a>Add a new channel</a>
      </div>
      {show ? (
        <AddNewChannel
          title="Create a new channel"
          onClose={() => setShow(false)}
          show={show}
          toggleAddUsers={false}
          getChannels={getChannels}          
        />
      ) : null}
    </div>
  );
};

export default Channels;
