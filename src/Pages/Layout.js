import { Outlet, Link } from "react-router-dom";
import Channels from "../Components/Channels/Channels";
// import Messages from "../Components/Messages/Messages";
// import Login from "../Components/Login/Login";
import Header from "../Components/Header/Header";
import DirectMessages from "../Components/Messages/DirectMessages";

const Layout = ({ headerList, changeReceiver, receiverEmail, messageSent }) => {
  return (
    <div className="wrapper">
      <Header />
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
