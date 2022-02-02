import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { getChannelDetails } from "../../Utils/channelAPI";
import { logIn } from "../../Utils/api";
import { getHeaders } from "../../Utils/getHeaders";
import { useState } from "react";

const ChannelMessages = () => {
  const [channelDetails, setChannelDetails] = useState({});

  let params = useParams();
  let channelId = params.channelId;
  
  useEffect(() => {
    const fetchChannelDetails = async () => {
      const response = await logIn();
      const header = getHeaders(response);

      const channelDetails = await getChannelDetails(
        channelId,
        header.accessToken,
        header.client,
        header.expiry,
        header.uid
      );

      setChannelDetails(channelDetails);
      console.log(channelDetails);
    };

    fetchChannelDetails().catch(console.error);
  }, [channelId]);

  return (
    <div>
      {" "}
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
