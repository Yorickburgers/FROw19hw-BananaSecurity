import React, {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

function SignIn() {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });

    const { loginFunction, setAuthToken, setIsAuthenticated } = useContext(AuthContext);


    function handleChange(e) {
        const { name, value } = e.target;
        setLoginInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(loginInfo);
        async function login() {
            try {
                const response = await axios.post("http://localhost:3000/login", {
                    password: loginInfo.password,
                    email: loginInfo.email,
                });
                console.log(response);
                setAuthToken(response.data.accessToken)
                loginFunction(loginInfo.email);
                const decoded = jwtDecode(response.data.accessToken);
                console.log(decoded);
                async function getDetails(token) {
                    try {
                        const response = await axios.get(`http://localhost:3000/600/users/${decoded.sub}`, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        console.log(response.data);
                        setIsAuthenticated({
                            auth: true,
                            user: {
                                username: response.data.username,
                                email: response.data.email,
                                id: response.data.id,
                            }
                        })
                    } catch (e) {
                        console.error(e);
                    }
                }
                getDetails(response.data.accessToken);
                navigate("/profile");
            } catch (e) {
                console.error("inloggen mislukt", e);
            }
        }
        login();

    }



  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={handleSubmit}>
        <input
            name="email"
            type="email"
            placeholder="emailadres"
            value={loginInfo.email}
            onChange={handleChange}
        />
        <input
            name="password"
            type="password"
            placeholder="********"
            value={loginInfo.password}
            onChange={handleChange}
        />
        <button
            type="submit"
        >Inloggen
        </button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;