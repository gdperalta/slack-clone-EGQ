async function registerUser() {
  try {
    const result = await fetch("http://206.189.91.54//api/v1/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "ermalagustan@gmail.com",
        password: "12345678",
        password_confirmation: "12345678",
      }),
    })
      .then((result) => {
        console.log(result.json());
      })
      .then((result) => console.log(result))
      .catch((error) => console.error("Error:", error));

    return result.json();
  } catch (e) {
    return e;
  }
}

async function login() {
  try {
    const result = await fetch("http://206.189.91.54//api/v1/auth/sign_in", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        email: "ermalagustan@gmail.com",
        password: "12345678",
      }),
    });

    return result;
  } catch (e) {
    return e;
  }
}
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

export { registerUser, login, createChannel, getUserChannels };
