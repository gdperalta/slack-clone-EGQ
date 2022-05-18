import { Outlet } from "react-router-dom";
import Channels from "../Components/Channels/Channels";
import Header from "../Components/Header/Header";
import DirectMessages from "../Components/Messages/DirectMessages";

const Layout = ({
  users,
  headerList,
  changeMessageDisplay,
  messageSent,
  userChannels,
  getChannels,
}) => {
  return (
    <div className="wrapper">
      <Header
        users={users}
        userChannels={userChannels}
        changeMessageDisplay={changeMessageDisplay}
      />
      <div className="sidebarWrapper">
        <div className="outletHeader">
          <h2>Avion School</h2>
        </div>
        <div id="sidebarLinks">
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
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
