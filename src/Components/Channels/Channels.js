import React, { useState, useEffect } from "react";
import { getUserChannels } from "../../Utils/channelAPI";
import { logIn } from "../../Utils/api";
import Channel from "./Channel";
import {dummyChannels} from "../../Utils/mockData";

const Channels = () => {
  const [userChannels, setUserChannels] = useState({});

  useEffect(() => {
    const fetchChannels = async () => {
      /*  const header = {};
      const response = await logIn();

      for (let pair of response.headers.entries()) {
        header[pair[0]] = pair[1];
      }
      //console.log(header);

      const channels = await getUserChannels(
        header["access-token"],
        header["client"],
        header["expiry"]
      ); */

     
      setUserChannels(dummyChannels);
    };

    fetchChannels().catch(console.error);
  }, []);

  const renderChannelList = () => {
    return userChannels.data.map((item, index) => {
      return <Channel key={index} name={item.name} />;
    });
  };

  return (
    <div>
      <p>Channels</p>
      {userChannels.data !== undefined ? (
        renderChannelList()
      ) : (
        <p>Error loading channels</p>
      )}
    </div>
  );
};

export default Channels;
