import React, {useState} from "react";
import {Link, Redirect, useHistory} from "react-router-dom";
import Form from "react-bootstrap/form"
import {AuthenticationToken, SignUpUser} from "../../services/UserService";
import {AuthContext} from "../../shared/AuthContext";

const SignUp = () => {
    let history = useHistory();
    const [userData, setUserData] = useState({
        email: null,
        password: null,
        name: null,
        surname: null,
        gender: null,
        age: null,
        phoneNumber: null,
        address: null,
        city: null,
        isCompanyOwner: false,
        hasCreatedCompany: false,
    });

    const handleChange = name => event => {
        if (name !== "isCompanyOwner") {
            setUserData({...userData, [name]: event.target.value});
        } else {
            setUserData({...userData, [name]: event.target.checked});
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        SignUpUser(userData)
            .then(res => {
                sessionStorage.setItem("AuthenticationToken", AuthenticationToken(res.data.email, res.data.password));
                history.push("/");
                alert(`Welcome ${res.data.name}`);
                window.location.reload();
            });
    }

    return (
        <AuthContext.Consumer>
            {authData => !authData.user ?
                <form onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" onChange={handleChange("name")} className="form-control"
                               placeholder="First name"/>
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" onChange={handleChange("surname")} className="form-control"
                               placeholder="Last name"/>
                    </div>

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

                    <div className="form-group">
                        <Form.Check
                            type={"checkbox"}
                            label={"Brand Owner"}
                            onChange={handleChange("isCompanyOwner")}
                        />
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                    <p className="forgot-password text-right">
                        Already registered <Link to={"/sign-in"}>log in?</Link>
                    </p>
                </form> : <Redirect to={"/"}/>
            }
        </AuthContext.Consumer>
    )
}

export default SignUp
