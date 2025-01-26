import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});


function AuthContextProvider({children}) {
    const [authToken, setAuthToken] = useState("");
    const [decodedToken, setDecodedToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState({
        auth: false,
        user: {
            username: "",
            email: "",
            id: null,
        },
        status: "pending",
    });
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Context wordt gerefresht!")
        const token = localStorage.getItem("authToken")
        if (token) {
            const decoded = jwtDecode(token);

            async function getID() {
                try {
                    const response = await axios.get(`http://localhost:3000/600/users/${decoded.sub}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });
                    setIsAuthenticated({
                        auth: true,
                        user: {
                            username: response.data.username,
                            email: response.data.email,
                            id: response.data.id,
                        },
                        status: "done",
                    });
                } catch (e) {
                    console.error(e);
                    setIsAuthenticated({
                        auth: false,
                        user: {
                            username: "",
                            email: "",
                            id: null,
                        },
                        status: "done"
                    });
                }

            }

            getID();
        } else {
            setIsAuthenticated({
                auth: false,
                user: {
                    username: "",
                    email: "",
                    id: null,
                },
                status: "done"
            })
        }
    }, []);

    function handleSetAuthToken(token) {
        localStorage.setItem("authToken", token);
        setAuthToken(token);
    }

    function logIn(inputValue) {
        setIsAuthenticated({
            auth: true,
        });
        console.log(`Gebruiker ${inputValue} is ingelogd!`);
        navigate("/profile");

    }



    function logOut() {
        localStorage.removeItem("authToken");
        setIsAuthenticated({
            auth: false,
            user: {
                username: "",
                email: "",
                id: null,
            },
        });
        console.log("Gebruiker is uitgelogd!");
        navigate("/");

    }


    // useEffect(() => {
    //     logIn(authToken)
    // }, [authToken]);
    return (
        <AuthContext.Provider value={{
            authToken,
            setAuthToken: handleSetAuthToken,
            setIsAuthenticated,
            isAuthenticated: isAuthenticated.auth,
            userEmail: isAuthenticated.user,
            loginFunction: logIn,
            logoutFunction: logOut,
        }}>
            {isAuthenticated.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;