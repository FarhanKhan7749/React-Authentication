import react, { useState } from "react";

const AuthContext = react.createContext({
    token: "",
    isLoggedin: false,
    login : (token) =>{},
    logout: () => {}
});

export const AuthContextProvider = (props) => {
    const intialToken = localStorage.getItem('token')
    const [token, setToken] = useState(intialToken);

    // const userIsLoggedIn = !!localStorage.getItem('token');
    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    };

    const logouthandler = () => {
        setToken(null);
        localStorage.removeItem('token')
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