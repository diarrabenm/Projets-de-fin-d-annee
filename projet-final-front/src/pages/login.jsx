import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assurez-vous que useNavigate est bien importé
import './login.css'; 

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Récupération de la fonction navigate

  const handleLogin = async (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire

    try {
      // Envoi des informations d'identification pour l'authentification
      const res = await axios.post('http://localhost:1337/api/auth/local', {
        identifier,
        password,
      });

      // Enregistrer le token JWT dans localStorage
      localStorage.setItem('token', res.data.jwt);

      // Afficher un message de succès
      alert('Connexion réussie !');
      
      // Rediriger vers la page d'accueil après la connexion
      navigate('/Home', { replace: true });
    } catch (err) {
      // Si une erreur survient (par exemple, mauvais identifiant ou mot de passe)
      alert("Erreur d'authentification");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2> Hetic connect</h2>
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
