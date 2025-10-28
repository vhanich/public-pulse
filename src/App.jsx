import {Route, Routes} from "react-router-dom";
import './index.css';
import SignIn from "./AuthPages/SignIn.jsx";
import SignUp from "./AuthPages/SignUp.jsx";
import ForgotPassword from "./AuthPages/ForgotPassword.jsx";


function App() {

    return (
        <div className="min-h-screen">
            <Routes>
                <Route path='signup' element={<SignUp/>}/>
                <Route path='signin' element={<SignIn/>}/>
                <Route path='forgot-password' element={<ForgotPassword/>}/>
            </Routes>

        </div>
    )
}

export default App
