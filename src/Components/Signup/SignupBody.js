import { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function SignupBody(){
    const initialValues = { email: "", password: "", password_confirmation: "" };
    const [formData, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    let navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formData, [name]: value });
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setFormErrors(validate(formData));
            setIsSubmit(true);
        var raw = {
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        };
    
        var requestOptions = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(raw),
          redirect: "follow",
        };
        
        fetch("http://206.189.91.54//api/v1/auth/", requestOptions)
        
        .then((response) =>
            response.json()
        ) 
        .then((result) => {
            if(result.status !== "error"){
                navigate("/")
            }else{
                console.log(result.json())
            }
        });
        
      }
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
        }else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }else if (formData.password !== formData.password_confirmation) {
            errors.password = "The password and confirmation password do not match.";
        }
        return errors;
      };
    console.log(formData)
   
    return(
        <div>
            <div className="signup-main">
                <div className='signup-board'>
                    <div className="heading">First, enter your email</div>
                    <div className="sub-heading">We suggest using the <strong>email address you use at work.</strong></div>
                    <form onSubmit={handleSubmit}>
                        <div className="inputs">
                            <input 
                                type="text" 
                                name="email" 
                                data-testid="email1-input"
                                placeholder="name@work-email.com"
                                value={formData.email}
                                onChange={handleChange}>
                            </input>
                            <p title="email" data-testid="error1-msg" className="error">{formErrors.email}</p>
                            <input 
                                type="text"
                                data-testid="password1-input"
                                name="password"
                                 placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}>
                            </input>
                            <p data-testid="pw1-error-msg" className="error">{formErrors.password}</p>
                            <input 
                                type="text" 
                                data-testid="password2-input"
                                name="password_confirmation"
                                placeholder="Confirm password"
                                value={formData.password_confirmation}
                                onChange={handleChange}>
                            </input>
                            <p data-testid="pw2-error-msg" className="error">{formErrors.password}</p>
                            </div>
                            <div className="signin">
                                <button className="signBtn" >Continue</button>
                            </div>
                    </form>
                        
                    <div className="instructions">
                        <span className="emailNotifs"> <input type="checkbox" name="emailnotifs" id="emailnotifs"/> <label htmlFor="emailnotifs">Its okay to send me emails about Slack.</label></span>
                        <div className="terms">By continuing, you’re agreeing to our 
                            <a href="/#"> Customer Terms of Service,</a> 
                            <a href="/#"> Privacy Policy,</a>
                            <a href="/#"> Cookie Policy.</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}