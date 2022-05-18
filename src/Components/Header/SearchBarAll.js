import SearchIcon from "@material-ui/icons/Search";
import { useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const SearchBarAll = ({ users, userChannels, changeMessageDisplay }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const searchModals = useRef(null);

  const handleSearchModal = (truthy) => {
    if (truthy) {
      searchModals.current.classList.add("showSearchModal");
    } else {
      searchModals.current.classList.remove("showSearchModal");
    }
  };

  const handleSearchFilter = (filter) => {
    if (filter) {
      setSearchParams({ ChannelsAndUsers: filter });
      handleSearchModal(true);
    } else {
      setSearchParams({});
      handleSearchModal(false);
    }
  };

  return (
    <>
      <div className="header__search">
        <input
          value={searchParams.get("ChannelsAndUsers") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            handleSearchFilter(filter);
          }}
          /* onBlur={(e) => {
            e.target.value = "";
            handleSearchFilter(false);
          }} */
          placeholder="Search"
        />
        <SearchIcon />
        <div ref={searchModals} className="headerSearchBar">
          <nav>
            {users ? (
              users
                .filter((user) => {
                  let filter = searchParams.get("ChannelsAndUsers");
                  if (!filter) return "";
                  let name = user.uid.toLowerCase();
                  return name.startsWith(filter.toLowerCase());
                })
                .map((user) => {
                  return (
                    <Link
                      className="searchLinks"
                      to={`/User/${user.id}`}
                      key={user.id}
                      onClick={changeMessageDisplay}
                    >
                      <span className="iconSearch">
                        {user.uid.charAt(0).toUpperCase()}
                      </span>
                      {user.uid}
                    </Link>
                  );
                })
            ) : (
              <div>...Loading</div>
            )}
            {userChannels ? (
              userChannels
                .filter((channel) => {
                  let filter = searchParams.get("ChannelsAndUsers");
                  if (!filter) return "";
                  let name = channel.name.toLowerCase();
                  return name.startsWith(filter.toLowerCase());
                })
                .map((channel) => {
                  return (
                    <Link
                      className="searchLinks"
                      to={`/Channel/${channel.id}`}
                      key={channel.id}
                      onClick={changeMessageDisplay}
                    >
                      <FaLock className="iconSearchCh" />
                      {channel.name}
                    </Link>
                  );
                })
            ) : (
              <div>...Loading</div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default SearchBarAll;
