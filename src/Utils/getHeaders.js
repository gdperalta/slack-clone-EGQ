export const getHeaders = (data) => {
  const initialHeaders = {};

  for (let pair of data.headers.entries()) {
    initialHeaders[pair[0]] = pair[1];
  }

  const { "access-token": accessToken, client, expiry, uid } = initialHeaders;
  const headers = {
    accessToken: accessToken,
    client: client,
    expiry: expiry,
    uid: uid,
  };

  return headers;
};
