import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './profile.css'; // Vérifie bien que ce fichier existe avec le bon nom

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          return navigate('/login');
        }

        // Récupérer les infos de l'utilisateur connecté
        const userRes = await axios.get('http://localhost:1337/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(userRes.data);

        // Récupérer les posts créés par cet utilisateur
        const postsRes = await axios.get(
          `http://localhost:1337/api/posts?filters[user][id][$eq]=${userRes.data.id}&populate=*`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPosts(postsRes.data.data); // Strapi retourne les données dans .data.data
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="profile-container">
      {user ? (
        <>
          <div className="profile-header">
            <h2>{user.username}</h2>
            <p>{user.email}</p>
          </div>

          <div className="profile-posts">
            <h3>Mes publications récentes</h3>
            {posts.length === 0 ? (
              <p>Aucune publication trouvée</p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="post-card">
                  <h4>{post.attributes.title}</h4>
                  <p>{post.attributes.content}</p>
                </div>
              ))
            )}
          </div>

          <div className="profile-actions">
            <button onClick={() => navigate('/edit-profile')}>Modifier le profil</button>
            <button onClick={() => navigate('/create-post')}>Créer une publication</button>
          </div>
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}

export default Profile;
