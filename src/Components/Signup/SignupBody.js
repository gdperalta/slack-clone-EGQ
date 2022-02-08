import { useState} from "react";
import { useNavigate } from "react-router-dom";

export default function SignupBody(){
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password_confirmation:"",
    })
    let navigate = useNavigate();
    const register = async () => {
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
        .then((result) => {if(result.status == "error" ){
            alert("Registration Failed!")
        }else{
            navigate("/")
        }})
      };
    console.log(formData)
    function handleEmailInput(e){
        setFormData({...formData, email: e.target.value});
      }
    function handlePasswordInput(e){
        setFormData({...formData, password: e.target.value});
    }
    function handleConfirmPassword(e){
        setFormData({...formData, password_confirmation: e.target.value});
    }
    return(
       
        <div>
            
            <div className="signup-main">
                <div className='signup-board'>
                    <div className="heading">First, enter your email</div>
                    <div className="sub-heading">We suggest using the <strong>email address you use at work.</strong></div>
                    <div className="inputs">
                        <input type="email" 
                            type="email" 
                            placeholder="name@work-email.com"
                            value={formData.email}
                            onChange={handleEmailInput}>
                        </input>
                        <input 
                            type="text" 
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handlePasswordInput}>
                        </input>
                        <input 
                            type="text" 
                            placeholder="Confirm password"
                            value={formData.password_confirmation}
                            onChange={handleConfirmPassword}>
                         </input>
                    </div>
                    <div className="signin">
                        <button className="signBtn" onClick={register}>Continue</button>
                    </div>
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