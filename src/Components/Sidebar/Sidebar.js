import Channels from "../Channels/Channels";
import Messages from "../Messages/Messages";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <nav>
        <Link to="/users">Users</Link>
        <Channels />
        <Messages />
      </nav>
    </div>
  );
};

export default Sidebar;
