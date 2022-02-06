import React, { useState, useEffect } from "react";
import { getUserChannels } from "../../Utils/api";
import Channel from "./Channel";
import AddNewChannel from "./AddNewChannel";

const Channels = () => {
  const [userChannels, setUserChannels] = useState({});
  const [show, setShow] = useState(false);

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

  return (
    <div>
      <p>Channels</p>
      <nav>
        {userChannels.data !== undefined ? (
          renderChannelList()
        ) : (
          <p>Loading channels</p>
        )}
      </nav>
      <div className="channel-create-button" onClick={() => setShow(true)}>
        <svg
          className="svg-plus-sign"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
        </svg>
        Add new channel
      </div>
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
