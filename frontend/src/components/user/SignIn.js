import React, {useState} from "react";
import {AuthenticationToken, SignInUser} from "../../services/UserService";
import {useHistory} from "react-router-dom";

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
                history.push(`/user/${res.data.name}`);
            })
    }

    return (
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
        </form>
    )
}

export default SignIn
