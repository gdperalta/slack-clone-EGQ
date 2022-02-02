import {render} from "react-dom";
import App from './App';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import "./index.css";
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';


const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Route>
        </Routes>
    </BrowserRouter>,
   rootElement
);
