import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { getChannelDetails } from "../../Utils/channelAPI";
import { useState } from "react";

const ChannelMessages = () => {
  const [channelDetails, setChannelDetails] = useState({});

  let params = useParams();
  let channelId = params.channelId;
  
  useEffect(() => {
    const fetchChannelDetails = async () => {
      const header = JSON.parse(sessionStorage.getItem("header"));
      const channelDetails = await getChannelDetails(
        channelId,
        header.accessToken,
        header.client,
        header.expiry,
        header.uid
      );

      setChannelDetails(channelDetails);      
    };

    fetchChannelDetails().catch(console.error);
  }, [channelId]);

  return (
    <div>
      <p>Hello!</p>
      {channelDetails.data !== undefined ? (
        channelDetails.data.id + " " + channelDetails.data.name
      ) : (
        <p>Loading messages</p>
      )}
    </div>
  );
};

export default ChannelMessages;
