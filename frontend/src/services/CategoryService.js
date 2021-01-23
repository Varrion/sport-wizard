import axios from "axios";

const GetAllCategories = () => {
    return axios.get("category");
}

const GetCategoryDetails = (categoryId) => {
    return axios.get(`category/${categoryId}`);
}

const AddCategory = (categoryForm) => {
    return axios.post("category", categoryForm);
}

const EditCategory = (categoryId, categoryForm) => {
    return axios.put(`category/${categoryId}`, categoryForm);
}

const DeleteCategory = (categoryId) => {
    return axios.delete(`category/${categoryId}`);
}

export {GetAllCategories, GetCategoryDetails, AddCategory, EditCategory, DeleteCategory}