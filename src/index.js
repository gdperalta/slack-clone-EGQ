import {render} from "react-dom";
import App from './App';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import "./index.css";
// import Login from './components/Login/Login';
// import Signup from './components/Signup/Signup';


const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
   rootElement
);
