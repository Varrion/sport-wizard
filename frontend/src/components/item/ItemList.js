import React, {useEffect, useState} from "react";
import {GetAllItems} from "../../services/ItemService";
import {AuthContext} from "../../shared/AuthContext";
import {Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import AddUpdateItem from "./AddUpdateItem";

const ItemList = () => {
    const [items, setItems] = useState(null);
    const [showAddItemModal, setShowAddItemModal] = useState(false);

    useEffect(() => {
        GetAllItems()
            .then(res => setItems(res.data));
    }, [showAddItemModal])

    return (
        <AuthContext.Consumer>
            {userData => <>
                <h1 className={"mb-5"}>
                    All Items
                    {userData.user && userData.user.isCompanyOwner &&
                    <Button className={"float-right"} variant={"info"}
                            onClick={() => setShowAddItemModal(true)}>Add Item</Button>
                    }
                </h1>
                {items && <div>

                    <Table responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Type</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.length > 0 && items.map(item =>
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>{item.category.name}</td>
                                <td>{item.itemGender}</td>
                            </tr>)}
                        </tbody>
                    </Table>
                </div>}
                {showAddItemModal && <AddUpdateItem show={showAddItemModal} onHide={() => setShowAddItemModal(false)}/>}
            </>}
        </AuthContext.Consumer>
    )
}

export default ItemList;
