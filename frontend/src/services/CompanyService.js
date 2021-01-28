import axios from "axios";

const GetAllCompanies = () => {
    return axios.get("company");
}

const GetCompanyDetails = (companyId) => {
    return axios.get(`company/${companyId}`);
}

const GetMyCompany = (ownerEmail) => {
    return axios.get("company/my-company", {
        params: {
            ownerEmail: ownerEmail
        }
    })
}

const AddCompany = (companyForm) => {
    return axios.post("company", companyForm);
}

const EditCompany = (companyId, companyForm) => {
    return axios.put(`company/${companyId}`, companyForm);
}

const DeleteCompany = (companyId) => {
    return axios.delete(`company/${companyId}`);
}

export {GetAllCompanies, GetCompanyDetails, AddCompany, EditCompany, DeleteCompany, GetMyCompany}
