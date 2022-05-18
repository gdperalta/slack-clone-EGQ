
import "./Login.css"
import LoginHeader from "./LoginHeader";
import LoginBody from "./LoginBody"
import LoginFooter from "./LoginFooter";

export default function Login({onSuccess}){
    return(
        <>
            <LoginHeader/>
            <LoginBody onSuccess={onSuccess}/>
            <LoginFooter/>
        </>
    )
}
