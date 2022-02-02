import { useContext, useEffect, useState } from "react";
import { fetchUsers } from "../../Utils/api";
import { UserContext } from "../../Contexts/context";

const Users = () => {
  const [users, setUsers] = useState(null);
  const { headerList } = useContext(UserContext);

  useEffect(() => {
    if (headerList) {
      getUsers();
    }
  }, [headerList]);

  const getUsers = async () => {
    const data = await fetchUsers(headerList);
    setUsers(data);
    console.log(data);
  };

  return (
    <div>
      <p>Users</p>
    </div>
  );
};

export default Users;
