import { Outlet, Link } from "react-router-dom";
import Channels from "../Components/Channels/Channels";
import DirectMessages from "../Components/Messages/DirectMessages";

const Layout = ({ headerList, changeReceiver }) => {
  return (
    <div className="wrapper">
      <div className="sidebar-wrapper">
        <nav>
          <Link to="/users">Users</Link>
          <Channels />
          <DirectMessages
            changeReceiver={changeReceiver}
            headerList={headerList}
          />
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
