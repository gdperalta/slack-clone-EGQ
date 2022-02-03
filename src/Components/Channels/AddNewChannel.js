import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { createChannel } from "../../Utils/channelAPI";
import { logIn } from "../../Utils/api";
import { getHeaders } from "../../Utils/getHeaders";
import ChannelModal from "./ChannelModal";

const AddNewChannel = () => {
  let navigate = useNavigate();
  const [channelName, setChannelName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");

  const [show, setShow] = useState(true);

  const handleChange = (event) => {
    event.preventDefault();

    if (event.target.name == "channelName") {
      setChannelName(event.target.value);
    } else if (event.target.name == "filterEmailAdd") {
      setFilterEmail(event.target.value);
    }
  };

  const createChannelName = async (event) => {
    event.preventDefault();

    const response = await logIn();
    console.log(response);

    const header = getHeaders(response);
    const result = await createChannel(channelName, header);

    console.log(result);
  };

  return (
    <div>
      <ChannelModal
        title="My modal"
        onClose={() => {
          setShow(false);
          navigate("/");
        }}
        show={show}
      >
        <form onSubmit={createChannelName}>
          <label>Channel Name: </label>
          <input
            type="text"
            name="channelName"
            value={channelName}
            onChange={handleChange}
          />
          <div>
            <div>
              <h4>Add members</h4>
              <input
                type="search"
                name="filterEmailAdd"
                placeholder="Search by name or email address"
                value={filterEmail}
                onChange={handleChange}
              />
            </div>
            <div>
              <input value="Save" type="submit" />
            </div>
          </div>
        </form>
      </ChannelModal>
    </div>
  );
};

export default AddNewChannel;
