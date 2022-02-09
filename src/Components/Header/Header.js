import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import HistoryIcon from '@material-ui/icons/History';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SearchIcon from '@material-ui/icons/Search';
import "./Header.css"




const Header = () => {
  const Signout = () =>{
    window.sessionStorage.clear()
    window.location.replace("/")
  }
  return (
    <div className="Header">
      <div className="header__container">
            <div className="header">
                <div className="header__menu"><MenuIcon /></div>
                <div className="header__history">
                    <div className="history-buttons">
                        <ArrowBackIcon />
                        <ArrowForwardIcon />
                        <div className="history"><HistoryIcon /></div>
                    </div>
                    <div className="header__search">
                        <span>Search</span>
                        <SearchIcon />
                    </div>
                    <HelpOutlineIcon />
                </div>
                <div className="sign-out" onClick={Signout}>Sign Out</div>
            </div>
        </div>
    </div>
  );
};

export default Header;
