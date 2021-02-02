import React from "react";
import {Table} from "react-bootstrap";
import DefaultSportPicture from "./images/defaultSport.jpg"
import {Link, useHistory} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {EditItemsInShoppingCart} from "../services/ItemService";


const ItemTable = (props) => {
    const history = useHistory();

    const DeleteItemFromCart = (itemId) => {
        let cartDto = {
            itemId: itemId,
            userEmail: props.email
        }

        EditItemsInShoppingCart(cartDto)
            .then(() => {
                alert("Your shopping cart has been updated");
                window.location.reload();
            })
    }

    return (
        <Table responsive>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                {!props.IsFromCart && <th>Category</th>}
                <th>Type</th>
                <th>Ment for</th>
                <th>Brand</th>
                {props.IsFromCart && <th>Actions</th>}
            </tr>
            </thead>
            <tbody>
            {props.items.length > 0 && props.items.map(item =>
                <tr key={item.id} className={"item-row"}
                    onDoubleClick={() => history.push(`/item/${item.id}`)}>
                    <td>
                        <img
                            src={item.picture ? "data:image/jpeg;base64," + item.picture : DefaultSportPicture}
                            width={120} height={90}/></td>
                    <td className={"item-data-first"}><span
                        style={{fontWeight: "bolder"}}>{item.name}</span>
                        <br/> {item.description.length > 20 ? item.description.substring(1, 20) + "..." : item.description}
                    </td>
                    <td className={"item-data"}>${item.price}</td>
                    {!props.IsFromCart && <td className={"item-data"}>
                        <Link style={{color: "gray"}}
                              to={`/category/${item.category.id}`}> {item.category.name} </Link>
                    </td>}
                    <td className={"item-data"}>{item.itemGender}</td>
                    <td className={"item-data"}>{item.sport}</td>
                    <td className={"item-data"}>
                        <Link style={{color: "gray"}}
                              to={`/brand/${item.sportCompany?.id}`}> {item.sportCompany?.name} </Link>
                    </td>
                    {props.IsFromCart && props.email && <td><Button variant={"danger"} style={{marginTop: "28px"}}
                                                                    onClick={() => DeleteItemFromCart(item.id)}>X</Button>
                    </td>}
                </tr>)}
            </tbody>
        </Table>
    )
}

export default ItemTable;
