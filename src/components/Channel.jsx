import { useEffect } from "react";
import {
  registerUser,
  login,
  createChannel,
  getUserChannels,
} from "../api/api";

const Channel = () => {
  useEffect(() => {
    const fetchData = async () => {
     /*  const regUser = await registerUser();
      console.log(regUser); */
            
      const headers = [];

      const loginInfo = await login();
      for (let pair of loginInfo.headers.entries()) {
        const headerElement = {};
        headerElement.token = pair[1];
        headers.push(headerElement);
      } 

       const data = await createChannel(
        headers[0].token,
        headers[2].token,
        headers[4].token
      );
      console.log(data); 

      /* const dataUser = await getUserChannels(
        headers[0].token,
        headers[2].token,
        headers[4].token
      );
      console.log(dataUser); */
    };

    fetchData().catch(console.error);
  }, []);

  return <div></div>;
};

export default Channel;
