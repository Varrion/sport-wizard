import React, {useEffect, useState} from "react";
import {AuthContext} from "../../shared/AuthContext";
import Button from "react-bootstrap/Button";
import {Link, useHistory, useParams} from "react-router-dom";
import {DeleteItem, GetItemDetails} from "../../services/ItemService";
import AddUpdateItem from "./AddUpdateItem";
import DefaultSportItemPhoto from "../../shared/images/defaultSport.jpg"

const ItemDetails = () => {
    const [item, setItem] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    let {itemId} = useParams();
    let history = useHistory();

    useEffect(() => {
        GetItemDetails(itemId)
            .then(response => {
                setItem(response.data)
            });
    }, [showEditModal, itemId])

    return (
        <>
            {item && <div>
                <AuthContext.Consumer>
                    {userData =>
                        <div>
                            <img
                                className={"image-details"}
                                src={item.picture ? "data:image/jpeg;base64," + item.picture : DefaultSportItemPhoto}
                                height={300}/>
                            <hr className={"custom-style"}/>
                            <h1>{item.name}
                                {userData.user && userData.user.isCompanyOwner && <> <Button
                                    className={"float-right ml-2"} variant={"danger"}
                                    onClick={() => DeleteItem(itemId).then(() => {
                                        alert("Item successfully deleted");
                                        history.push("/");
                                        window.location.reload();
                                    })}>Delete</Button>
                                    <Button className={"float-right"} variant={"info"}
                                            onClick={() => setShowEditModal(true)}>Edit</Button>
                                </>}
                            </h1>
                            <p>{item.description}</p>
                            <hr className={"custom-style2 mt-2"} stHyle={{width: '80%'}}/>
                            <p>Price: {item.price}</p>
                            <p>Type: {item.itemGender}</p>
                            <p><Link to={`/brand/${item.sportCompany?.id}`}>Brand: {item.sportCompany?.name}</Link></p>
                            <p><Link to={`/brand/${item.category?.id}`}>Category: {item.category?.name}</Link></p>
                        </div>
                    }
                </AuthContext.Consumer>
                {showEditModal &&
                <AddUpdateItem item={item} show={showEditModal} onHide={() => setShowEditModal(false)}/>}
            </div>}
        </>
    )
}

export default ItemDetails
