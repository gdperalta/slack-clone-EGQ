import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import HistoryIcon from "@material-ui/icons/History";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SearchIcon from "@material-ui/icons/Search";
import "./Header.css";
import { useState, useEffect } from "react";
import UserSearchModal from "../Users/UserSearchModal";
import Search from "./Search";

const Header = () => {
  const [searchData, setFormValues] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...searchData, [name]: value });
  };
  console.log(searchData);
  const Signout = () => {
    window.sessionStorage.clear();
    window.location.replace("/slack-clone-egq");
  };

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
            <div className="header__search">
              <input
                type="text"
                name="search"
                placeholder="Search"
                onChange={handleChange}
              ></input>
              {/* { <div ref={searchModal} className="navlinkWrapper"> */}
              {/* <UserSearchModal
                            users={users}
                            searchParams={searchParams}
                            changeMessageDisplay={changeMessageDisplay}
                          />
                        </div> } */}
              <SearchIcon />
            </div>
            <HelpOutlineIcon />
          </div>
          <div className="sign-out" onClick={Signout}>
            Sign Out
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
