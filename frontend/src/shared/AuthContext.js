import {createContext} from "react";

const AuthContext = createContext({user: null, company: null, logoutUser: null});

export {AuthContext};
