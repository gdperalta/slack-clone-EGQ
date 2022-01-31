import { useEffect } from "react";
import { registerUser, login, createChannel } from "../api/api";

const Login = () => {
  /* useEffect(() => {
    const fetchData = async () => {
      const data = await registerUser();
      console.log(data);
    };

    fetchData().catch(console.error);
  }, []); */

  useEffect(() => {
    const fetchData = async () => {
      const data = await login();
      console.log(data);
    };

    fetchData().catch(console.error);
  }, []);


  return <div></div>;
};

export default Login;
