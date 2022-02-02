import React, { useState, useEffect } from "react";
import { getUserChannels } from "../../Utils/channelAPI";
import { logIn } from "../../Utils/api";
import Channel from "./Channel";
import { dummyChannels } from "../../Utils/mockData";
import AddNewChannel from "./AddNewChannel";
import { NavLink } from "react-router-dom";
import { getHeaders } from "../../Utils/getHeaders";

const Channels = () => {
  const [userChannels, setUserChannels] = useState({});

  useEffect(() => {
    const fetchChannels = async () => {
      const response = await logIn();
      const header = getHeaders(response);
      
     /*  const channels = await getUserChannels(
        header.accessToken,
        header.client,
        header.expiry,
        header.uid
      ); */

      setUserChannels(dummyChannels);
    };

    fetchChannels().catch(console.error);
  }, []);

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
      <NavLink to="/addNewChannel">Add new channel</NavLink>
    </div>
  );
};

export default Channels;
