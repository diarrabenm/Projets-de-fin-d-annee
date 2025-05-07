import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:1337/api/auth/local', {
        identifier,
        password,
      });

      localStorage.setItem('token', res.data.jwt);
      alert('Connexion réussie !');
      navigate('/');
    } catch (err) {
      alert("Erreur d'authentification");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Se connecter à Reddit</h2>
        <form onSubmit={handleLogin}>
          <label>E-mail ou nom d'utilisateur</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="email@exemple.com"
            required
          />

          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />

          <button type="submit">Se connecter</button>
        </form>

        <p className="register-link">
          Pas encore inscrit ? <a href="/register">Créer un compte</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
