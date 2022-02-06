import { Outlet, Link } from "react-router-dom";
import Channels from "../Components/Channels/Channels";
import Header from "../Components/Header/Header";
import DirectMessages from "../Components/Messages/DirectMessages";

const Layout = ({ headerList, changeReceiver, receiverEmail, messageSent }) => {
  return (
    <div className="wrapper">
      <Header />
      <div className="sidebar-wrapper">
        <nav>
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
