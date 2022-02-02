import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

const Users = ({ users }) => {
  const [isLoading, setIsLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    if (users) {
      setIsLoading(false);
    }
  }, [users]);

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <p>Users</p>
      <nav>
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {users
          .filter((user) => {
            let filter = searchParams.get("filter");
            //Returned "" if search input is blank to show empty search list on initial render
            if (!filter) return "";
            let name = user.uid.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((user) => {
            return (
              <NavLink
                style={({ isActive }) => {
                  return {
                    display: "block",
                    margin: "1rem 0",
                    color: isActive ? "green" : "",
                  };
                }}
                to={`/${user.id}`}
                key={user.id}
              >
                {user.uid}
              </NavLink>
            );
          })}
      </nav>
    </div>
  );
};

export default Users;
