import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import axios from "axios";

const authenticationToken = sessionStorage.getItem("AuthenticationToken");

axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.headers.common['Authorization'] = authenticationToken;
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
