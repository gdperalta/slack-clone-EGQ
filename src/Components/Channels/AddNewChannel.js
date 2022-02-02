import { useState } from "react";
import { createChannel } from "../../Utils/channelAPI";
import { logIn } from "../../Utils/api";
import { getHeaders } from "../../Utils/getHeaders";

const AddNewChannel = () => {
  const [channelName, setChannelName] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setChannelName(event.target.value);
  };

  const showChannelName = async (event) => {
    event.preventDefault();

    const response = await logIn();
    const header = getHeaders(response);

    const result = await createChannel(
      channelName,
      header.accessToken,
      header.client,
      header.expiry,
      header.uid
    );

    console.log(result);
  };

  return (
    <div>
      <form onSubmit={showChannelName}>
        <input
          type="text"
          name="channelName"
          value={channelName}
          onChange={handleChange}
        />
        <input value="Submit" type="submit" />
      </form>
    </div>
  );
};

export default AddNewChannel;
