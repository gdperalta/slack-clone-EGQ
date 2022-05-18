const SearchBar = ({ searchParams, handleSearchFilter }) => {
  return (
    <div className="searchBar">
      <span>To:</span>
      <input
        value={searchParams.get("Users") || ""}
        onChange={(event) => {
          let filter = event.target.value;
          handleSearchFilter(filter);
        }}
        /* onBlur={(e) => {
          e.target.value = "";
          handleSearchFilter(false);
        }} */
        placeholder="@somebody or somebody@gmail.com"
      />
    </div>
  );
};

export default SearchBar;
