import react, { useState } from "react";

const AuthContext = react.createContext({
    token: "",
    isLoggedin: false,
    login : (token) =>{},
    logout: () => {}
});

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
    };

    const logouthandler = () => {
        setToken(null);
    };

    const contextValue = {
        token: token,
        isLoggedin: userIsLoggedIn,
        login: loginHandler,
        logout: logouthandler,
    };

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
};

export default AuthContext;