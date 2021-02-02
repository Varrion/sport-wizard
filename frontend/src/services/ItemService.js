import axios from "axios";

const GetAllItems = () => {
    return axios.get("item");
}

const GetItemsByCategory = (categoryId) => {
    return axios.get(`item/category/${categoryId}`)
}

const GetItemsByCompany = (companyId) => {
    return axios.get(`item/company/${companyId}`)
}

const GetItemDetails = (itemId) => {
    return axios.get(`item/${itemId}`);
}

const AddItem = (itemForm) => {
    return axios.post("item", itemForm);
}

const EditItem = (itemId, itemForm) => {
    return axios.put(`item/${itemId}`, itemForm);
}

const DeleteItem = (itemId) => {
    return axios.delete(`item/${itemId}`);
}

const EditItemsInShoppingCart = (cartDto) => {
    return axios.post("item/update-cart", cartDto);
}

const ClearItemsFromShoppingCart = (userEmail) => {
    return axios.post("item/clear-cart", userEmail);
}

const ChargeItems = (chargeDto) => {
    return axios.post("item/charge", chargeDto);
}

const ItemGender = ["Male", "Female", "Kids", "Unisex", "Accessories"];

const Sport = ["None", "Multiple", "Basketball", "Football", "Skiing", "Swimming", "Handball", "Tennis", "Other"]


export {
    GetAllItems,
    GetItemDetails,
    AddItem,
    EditItem,
    DeleteItem,
    GetItemsByCategory,
    GetItemsByCompany,
    EditItemsInShoppingCart,
    ClearItemsFromShoppingCart,
    ChargeItems,
    ItemGender,
    Sport
}
