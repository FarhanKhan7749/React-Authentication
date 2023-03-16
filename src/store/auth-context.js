import react, { useState } from "react";

const AuthContext = react.createContext({
    token: "",
    isLoggedin: false,
    login: (token) => { },
    logout: () => { }
});

export const AuthContextProvider = (props) => {
    const intialToken = localStorage.getItem('token');
    const [token, setToken] = useState(intialToken);
    //
    // setTimeout(()=>{
    //     logouthandler();
    // },5000);
    //

    // const userIsLoggedIn = !!localStorage.getItem('token');
    // let userIsLoggedIn = !!token;

    const userIsLoggedIn = !!token;


    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
        setTimeout(()=>{
            localStorage.removeItem('token');
        },300000) // this will remove token after 5min.
    };

    const logouthandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    const contextValue = {
        token: token,
        isLoggedin: userIsLoggedIn,
        login: loginHandler,
        logout: logouthandler,
    };

    // setTimeout(() => {
    //     localStorage.removeItem('token');
    //     userIsLoggedIn = false;
    // }, 50000);

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
};

export default AuthContext;