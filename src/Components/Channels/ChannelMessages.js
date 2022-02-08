import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { getChannelDetails } from "../../Utils/api";
import { useState } from "react";
import AddNewChannel from "./AddNewChannel";

const ChannelMessages = () => {
  const [channelDetails, setChannelDetails] = useState({});
  const [show, setShow] = useState(true);

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

      console.log(channelDetails);
      setChannelDetails(channelDetails);
    };

    fetchChannelDetails().catch(console.error);
  }, [channelId]);

  return (
    <div className="messageWrapper">
      <div className="channel-add-member-button" onClick={() => setShow(true)}>
        Add members
      </div>
      <AddNewChannel
        title="Create new channel"
        onClose={() => setShow(false)}
        show={show}        
      />
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
