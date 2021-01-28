import React, {useEffect, useState} from "react";
import {GetAllItems} from "../../services/ItemService";
import {AuthContext} from "../../shared/AuthContext";
import {Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import AddUpdateItem from "./AddUpdateItem";
import DefaultSportPicture from "../../shared/images/defaultSport.jpg"
import {useHistory} from "react-router-dom";

const ItemList = () => {
    const [items, setItems] = useState(null);
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const history = useHistory();

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
                            <tr key={item.id} className={"item-row"} onClick={() => history.push(`/item/${item.id}`)}>
                                <td><img
                                    src={item.picture ? "data:image/jpeg;base64," + item.picture : DefaultSportPicture}
                                    width={120} height={90}/></td>
                                <td className={"item-data"}>{item.name}</td>
                                <td className={"item-data"}>{item.description}</td>
                                <td className={"item-data"}>{item.price}</td>
                                <td className={"item-data"}>{item.category.name}</td>
                                <td className={"item-data"}>{item.itemGender}</td>
                            </tr>)}
                        </tbody>
                    </Table>
                </div>}
                {showAddItemModal && <AddUpdateItem companyid={userData.company?.id} show={showAddItemModal}
                                                    onHide={() => setShowAddItemModal(false)}/>}
            </>}
        </AuthContext.Consumer>
    )
}

export default ItemList;
