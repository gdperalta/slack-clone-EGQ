import { useContext, useEffect, useState } from "react";
import { fetchUsers } from "../../Utils/api";
import { UserContext } from "../../Contexts/context";
import { NavLink, useSearchParams } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { headerList } = useContext(UserContext);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (headerList) {
      getUsers();
    }
  }, [headerList]);

  useEffect(() => {
    if (users) {
      setIsLoading(false);
    }
  }, [users]);

  const getUsers = async () => {
    setIsLoading(true);
    const data = await fetchUsers(headerList);
    setUsers(data.data);
  };

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
