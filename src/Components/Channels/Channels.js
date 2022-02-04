import React, { useState, useEffect } from "react";
import { getUserChannels } from "../../Utils/channelAPI";
import Channel from "./Channel";
import AddNewChannel from "./AddNewChannel";


const Channels = () => {
  const [userChannels, setUserChannels] = useState({});
  const [show, setShow] = useState(false);
  const header = JSON.parse(sessionStorage.getItem("header"));

  useEffect(() => {
    const fetchChannels = async () => {
      
      const channels = await getUserChannels(header);
      setUserChannels(channels);
    };

    fetchChannels().catch(console.error);
  }, [header,show]);

  const renderChannelList = () => {
    return userChannels.data.map((item, index) => {
      return <Channel key={index} id={item.id} name={item.name} />;
    });
  };

  return (
    <div>
      <p>Channels</p>
      {userChannels.data !== undefined ? (
        renderChannelList()
      ) : (
        <p>Loading channels</p>
      )}
      <button onClick={() => setShow(true)}>Add new channel</button>
      <AddNewChannel
        title="Create new channel"
        onClose={() => setShow(false)}
        show={show}
      />
    </div>
  );
};

export default Channels;
