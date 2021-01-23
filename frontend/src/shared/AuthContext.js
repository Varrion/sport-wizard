import {createContext} from "react";

const AuthContext = createContext({user: null, logoutUser: null});

export {AuthContext};
