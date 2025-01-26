import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
    const [registerInfo, setRegisterInfo] = React.useState({
      email: "",
      password: "",
      username: "",
  });

    function handleChange(e) {
        const { name, value } = e.target;
        setRegisterInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(registerInfo);
        async function register() {
            try {
                const response = await axios.post("http://localhost:3000/register", {
                    username: registerInfo.username,
                    password: registerInfo.password,
                    email: registerInfo.email,
                });
                console.log(response);
                navigate("/signin");
            } catch (e) {
                console.error("Registreren mislukt", e);
            }
        }

        register();
    }

    return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
        <form onSubmit={handleSubmit}>
            <input
                name="email"
                type="email"
                placeholder="emailadres"
                value={registerInfo.email}
                onChange={handleChange}
            />
            <input
                name="password"
                type="password"
                placeholder="********"
                value={registerInfo.password}
                onChange={handleChange}
            />
            <input
                name="username"
                type="text"
                placeholder="gebruikersnaam"
                value={registerInfo.username}
                onChange={handleChange}
            />
            <button type="submit">Registreren</button>
        </form>
        <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;