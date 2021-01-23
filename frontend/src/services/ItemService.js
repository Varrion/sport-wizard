import axios from "axios";

const GetAllItems = () => {
    return axios.get("item");
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

export {GetAllItems, GetItemDetails, AddItem, EditItem, DeleteItem}