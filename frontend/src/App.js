import './App.css';
import React, {useEffect, useState} from "react";
import Header from "./shared/Header";
import Switch from "react-bootstrap/Switch";
import axios from "axios";
import {AuthContext} from "./shared/AuthContext";
import {Route} from "react-router-dom";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import Home from "./components/Home";

function App() {
    const [loggedUser, setLoggedUser] = useState(null);

    const logoutUser = () => {
        setLoggedUser(null);
    }

    const userData = {
        user: loggedUser,
        logoutUser: logoutUser
    }

    useEffect(() => {
        axios.get("users/login")
            .then(() => setLoggedUser(loggedUser))
    }, [],)

    return (
        <>
            <AuthContext.Provider value={userData}>
                <Header/>
                <div className="outer">
                    <div className="inner">
                        <Switch>
                            <Route path={"/"} exact>
                                <Home/>
                            </Route>
                            <Route path={"/sign-in"} exact>
                                <SignIn/>
                            </Route>
                            <Route path={"/sign-up"} exact>
                                <SignUp/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </AuthContext.Provider>
        </>
    );
}

export default App;
