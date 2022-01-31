import { useEffect } from "react";
import { registerUser, login, createChannel, getUserChannels } from "../api/api";

const Channel = () => {
 
  useEffect(() => {
    const fetchData = async () => {
      const data = await createChannel();   
      console.log(data);   
    };

    fetchData().catch(console.error);
  }, []);


  return <div></div>;
};

export default Channel;
