import { useEffect, useState } from "react";
import { fetchMessages } from "../../Utils/api";

const MessageScreen = ({ userDetails, messageDisplay }) => {
  return (
    <div>
      <p>Messages</p>
      <div className="messageScreen">
        {messageDisplay.map((data) => {
          return (
            <div key={data.id}>
              <h3>
                {data.sender.id === userDetails.id
                  ? userDetails.email
                  : data.sender.email}
              </h3>
              <p>{data.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageScreen;
