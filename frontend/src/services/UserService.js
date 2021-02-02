import axios from "axios";

const GetAllUsers = () => {
    return axios.get("user");
}

const GetUserDetails = (userId) => {
    return axios.get(`user/${userId}`);
}

const SignUpUser = (userForm) => {
    return axios.post("user", userForm);
}

const SignInUser = (userForm) => {
    return axios.post("user/sign-in", userForm);
}

const EditUser = (userId, userForm) => {
    return axios.put(`user/${userId}`, userForm);
}

const DeleteUser = (userId) => {
    return axios.delete(`user/${userId}`);
}

const AuthenticationToken = (email, password) => {
    return 'Basic ' + window.btoa(email + ":" + password);
}

const StripeKey = 'pk_test_51ICYOyKbGFXMWFFrTcyXCOfEYtXzGEblLOyqacKVfzgcjF93ZnGrLSGZuxVzGoiaNrnBSG4vWhdqjo5Df43ewzQb00jddotvuB';

export {GetAllUsers, GetUserDetails, SignUpUser, SignInUser, EditUser, DeleteUser, AuthenticationToken, StripeKey}
