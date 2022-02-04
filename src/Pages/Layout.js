import { Outlet, Link } from "react-router-dom";
import Channels from "../Components/Channels/Channels";
import DirectMessages from "../Components/Messages/DirectMessages";

const Layout = ({ headerList, changeReceiver, receiverEmail, messageSent }) => {
  return (
    <div className="wrapper">
      <div className="sidebar-wrapper">
        <nav>
          <Link to="/users">Message A User</Link>
          <Channels />
          <DirectMessages
            changeReceiver={changeReceiver}
            headerList={headerList}
            receiverEmail={receiverEmail}
            messageSent={messageSent}
          />
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
