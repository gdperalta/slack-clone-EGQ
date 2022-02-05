import { Outlet, Link } from "react-router-dom";
import Channels from "../Components/Channels/Channels";
import Messages from "../Components/Messages/Messages";
import Login from "../Components/Login/Login";


export const Layout = () => {
  return (
    <div className="wrapper">
      <div className="sidebar-wrapper">
        <nav>
          <Link to="/users">Users</Link>
          <Channels />
          <Messages />
        </nav>
      </div>
      <Outlet />
    </div>
  );
};
