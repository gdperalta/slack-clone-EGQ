async function createChannel(accessToken, client, expiry) {
    try {
      const result = await fetch("http://206.189.91.54//api/v1/channels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": accessToken,
          client: client,
          expiry: expiry,
          uid: "ermalagustan@gmail.com",
        },
        body: JSON.stringify({ name: "egq123-2", user_ids: [1631] }),
      });
  
      return result.json();
    } catch (e) {}
  }
  
  async function getUserChannels(accessToken, client, expiry) {
    try {
      const result = await fetch("http://206.189.91.54//api/v1/channels", {
        method: "GET",
        headers: {
          "access-token": accessToken,
          client: client,
          expiry: expiry,
          uid: "ermalagustan@gmail.com",
        },
      });
  
      return result.json();
    } catch (e) {}
  }

  export {createChannel, getUserChannels};