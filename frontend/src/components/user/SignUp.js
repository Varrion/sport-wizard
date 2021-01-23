import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import Form from "react-bootstrap/form"
import {AuthenticationToken, SignUpUser} from "../../services/UserService";

const SignUp = () => {
    let history = useHistory();
    const [account, setAccount] = useState({
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
        setAccount({...account, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("accountDto", new Blob([JSON.stringify({...account})], {
            type: "application/json"
        }));
        formData.append("accountPicture", null);
        SignUpUser("user", formData)
            .then(res => {
                sessionStorage.setItem("AuthenticationToken", AuthenticationToken(res.data.username, res.data.password));
                history.push(`/user/${res.data.username}`);
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <div className="form-group">
                <label>First name</label>
                <input type="text" onChange={handleChange("name")} className="form-control" placeholder="First name"/>
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input type="text" onChange={handleChange("surname")} className="form-control" placeholder="Last name"/>
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
        </form>
    )
}

export default SignUp
