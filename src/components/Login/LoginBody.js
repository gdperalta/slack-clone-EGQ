import { FcGoogle } from "react-icons/fc";
import { DiApple } from "react-icons/di";
import { WiStars } from "react-icons/wi";

export default function LoginBody (){
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
                <div className="inputs">
                    <input type="email" placeholder="name@work-email.com"></input>
                    <input type="password" placeholder="password"></input>
                </div>
                <div className="signin">
                    <button className="signBtn">Sign In with Email</button>
                </div>
                <div className="instructions">
                    <WiStars size={50} className="instructionIcon" />
                    <span>
                        We'll email you a magic code for a password free sign-in. Or you
                        can <strong>sign in manually instead.</strong>
                    </span>
                </div>
            </div>
        </div>
    )
}