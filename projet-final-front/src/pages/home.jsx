import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './home.css';
import RightSidebar from '../components/RightSidebar';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPosts = async () => {
      if (!token) {
        navigate('/login'); // Redirige si pas de token
        return;
      }

      try {
        const response = await axios.get('http://localhost:1337/api/posts?populate=*', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const cleanPosts = response.data.data.map((post) => ({
          id: post.id,
          title: post.title,
          content: post.content,
          image: post.image?.data?.url || null,
          subreddit: post.subreddit?.data?.name || 'Aucun',
          author: post.author?.data?.username || 'Anonyme',
          votes: post.votes || 0,
          comments: post.comments?.data || [],
        }));

        setPosts(cleanPosts);
      } catch (error) {
        console.error('Erreur lors de la récupération des publications', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <div className="loading">Chargement en cours...</div>;

  return (
    <div className="reddit-layout">
      {/* Sidebar gauche */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="main-content">
        <h1>HETIC CONNECT</h1>

        {/* Barre de navigation */}
        <nav className="navbar">
          <Link to="/create-post" className="nav-link">Créer une publication</Link>
          <Link to="/create-subreddit" className="nav-link">Créer un subreddit</Link>
          <Link to="/profile" className="nav-link">Profil</Link>
          
          <button onClick={handleLogout} className="nav-link logout-button">Déconnexion</button>
        </nav>

        <div className="posts-list">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="post-card">
                <h3>{post.title}</h3>

                {post.image && (
                  <img
                    src={`http://localhost:1337${post.image}`}
                    alt={post.title || 'Image de publication'}
                    className="post-image"
                  />
                )}

                <p className="post-content">{post.content}</p>

                <p className="author">Publié par {post.author}</p>
                <p className="votes">Votes : {post.votes}</p>

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

      {/* Sidebar droite */}
      <RightSidebar />
    </div>
  );
}

export default Home;
