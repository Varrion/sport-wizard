import React, {useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import {AuthContext} from "./AuthContext";
import {Link} from "react-router-dom";

const Header = () => {
    const [companies, setCompanies] = useState(null);

    useEffect(() => {
        axios.get("companies")
            .then(res => setCompanies(res.data))
    }, [])

    return (
        <AuthContext.Consumer>
            {userData =>
                <Navbar className={"header-margin"} collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Link className={"navbar-brand"} to={"/"}>Sport Wizard</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Companies" id="collasible-nav-dropdown">
                                {companies && companies.length > 0 && companies.map(company =>
                                    <Link key={company.id} className={"dropdown-item"}
                                          to={`/company/${company.id}`}>{company.name}</Link>
                                )}
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            {!userData.user
                                ? <>
                                    <Link className={"nav-link"} to={"/sign-in"}>Sign In</Link>
                                    <Link className={"nav-link"} to={"/sign-up"}>Sign Up</Link>
                                </>
                                : <>
                                    <Link className={"nav-link"}
                                          to={`/user/${userData.user.username}`}>
                                        <i className="fas fa-user-circle"/>
                                        <span> {userData.user.firstName}</span>
                                    </Link>
                                    <Button variant={"link"} onClick={userData.logoutUser} className={"nav-link"}>
                                        <i className="fas fa-sign-out-alt"/></Button>
                                </>}

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>}
        </AuthContext.Consumer>
    )
}

export default Header
