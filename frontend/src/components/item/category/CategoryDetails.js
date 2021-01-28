import React, {useEffect, useState} from "react";
import {DeleteCategory, GetCategoryDetails} from "../../../services/CategoryService";
import {useHistory, useParams} from "react-router-dom";
import AddUpdateCategory from "./AddUpdateCategory";
import Button from "react-bootstrap/Button";
import {AuthContext} from "../../../shared/AuthContext";
import {GetItemsByCategory} from "../../../services/ItemService";
import ItemMedia from "../../../shared/ItemMedia";

const CategoryDetails = props => {

    const [category, setCategory] = useState(null);
    const [categoryItems, setCategoryItems] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    let {categoryId} = useParams();
    let history = useHistory();

    useEffect(() => {
        GetCategoryDetails(categoryId)
            .then(response => {
                setCategory(response.data)
                GetItemsByCategory(response.data.id)
                    .then(res => setCategoryItems(res.data))
            });
    }, [showEditModal, categoryId])

    return (
        <>
            {category && <div>
                <AuthContext.Consumer>
                    {userData =>
                        <div>
                            <h1>{category.name}
                                {userData.user && userData.user.isCompanyOwner && <><Button
                                    className={"float-right ml-2"} variant={"danger"}
                                    onClick={() => DeleteCategory(categoryId).then(() => {
                                        alert("Category successfully deleted");
                                        history.push("/");
                                        window.location.reload();
                                    })}>Delete</Button>
                                    <Button className={"float-right"} variant={"info"}
                                            onClick={() => setShowEditModal(true)}>Edit</Button>
                                </>}
                            </h1>
                            <p>{category.description}</p>
                            <div>
                                {categoryItems && categoryItems.length > 0 ? <>
                                    <h3>Category Items</h3>
                                    <hr className={"custom-style2 mb-2"}/>
                                    <div className={"row"}>
                                        {categoryItems.map(item =>
                                            <div key={item.id}  className={"col-md-6"}>
                                                <ItemMedia item={item}/>
                                            </div>)}
                                    </div>
                                </> : <h3>No Items in this category yet</h3>}
                            </div>
                        </div>
                    }
                </AuthContext.Consumer>
            </div>}
            {showEditModal &&
            <AddUpdateCategory category={category} show={showEditModal} onHide={() => setShowEditModal(false)}/>}
        </>
    )
}

export default CategoryDetails
