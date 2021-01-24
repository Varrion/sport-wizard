import React, {useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import {AuthContext} from "./AuthContext";
import {Link} from "react-router-dom";
import {GetAllCategories} from "../services/CategoryService";
import AddUpdateCategory from "../components/item/category/AddUpdateCategory";

const Header = () => {
    const [categories, setCategories] = useState(null);
    const [addCategoryModal, setAddCategoryModal] = useState(false);

    useEffect(() => {
        GetAllCategories()
            .then(res => setCategories(res.data));

        console.log(addCategoryModal);
    }, [addCategoryModal])

    return (
        <AuthContext.Consumer>
            {userData =>
                <Navbar className={"header-margin"} collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Link className={"navbar-brand"} to={"/"}>Sport Wizard</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Category" id="collasible-nav-dropdown">
                                {categories ? <>
                                        {categories.length > 0 && categories.map(company =>
                                            <Link key={company.id} className={"dropdown-item"}
                                                  to={`/company/${company.id}`}>{company.name}
                                            </Link>)}
                                            <NavDropdown.Divider/>
                                        <Button variant={"link"} onClick={() => setAddCategoryModal(true)}>Add</Button>
                                    </> :
                                    <Button variant={"link"} onClick={() => setAddCategoryModal(true)}>Add</Button>
                                }
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
                    {addCategoryModal && <AddUpdateCategory show={addCategoryModal} onHide={() => setAddCategoryModal(false)}/>}
                </Navbar>}
        </AuthContext.Consumer>
    )
}

export default Header;
