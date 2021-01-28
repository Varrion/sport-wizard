import React, {useState} from "react";
import {AuthenticationToken, SignInUser} from "../../services/UserService";
import {Redirect, useHistory} from "react-router-dom";
import {AuthContext} from "../../shared/AuthContext";

const SignIn = () => {
    let history = useHistory();

    const [account, setAccount] = useState({
        email: null,
        password: null,
    });

    const handleChange = name => event => {
        setAccount({...account, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();

        SignInUser(account)
            .then(res => {
                sessionStorage.setItem("AuthenticationToken", AuthenticationToken(res.data.username, res.data.password));
                history.push(`/`);
                alert(`Welcome ${res.data.name}`);
                window.location.reload();
            })
            .catch(err => {
                alert("incorrect credentials");
            })
    }

    return (
        <AuthContext.Consumer>
            {authData => !authData.user ?
                <form onSubmit={handleSubmit}>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" onChange={handleChange("email")} className="form-control"
                               placeholder="Enter email"/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={handleChange("password")} className="form-control"
                               placeholder="Enter password"/>
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                </form> : <Redirect to={"/"}/>}
        </AuthContext.Consumer>

    )
}

export default SignIn
