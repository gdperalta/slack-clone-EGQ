import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import UserDirectMessages from "./UserDirectMessages";
import UserSearchModal from "./UserSearchModal";

const Users = ({ users, changeMessageDisplay, headerList, userDetails }) => {
  const [isLoading, setIsLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  const searchModal = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    if (users) {
      setIsLoading(false);
    }
  }, [users]);

  const handleSearchModal = (truthy) => {
    if (truthy) {
      searchModal.current.classList.add("showModal");
    } else {
      searchModal.current.classList.remove("showModal");
    }
  };

  const handleSearchFilter = (filter) => {
    if (filter) {
      setSearchParams({ filter });
      handleSearchModal(true);
    } else {
      setSearchParams({});
      handleSearchModal(false);
    }
  };

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <div className="outletWrapper">
      <div className="outletHeader">
        <h3>All direct messages</h3>
      </div>
      <SearchBar
        searchParams={searchParams}
        handleSearchFilter={handleSearchFilter}
      />
      <div ref={searchModal} className="navlinkWrapper">
        <UserSearchModal
          users={users}
          searchParams={searchParams}
          changeMessageDisplay={changeMessageDisplay}
        />
      </div>
      <UserDirectMessages headerList={headerList} userDetails={userDetails} />
    </div>
  );
};

export default Users;
