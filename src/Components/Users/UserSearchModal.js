import { Link } from "react-router-dom";

const UserSearchModal = ({ users, searchParams, changeMessageDisplay }) => {
  return (
    <nav>
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
            <Link
              className="links"
              to={`/User_${user.id}`}
              key={user.id}
              onClick={changeMessageDisplay}
            >
              {user.uid}
            </Link>
          );
        })}
    </nav>
  );
};

export default UserSearchModal;
