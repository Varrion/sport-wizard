import React, {useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import {AuthContext} from "./AuthContext";
import {Link} from "react-router-dom";
import {GetAllCategories} from "../services/CategoryService";
import AddUpdateCategory from "../components/item/category/AddUpdateCategory";
import AddUpdateCompany from "../components/company/AddUpdateCompany";

const Header = () => {
    const [categories, setCategories] = useState(null);
    const [addCategoryModal, setAddCategoryModal] = useState(false);
    const [addCompanyModal, setAddCompanyModal] = useState(false);

    useEffect(() => {
        GetAllCategories()
            .then(res => setCategories(res.data));
    }, [addCategoryModal, addCompanyModal])

    return (
        <AuthContext.Consumer>
            {userData =>
                <Navbar className={"header-margin"} collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Link className={"navbar-brand"} to={"/"}>Sport Wizard</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Category" id="collasible-nav-dropdown">
                                {categories && categories.length > 0 ? <>
                                        {categories.map(category =>
                                            <Link key={category.id} className={"dropdown-item"}
                                                  to={`/category/${category.id}`}>{category.name}
                                            </Link>)}
                                        <NavDropdown.Divider/>
                                        <Button variant={"link"} onClick={() => setAddCategoryModal(true)}>Add
                                            Category</Button>
                                    </> :
                                    <Button variant={"link"} onClick={() => setAddCategoryModal(true)}>Add
                                        Category</Button>
                                }
                            </NavDropdown>
                            <Link className={"nav-link"} to={"/items"}>Items</Link>
                            {userData.user ? (userData.user.isCompanyOwner && userData.user.hasCreatedCompany)
                                ? <Link className={"nav-link"} to={`/brand/${userData.company?.id}`}>My Brand</Link>
                                : (userData.user.isCompanyOwner && !userData.user.hasCreatedCompany) ?
                                    <Button className={"nav-link"} variant={"link"}
                                            onClick={() => setAddCompanyModal(true)}>Create
                                        Brand </Button> : null : null}
                        </Nav>
                        <Nav>
                            {!userData.user
                                ? <>
                                    <Link className={"nav-link"} to={"/sign-in"}>Sign In</Link>
                                    <Link className={"nav-link"} to={"/sign-up"}>Sign Up</Link>
                                </>
                                : <>
                                    <Link className={"nav-link"}
                                          to={`/my-profile`}>
                                        <i className="fas fa-user-circle"/>
                                        <span> My Profile </span>
                                    </Link>
                                    {
                                        !userData.user.isCompanyOwner &&
                                        <Link className={"nav-link"} to={`/my-profile/cart`}>
                                            <span> Shopping Cart</span>
                                        </Link>
                                    }
                                    <Button variant={"link"} onClick={userData.logoutUser} className={"nav-link"}>
                                        <i className="fas fa-sign-out-alt"/>Sign Out</Button>
                                </>}
                        </Nav>
                    </Navbar.Collapse>
                    {addCategoryModal &&
                    <AddUpdateCategory show={addCategoryModal} onHide={() => setAddCategoryModal(false)}/>}
                    {addCompanyModal &&
                    <AddUpdateCompany creator={userData.user.email} show={addCompanyModal}
                                      onHide={() => setAddCompanyModal(false)}/>}
                </Navbar>}
        </AuthContext.Consumer>
    )
}

export default Header;
