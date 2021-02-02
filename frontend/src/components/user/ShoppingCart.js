import React from "react";
import ItemTable from "../../shared/ItemTable";
import Button from "react-bootstrap/Button";
import {ChargeItems, ClearItemsFromShoppingCart} from "../../services/ItemService";
import StripeCheckout from 'react-stripe-checkout';
import {StripeKey} from "../../services/UserService";

const ShoppingCart = (props) => {

    let totalPrice = 0;
    props.itemsincart?.forEach(item => totalPrice += item.price);
    const ClearCart = () => {
        ClearItemsFromShoppingCart(props.email)
            .then(() => {
                alert("Your cart is now empty");
                window.location.reload();
            })
    }

    const generateToken = token => {
        let chargeDto = {
            stripeEmail: props?.user?.email,
            stripeToken: token.id,
            isFromCart: true,
            amount: totalPrice * 100,
        }

        ChargeItems(chargeDto)
            .then(() => {
                alert("Successfully bought all items");
                window.location.reload();
            })
    }

    return (
        <>
            {props.itemsincart && <div>
                <h1 className={"mb-5"}>
                    Shopping Cart
                    {props.itemsincart.length > 0 && <Button className={"float-right"} variant={"danger"}
                                                             onClick={() => ClearCart()}>Clear</Button>}
                </h1>
                <ItemTable email={props.user?.email} items={props.itemsincart} IsFromCart={true}/>
                {props.itemsincart.length > 0 &&
                <div className={"text-center"}>
                    <hr className={"custom-style2 mt-2"} style={{width: '80%'}}/>

                    <p>Total Price ${totalPrice} </p>
                    <StripeCheckout
                        amount={totalPrice * 100}
                        email={props.user?.email}
                        description={`Total price for buying all items is ${totalPrice} USD`}
                        name={props.user?.name}
                        panelLabel={"Pay Now"}
                        currency="USD"
                        label={"Pay Now"}
                        stripeKey={StripeKey}
                        token={generateToken}
                    />
                </div>}
            </div>}
        </>
    )
}

export default ShoppingCart;
