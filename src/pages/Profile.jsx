import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {
  const username = useContext(AuthContext);
  const email = useContext(AuthContext);
  const [privateContent, setPrivateContent] = useState({})

  useEffect(() => {
      async function getPrivateContent() {
          try {
              const token = localStorage.getItem('authToken');
              const response = await axios.get(`http://localhost:3000/660/private-content`, {
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                  }
              })
              setPrivateContent(response.data);
          } catch(e) {
              console.error(e);
          }
      }
      getPrivateContent();
  })
    return (
    <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
      </section>
      <section>
        <h2>Strikt geheime profiel-content</h2>
        <p>{privateContent.title}: {privateContent.content}</p>
      </section>
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;