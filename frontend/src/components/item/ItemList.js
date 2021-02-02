import React, {useEffect, useState} from "react";
import {GetAllItems} from "../../services/ItemService";
import {AuthContext} from "../../shared/AuthContext";
import Button from "react-bootstrap/Button";
import AddUpdateItem from "./AddUpdateItem";
import ItemTable from "../../shared/ItemTable";

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
                {items && <ItemTable items={items}/>}
                {showAddItemModal && <AddUpdateItem companyid={userData.company?.id} show={showAddItemModal}
                                                    onHide={() => setShowAddItemModal(false)}/>}
            </>}
        </AuthContext.Consumer>
    )
}

export default ItemList;
