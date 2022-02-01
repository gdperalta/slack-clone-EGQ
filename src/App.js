import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./assets/styles/css/App.css";
import { logIn } from "./Utils/api";
import { useContext, useEffect } from "react";
import { getHeaders } from "./Utils/getHeaders";
import { UserContext } from "./Contexts/context";

const App = () => {
  const { headerList, setHeaderList } = useContext(UserContext);

  useEffect(() => {
    logInUser();
  }, []);

  const logInUser = async () => {
    const userData = await logIn();
    const userHeader = getHeaders(userData);
    setHeaderList(userHeader);
  };

  return (
    <div className="wrapper">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default App;
