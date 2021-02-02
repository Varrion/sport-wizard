import React, {useEffect, useState} from "react";
import {AuthContext} from "../../shared/AuthContext";
import Button from "react-bootstrap/Button";
import {Link, useHistory, useParams} from "react-router-dom";
import {ChargeItems, DeleteItem, EditItemsInShoppingCart, GetItemDetails} from "../../services/ItemService";
import DefaultSportItemPhoto from "../../shared/images/defaultSport.jpg"
import AddUpdateItem from "./AddUpdateItem";
import StripeCheckout from "react-stripe-checkout";
import {StripeKey} from "../../services/UserService";

const ItemDetails = (props) => {
    const [item, setItem] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    let {itemId} = useParams();
    let history = useHistory();


    useEffect(() => {
        GetItemDetails(itemId)
            .then(response => {
                setItem(response.data)
            });
    }, [showEditModal, itemId]);

    const AddItemInCart = (userEmail) => {
        let cartDto = {
            itemId: itemId,
            userEmail: userEmail
        }

        EditItemsInShoppingCart(cartDto)
            .then(() => {
                alert("Your shopping cart has been updated");
                window.location.reload();
            })
    }

    const generateToken = (token, userEmail, amount) => {
        let chargeDto = {
            stripeEmail: userEmail,
            stripeToken: token.id,
            isFromCart: false,
            amount: amount * 100,
        }

        console.log(chargeDto);
        ChargeItems(chargeDto)
            .then(() => {
                alert("Successfully bought your item");
                window.location.reload();
            })
    }

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
                                {userData.user ? userData.user.isCompanyOwner ? <> <Button
                                    className={"float-right ml-2"} variant={"danger"}
                                    onClick={() => DeleteItem(itemId).then(() => {
                                        alert("Item successfully deleted");
                                        history.push("/");
                                        window.location.reload();
                                    })}>Delete</Button>
                                    <Button className={"float-right"} variant={"info"}
                                            onClick={() => setShowEditModal(true)}>Edit</Button>
                                </> : <> <StripeCheckout
                                    className={"float-right ml-3"}
                                    amount={item.price * 100}
                                    email={userData.user?.email}
                                    description={`Total price for buying ${item.name} is ${item.price} USD`}
                                    name={userData.user?.name}
                                    panelLabel={"Pay Now"}
                                    currency="USD"
                                    label={"Pay With Card"}
                                    stripeKey={StripeKey}
                                    token={(token) => generateToken(token, userData?.user.email, item.price)}
                                />
                                    {props.itemsincart && !props.itemsincart.find(item => item.id.toString() === itemId) &&
                                    <Button className={"float-right"} style={{color: "white"}} variant={"warning"}
                                            onClick={() => AddItemInCart(userData.user.email)}>Add to Cart</Button>}
                                </> : null}
                            </h1>
                            <p>{item.description}</p>
                            <hr className={"custom-style2 mt-2"} style={{width: '80%'}}/>
                            <div className={"d-flex justify-content-between"}>
                                <div className={"ml-5"}>
                                    <p>Price: {item.price}</p>
                                    <p>Type: {item.itemGender}</p>
                                    <p>For: {item.sport}</p>
                                </div>
                                <div className={"mr-5"}>
                                    <p><Link
                                        to={`/brand/${item.sportCompany?.id}`}>Brand: {item.sportCompany?.name}</Link>
                                    </p>
                                    <p><Link to={`/brand/${item.category?.id}`}>Category: {item.category?.name}</Link>
                                    </p>
                                </div>
                            </div>
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
