import './App.css';
import React, {useEffect, useState} from "react";
import Header from "./shared/Header";
import {AuthContext} from "./shared/AuthContext";
import {Route, Switch, useHistory} from "react-router-dom";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import Home from "./components/Home";
import {SignInUser} from "./services/UserService";
import CategoryDetails from "./components/item/category/CategoryDetails";
import NoMatch from "./components/NoMatch";
import ItemList from "./components/item/ItemList";
import {GetMyCompany} from "./services/CompanyService";
import CompanyDetails from "./components/company/CompanyDetails";
import ItemDetails from "./components/item/ItemDetails";
import UserDetails from "./components/user/UserDetails";
import ShoppingCart from "./components/user/ShoppingCart";

function App() {
    const history = useHistory();
    const [loggedUser, setLoggedUser] = useState(null);
    const [updateUser, setUpdateUser] = useState(false);
    const [userCompany, setUserCompany] = useState(null);

    const logoutUser = () => {
        setLoggedUser(null);
        sessionStorage.removeItem("AuthenticationToken");
        alert("You have been logged out");
        history.push("/")
        window.location.reload();
    }

    const userData = {
        user: loggedUser,
        company: userCompany,
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
                    let user = res.data;
                    setLoggedUser(user);

                    if (user.isCompanyOwner && user.hasCreatedCompany) {
                        GetMyCompany(user.email)
                            .then(r => setUserCompany(r.data))
                    }
                })
        }
    }, [updateUser])

    return (
        <>
            <AuthContext.Provider value={userData}>
                <Header/>
                <div className="section-wrapper">
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
                        <Route exact path={"/brand/:companyId"}>
                            <CompanyDetails/>
                        </Route>
                        <Route exact path={"/item/:itemId"}>
                            <ItemDetails itemsincart={loggedUser?.shoppingCart?.items}/>
                        </Route>
                        <Route exact path={"/my-profile"}>
                            <UserDetails user={loggedUser} updateprofile={updateUser}
                                         removeUser={logoutUser}
                                         setupdateprofile={setUpdateUser} ownedbrand={userCompany}/>
                        </Route>
                        <Route exact path={"/my-profile/cart"}>
                            <ShoppingCart user={loggedUser} itemsincart={loggedUser?.shoppingCart?.items}/>
                        </Route>
                        <Route path={"*"}>
                            <NoMatch/>
                        </Route>
                    </Switch>
                </div>
            </AuthContext.Provider>
        </>
    );
}

export default App;
