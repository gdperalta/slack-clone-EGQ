import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import HistoryIcon from "@material-ui/icons/History";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SearchIcon from "@material-ui/icons/Search";
import "./Header.css";
import { useState, useEffect } from "react";
import user2 from "../../assets/images/user2.png";
import Modal from "./Modal";
import SearchBarAll from "./SearchBarAll";

const Header = ({ users, userChannels, changeMessageDisplay }) => {
  const [showModal, setShowModal] = useState(false);
  // Method to show / hide the modal
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const [searchData, setFormValues] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...searchData, [name]: value });
  };
  console.log(searchData);

  return (
    <div className="Header">
      <div className="header__container">
        <div className="header">
          <div className="header__menu">
            <MenuIcon />
          </div>
          <div className="header__history">
            <div className="history-buttons">
              <ArrowBackIcon />
              <ArrowForwardIcon />
              <div className="history">
                <HistoryIcon />
              </div>
            </div>
            <SearchBarAll
              users={users}
              userChannels={userChannels}
              changeMessageDisplay={changeMessageDisplay}
            />
            <HelpOutlineIcon />
          </div>
          <img
            src={user2}
            alt="User"
            className="image-main"
            onClick={handleToggleModal}
          />
          <Modal show={showModal} close={handleToggleModal} />
        </div>
      </div>
    </div>
  );
};

export default Header;
