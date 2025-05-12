import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; // Import corrigé de la Navbar
import './home.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPosts = async () => {
      if (!token) {
        console.error("Token d'authentification non trouvé");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:1337/api/posts?populate=*', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const cleanPosts = response.data.data.map((post) => ({
          id: post.id,
          _id: post.id, // Ajout pour correspondre à votre structure
          title: post.attributes.title,
          content: post.attributes.content,
          image: post.attributes.image?.data?.attributes?.url || null,
          subreddit: post.attributes.subreddit?.data?.attributes?.name || 'Aucun',
          documentId: post.attributes.documentId,
          author: post.attributes.author || 'Anonyme',
          votes: post.attributes.votes || 0,
          comments: post.attributes.comments || [],
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
    <div className="main-container">
      <Header /> {/* Header intégré ici */}
      <div className="home-container">
        <h1>Bienvenue sur HETIC CONNECT</h1>
        
        {token && (
          <Link to="/create-post" className="create-post-btn">
            Créer une publication
          </Link>
        )}

        <div className="posts-list">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="post-card"> {/* Changé de post._id à post.id */}
                <h3>{post.title}</h3>
                {post.image && (
                  <img 
                    src={`http://localhost:1337${post.image}`} 
                    alt={post.title}
                    className="post-image"
                  />
                )}
                <p className="post-content">{post.content}</p>
                <p className="author">Publié par {post.author}</p>
                <p className="votes">Votes : {post.votes}</p>
                <Link to={`/post/${post.id}`} className="comments-link">
                  Voir les commentaires ({post.comments.length})
                </Link>
              </div>
            ))
          ) : (
            <p className="no-posts">Aucune publication trouvée.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;