import {
  useLocation,
  Outlet,
  NavLink,
  useSearchParams,
} from "react-router-dom";
import { testData } from "./Message";

const Messages = () => {
  return (
    <div>
      <p>Messages</p>
      <nav>
        <NavLink to={`/${testData.uid}`}>{testData.name} aa</NavLink>
      </nav>
    </div>
  );
};

export default Messages;
