import { FcGoogle } from "react-icons/fc";
import { DiApple } from "react-icons/di";
import { WiStars } from "react-icons/wi";
import { useState, useEffect } from "react";
import { logIn } from "../../Utils/api";
import { useNavigate } from "react-router-dom";

export default function LoginBody({ onSuccess }) {
  const initialValues = { email: "", password: ""};
  const [formData, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formData, [name]: value });
  };


  let navigate = useNavigate();
 
  
  const logInUser = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmit(true);
    const userData = await logIn(formData.email, formData.password);
    const data = await userData.json();
    
    if (data.data) {
      onSuccess(data, userData);
      console.log(userData)
      navigate("/");
    } else {
      console.log("Log in Failed")
    }
   
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formData);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
        errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
        errors.password = "Password is required";
    }else if (values.password.length < 6) {
        errors.password = "Password must be more than 5 characters";
    }
    return errors;
  };
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
        <form onSubmit={logInUser}>
          <div className="input">
            <input
              title="emailInput"
              data-testid="email-input"
              type="text"
              name="email"
              placeholder="name@work-email.com"
              value={formData.email}
              onChange={handleChange}
            ></input>
            <p title="email" data-testid="error-msg" className="error">{formErrors.email}</p>
            <input
              title="paswordInput"
              data-testid="password-input"
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
            ></input>
            <div>
            <p title="password" data-testid="pw-error-msg" className="error">{formErrors.password}</p>
            </div>
            
          </div>
          <div className="signin">
            <button className="signBtn">
              Sign In with Email
            </button>
          </div>
        </form>
        
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
