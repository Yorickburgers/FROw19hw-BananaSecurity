import React, {useContext} from 'react';
import logo from '../assets/banana-01.png';
import { useNavigate, Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function NavBar() {
  const navigate = useNavigate();
  // console.log(useContext(AuthContext));
    const {isAuthenticated, userEmail, logoutFunction } = useContext(AuthContext);
    const handleLogout = () => {
        logoutFunction();
        navigate("/");
    }

  return (
    <nav>
        <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
            <h3>
              Banana Security
            </h3>
          </span>
        </Link>

      <div>
        {!isAuthenticated
            &&
            <>
                <button
                    type="button"
                    onClick={() => navigate('/signin')}
                >Log in
                </button>
                <button
                    type="button"
                    onClick={() => navigate('/signup')}
                >Registreren
                </button>
            </>}
        {isAuthenticated
            &&
            <>
            {userEmail?.email ? <p>{userEmail.email}</p> : null}
                <button
                    type="button"
                    onClick={handleLogout}
                >Log uit
                </button>
            </>}
      </div>
    </nav>
  );
}

export default NavBar;