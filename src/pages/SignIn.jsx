import React, {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function SignIn() {
    const navigate = useNavigate();
    const [emailInput, setEmailInput] = useState('');

    const { loginFunction } = useContext(AuthContext);
    const handleLogin = (e) => {
        e.preventDefault();
        loginFunction(emailInput);
        navigate("/profile");
    };

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={handleLogin}>
        <input
            name="email"
            type="email"
            placeholder="emailadres"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
        />
        <input
            name="password"
            type="password"
            placeholder="********"
        />
        <button
            type="submit"
            onClick={handleLogin}
        >Inloggen
        </button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;