import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    // hier komt straks de state waarin we de context-data plaatsen
    const [isAuthenticated, setIsAuthenticated] = useState({
        auth: false,
        user: "",
    });
    const navigate = useNavigate();

    function logIn(inputValue) {
        setIsAuthenticated({
            auth: true,
            user: inputValue,
        });
        console.log(`Gebruiker ${inputValue} is ingelogd!`);
        navigate("/profile");
    }

    function logOut() {
        setIsAuthenticated({
            auth: false,
            user: "",
        });
        console.log("Gebruiker is uitgelogd!");
        navigate("/");
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated: isAuthenticated.auth,
            userEmail: isAuthenticated.user,
            loginFunction: logIn,
            logoutFunction: logOut,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;