import { Outlet } from "react-router-dom";
import Channels from "../Components/Channels/Channels";
import Header from "../Components/Header/Header";
import DirectMessages from "../Components/Messages/DirectMessages";

const Layout = ({
  headerList,
  changeMessageDisplay,
  messageSent,
  userChannels,
  getChannels,
}) => {
  return (
    <div className="wrapper">
      <Header />
      <div className="sidebar-wrapper">
        <nav>
          <Channels
            changeMessageDisplay={changeMessageDisplay}
            userChannels={userChannels}
            getChannels={getChannels}
          />
          <DirectMessages
            changeMessageDisplay={changeMessageDisplay}
            headerList={headerList}
            messageSent={messageSent}
          />
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
