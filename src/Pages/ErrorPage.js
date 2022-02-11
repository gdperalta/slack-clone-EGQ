import { Link } from "react-router-dom";
import errorBackground from "../assets/images/error-bg.gif";
import { IoWarningOutline } from "react-icons/io5";
import { IconContext } from "react-icons";

const ErrorPage = () => {
  return (
    <div className="errorPage">
      <img src={errorBackground} />
      <div className="errorContainer">
        <div>
          <IconContext.Provider value={{ color: "red", size: "30px" }}>
            <IoWarningOutline />
          </IconContext.Provider>
          <h1>There's been a glitch...</h1>
        </div>
        <p>
          The page you're looking for doesn't exist. If you think something is
          broken, report a problem.
        </p>
        <p>
          You can go back to the <Link to="/">Home Page</Link>, or try looking
          on our Help Center if you need a hand.
        </p>
      </div>
    </div>
  );
};

export const ErrorMessage = ({ chatType }) => {
  return (
    <div className="errorPage">
      <div className="errorContainer">
        <div>
          <IconContext.Provider value={{ color: "red", size: "30px" }}>
            <IoWarningOutline />
          </IconContext.Provider>
          <h1>There's been a glitch...</h1>
        </div>
        <p>
          {`The ${chatType} you're looking for either doesn't exist, or is not accessible. If you think there is a problem, try looking on our Help Center`}
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
