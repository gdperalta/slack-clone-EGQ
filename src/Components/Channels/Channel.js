import { NavLink } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const Channel = (props) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? "channel-list-item active-channel" : "channel-list-item"
      }
      style={({ isActive }) => {
        return {
          position: isActive && props.isCollapsed ? "absolute" : "",
        };
      }}
      to={`/Channel/${props.id}`}
      onClick={props.changeMessageDisplay}
    >
      <FaLock fill="whiteSmoke" />
      <span>{props.name}</span>
    </NavLink>
  );
};

export default Channel;
