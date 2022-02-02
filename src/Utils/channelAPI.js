export const createChannel = async (
  channelName,
  accessToken,
  client,
  expiry,
  email
) => {
  try {
    const result = await fetch("http://206.189.91.54//api/v1/channels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        client: client,
        expiry: expiry,
        uid: email,
      },
      body: JSON.stringify({ name: channelName, user_ids: [1629, 1630, 1631] }),
    });

    return result.json();
  } catch (e) {}
};

export const getUserChannels = async (accessToken, client, expiry, email) => {
  try {
    const result = await fetch("http://206.189.91.54//api/v1/channels", {
      method: "GET",
      headers: {
        "access-token": accessToken,
        client: client,
        expiry: expiry,
        uid: email,
      },
    });

    return result.json();
  } catch (e) {
    console.log(e);
  }
};

export const getChannelDetails = async (
  channelID,
  accessToken,
  client,
  expiry,
  email
) => {
  try {
    const result = await fetch("http://206.189.91.54//api/v1/channels/" + channelID, {
      method: "GET",
      headers: {
        "access-token": accessToken,
        client: client,
        expiry: expiry,
        uid: email,
      },
    });

    return result.json();
  } catch (e) {}
};
