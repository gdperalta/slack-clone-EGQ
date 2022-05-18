const Search = ({ searchParams, handleSearchFilter }) => {
    return (
      <div className="searchBar">
        <span>To:</span>
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            handleSearchFilter(filter);
          }}
          placeholder="@somebody or somebody@gmail.com"
        />
      </div>
    );
  };
  
  export default Search;
  