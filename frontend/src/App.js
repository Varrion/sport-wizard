import './App.css';
import React, {useEffect, useState} from "react";
import Header from "./shared/Header";
import {AuthContext} from "./shared/AuthContext";
import {Route, Switch} from "react-router-dom";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import Home from "./components/Home";
import {SignInUser} from "./services/UserService";
import CategoryDetails from "./components/item/category/CategoryDetails";
import NoMatch from "./components/NoMatch";
import ItemList from "./components/item/ItemList";

function App() {
    const [loggedUser, setLoggedUser] = useState(null);

    const logoutUser = () => {
        setLoggedUser(null);
        sessionStorage.removeItem("AuthenticationToken");
        alert("You have been logged out")
        window.location.reload();
    }

    const userData = {
        user: loggedUser,
        logoutUser: logoutUser
    }

    useEffect(() => {
        let token = sessionStorage.getItem("AuthenticationToken");
        if (token) {
            let userData = atob(token.split(" ")[1]).split(":");
            let userDto = {
                email: userData[0].trim(),
                password: userData[1].trim()
            }
            SignInUser(userDto)
                .then(res => {
                    setLoggedUser(res.data);
                })
        }
    }, [])

    return (
        <>
            <AuthContext.Provider value={userData}>
                <Header/>
                <div className="outer">
                    <div className="inner">
                        <Switch>
                            <Route exact path={"/"}>
                                <Home/>
                            </Route>
                            <Route exact path={"/sign-in"}>
                                <SignIn/>
                            </Route>
                            <Route exact path={"/sign-up"}>
                                <SignUp/>
                            </Route>
                            <Route exact path={"/category/:categoryId"}>
                                <CategoryDetails/>
                            </Route>
                            <Route exact path={"/items"}>
                                <ItemList/>
                            </Route>
                            <Route path={"*"}>
                                <NoMatch/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </AuthContext.Provider>
        </>
    );
}

export default App;
