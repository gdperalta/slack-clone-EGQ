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

  const getUsers = async () => {
    setIsLoading(true);
    const data = await fetchUsers(headerList);
    setUsers(data.data);
    console.log(data.data);
    setIsLoading(false);
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
        {users.map((user) => {
          <NavLink to={`/users/${user.id}`} key={user.id}>
            {user.uid}
          </NavLink>;
        })}
      </nav>
    </div>
  );
};

export default Users;
