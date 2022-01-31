/* async function registerUser() {
  try {
    const result = await fetch("http://206.189.91.54//api/v1/auth/", {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Credentials": true,
      },
      body: {
        email: "ermalagustan@gmail.com",
        password: "12345678",
        password_confirmation: "123456789",
      },
    })
      .then((result) => {
        console.log(result.json());
      })
      .then((result) => console.log(result));

    return result;
  } catch (e) {
    return e;
  }
} */

async function login() {
  try {
    const result = await fetch("http://206.189.91.54//api/v1/auth/sign_in", {
      method: "POST",
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      body: {
        email: "chestergarett19_1@gmail.com",
        password: "password",
      },
    });

    return result;
  } catch (e) {
    return e;
  }
}

/* async function createChannel() {
  try {
    const result = await fetch("http://206.189.91.54//api/v1/channels", {
      method: "POST",
      mode: 'cors',
      credentials: 'same-origin',
      headers: {               
        "access-token": "EbBRhHlxy_onrPLeDoxzbQ",
        client: "YXLnTVh802pqPnrJDNfbqg",
        expiry: 1621406884,
        uid: "chestergarett19_1@gmail.com",
      },
      body: {
        name: "test-channel-egq",
        user_ids: [1, 2],
      },
    });

    return result;
  } catch (e) {}
} */

export { login };
