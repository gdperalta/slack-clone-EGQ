import { FcGoogle } from "react-icons/fc";
import { DiApple } from "react-icons/di";
import { WiStars } from "react-icons/wi";
import { useState,useEffect} from "react";
// import { logIn,fetchUsers} from "../../Utils/api";
import { getHeaders } from "../../Utils/getHeaders";
// import { useNavigate } from "react-router-dom";

export default function LoginBody (){
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    
    const register = async () => {
        var raw = {
          email: "dio@gmail.com",
          password: "asdfjkl",
          password_confirmation: "asdfjkl",
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
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      };      
        const logIn = async () => {
        var raw = { email: formData.email , password: "asdfjkl" };
      
        var requestOptions = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(raw),
          redirect: "follow",
        };
        const response = await fetch(
          "http://206.189.91.54//api/v1/auth/sign_in",
          requestOptions
        );
        console.log(await response.text());
        return response;
      };
      
      const fetchUsers = async (headers) => {
        const { accessToken, client, expiry, uid } = headers;
        const myHeaders = new Headers();
        myHeaders.append("access-token", accessToken);
        myHeaders.append("client", client);
        myHeaders.append("expiry", expiry);
        myHeaders.append("uid", uid);
      
        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
      
        const response = await fetch(
          "http://206.189.91.54//api/v1/users",
          requestOptions
        );
        return await response.json();
      };
        const [headerList, setHeaderList] = useState(null);
        const [users, setUsers] = useState(null);
        const [isLoggedIn, setIsLoggedIn] = useState(false);

        useEffect(() => {
            const oldHeader = JSON.parse(sessionStorage.getItem("header"));
            if (oldHeader) {
            setIsLoggedIn(true);
            setHeaderList(oldHeader);
            } else {
            setIsLoggedIn(false);
            }
          
        }, []);
    
        useEffect(() => {
            if (headerList) {
            getUsers();
            }
        }, [headerList]);
    
        function handleEmailInput(e){
            setFormData({...formData, email: e.target.value});
          }
        function handlePasswordInput(e){
            setFormData({...formData, password: e.target.value});
        }
        

    const logInUser = async () => {
        const userData = await logIn();
        const userHeader = getHeaders(userData);
        setHeaderList(userHeader);
    };
    const getUsers = async () => {
        const data = await fetchUsers(headerList);
        setUsers(data.data);
    };
    const handleLogin = () => {
        logInUser();
        setIsLoggedIn(true);
    };

    console.log(formData);
    return(
        <div className="login-main">
            <div className='login-board'>
                <div className="heading">Sign in to Slack</div>
                <div className="sub-heading">We suggest using the <strong>email address you use at work.</strong></div>
                <div className="signIn-option">
                    <div className="google">
                        <button className="googlebtn"><FcGoogle size={15} style={{ marginRight: "10px"}}/>Sign in with Google</button>
                    </div>
                    <div className="apple">
                        <button className="applebtn"><DiApple size={15} style={{ marginRight: "10px" }} />Sign in with Apple</button>
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
                        onChange={handleEmailInput}>
                    </input>
                    <input 
                        type="password" 
                        placeholder="password"
                        value={formData.password}
                        onChange={handlePasswordInput}>
                    </input>
                </div>
                <div className="signin">
                    <button className="signBtn" onClick={handleLogin}>Sign In with Email</button>
                </div>
                <div className="instruction">
                    <WiStars size={70} className="instructionIcon" />
                    <span>
                        We'll email you a magic code for a password free sign-in. Or you
                        can <strong>sign in manually.</strong>
                    </span>
                </div>
            </div>
        </div>
    )
}