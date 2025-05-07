import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Vérifie si un token est disponible dans le localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPosts = async () => {
      if (!token) {
        console.error("Token d'authentification non trouvé");
        return;
      }

      try {
        const response = await axios.get('http://localhost:1337/api/posts?populate=*', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Traitement des posts pour simplifier la structure des données
        const cleanPosts = response.data.data.map((post) => ({
          id: post.id,
          title: post.title,
          content: post.content,
          image: post.image?.data?.attributes?.url || null,
          subreddit: post.subreddit ? post.subreddit.name : 'Aucun', // Handle null subreddit
          documentId: post.documentId,
        }));

        setPosts(cleanPosts);
      } catch (error) {
        console.error('Erreur lors de la récupération des publications', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  if (loading) return <div className="loading">Chargement en cours...</div>;

  return (
    <div className="home-container">
      <h1>HETIC CONNECT</h1>
      {/* Afficher le bouton de création de publication uniquement si un token est présent */}
      {token && <Link to="/create-post" className="create-post-btn">Créer une publication</Link>}

      <div className="posts-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>

              {/* Afficher l'image si elle existe */}
              {post.image && (
                <img
                  src={`http://localhost:1337${post.image}`}
                  alt={post.title || 'Image de publication'}
                  className="post-image"
                />
              )}

              <p className="post-content">{post.content}</p>

              <p className="author">
                Publié par {post.author || 'Anonyme'}
              </p>

              <p className="votes">Votes : {post.votes || 0}</p>

              <Link to={`/post/${post.id}`} className="comments-link">
                Voir les commentaires ({post.comments?.length || 0})
              </Link>
            </div>
          ))
        ) : (
          <p className="no-posts">Aucune publication trouvée.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
