import { FcGoogle } from "react-icons/fc";
import { DiApple } from "react-icons/di";
import { WiStars } from "react-icons/wi";
import { useState, useEffect } from "react";
import { logIn } from "../../Utils/api";
import { useNavigate } from "react-router-dom";

export default function LoginBody({ onSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const logInUser = async () => {
    const userData = await logIn(formData.email, formData.password);
    const data = await userData.json();
    if (data.data) {
      onSuccess(data, userData);
      navigate("/");
    } else {
      console.log("failed");
    }
  };

  const handleLogin = () => {
    logInUser();
  };

  function handleEmailInput(e) {
    setFormData({ ...formData, email: e.target.value });
  }
  function handlePasswordInput(e) {
    setFormData({ ...formData, password: e.target.value });
  }
  console.log(formData);
  return (
    <div className="login-main">
      <div className="login-board">
        <div className="heading">Sign in to Slack</div>
        <div className="sub-heading">
          We suggest using the <strong>email address you use at work.</strong>
        </div>
        <div className="signIn-option">
          <div className="google">
            <button className="googlebtn">
              <FcGoogle size={15} style={{ marginRight: "10px" }} />
              Sign in with Google
            </button>
          </div>
          <div className="apple">
            <button className="applebtn">
              <DiApple size={15} style={{ marginRight: "10px" }} />
              Sign in with Apple
            </button>
          </div>
        </div>
        <div className="horizontalContentRule">
          <hr className="leftLine"></hr>
          <div className="center">OR</div>
          <hr className="rightLine"></hr>
        </div>
        <div className="input">
          <input
            type="email"
            placeholder="name@work-email.com"
            value={formData.email}
            onChange={handleEmailInput}
          ></input>
          <input
            type="password"
            placeholder="password"
            value={formData.password}
            onChange={handlePasswordInput}
          ></input>
        </div>
        <div className="signin">
          <button className="signBtn" onClick={handleLogin}>
            Sign In with Email
          </button>
        </div>
        <div className="instruction">
          <WiStars size={70} className="instructionIcon" />
          <span>
            We'll email you a magic code for a password free sign-in. Or you can{" "}
            <strong>sign in manually.</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
