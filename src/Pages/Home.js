import { useState } from "react";
import slackIcon from "./../assets/images/slack.gif";
import AddNewChannel from "./../Components/Channels/AddNewChannel";

const Home = ({getChannels}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="home-page">
      <img className="home-page-icon" src={slackIcon}></img>
      <h1>Welcome to Slack!</h1>
      <p>
        Slack brings all your team communication into one place, makes it all
        instantly searchable and available wherever you go.
      </p>
      <p>
        Our aim is to make your working life simpler, more pleasant and more
        productive.
      </p>
      <button className="home-page-create-channel-btn" onClick={() => setShow(true)}>Create a channel</button>
      {show ? (
        <AddNewChannel
          title="Create a new channel"
          onClose={() => setShow(false)}
          show={show}
          toggleAddUsers={false}
          getChannels={getChannels}          
        />
      ) : null}
    </div>
  );
};

export default Home;
