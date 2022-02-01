export const register = async () => {
  var raw = {
    email: "gdp@gmail.com",
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

export const logIn = async () => {
  var raw = { email: "gdp@gmail.com", password: "asdfjkl" };

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
  console.log(await response.text());

  return response;
};

export const fetchUsers = async (data) => {
  const { accessToken, client, expiry, uid } = data;
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
    "http://206.189.91.54//api/v1/users",
    requestOptions
  );
  //console.log(await response.text());

  return await response.json();
};
