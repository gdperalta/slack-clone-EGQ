export const register = async () => {
  var raw = {
    email: "quevon.com",
    password: "asdfjkl",
    password_confirmation: "asdfjkl",
  };

  var requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(raw),
    redirect: "follow",
  };

  fetch("http://206.189.91.54//api/v1/auth/", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export const logIn = async (email, password) => {
  var raw = { email: email , password: password };

  var requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(raw),
    redirect: "follow",
  };
  const response = await fetch(
    "http://206.189.91.54//api/v1/auth/sign_in",
    requestOptions
  );
  return response;
};

export const fetchUsers = async (headers) => {
  const { accessToken, client, expiry, uid } = headers;
  const myHeaders = new Headers();
  myHeaders.append("access-token", accessToken);
  myHeaders.append("client", client);
  myHeaders.append("expiry", expiry);
  myHeaders.append("uid", uid);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    "http://206.189.91.54//api/v1/users",
    requestOptions
  );
  return await response.json();
};

export const sendMessageToServer = async (headers, receiverID, message) => {
  const { accessToken, client, expiry, uid } = headers;
  const myHeaders = new Headers();
  myHeaders.append("access-token", accessToken);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("client", client);
  myHeaders.append("expiry", expiry);
  myHeaders.append("uid", uid);

  const raw = {
    receiver_id: receiverID,
    receiver_class: "User",
    body: message,
  };

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: "follow",
  };

  const response = await fetch(
    "http://206.189.91.54//api/v1/messages",
    requestOptions
  );

  return await response.json();
};

export const fetchMessages = async (header, id) => {
  const { accessToken, client, expiry, uid } = header;
  var myHeaders = new Headers();
  myHeaders.append("access-token", accessToken);
  myHeaders.append("client", client);
  myHeaders.append("expiry", expiry);
  myHeaders.append("uid", uid);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    `http://206.189.91.54//api/v1/messages?receiver_class=User&receiver_id=${id}`,
    requestOptions
  );

  return await response.json();
};

export const fetchRecentMsgs = async (header, id) => {
  const { accessToken, client, expiry, uid } = header;
  var myHeaders = new Headers();
  myHeaders.append("access-token", accessToken);
  myHeaders.append("client", client);
  myHeaders.append("expiry", expiry);
  myHeaders.append("uid", uid);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    "http://206.189.91.54//api/v1/users/recent",
    requestOptions
  );

  return await response.json();
};
