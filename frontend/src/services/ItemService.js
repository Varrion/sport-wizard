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
    ItemGender,
    Sport
}
