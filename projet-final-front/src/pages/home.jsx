import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; // Import corrigé de la Navbar
import RightSidebar from '../components/RightSidebar';
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
        let page = 1;
        let pageCount = 2;
        let cleanPosts = [];

        while (page <= pageCount) {
          const response = await axios.get(`http://localhost:1337/api/posts?populate=*&pagination[page]=${page}&pagination[pageSize]=25`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          cleanPosts.push(...response.data.data.map((post) => ({
            id: post.id,
            _id: post.id, // Ajout pour correspondre à votre structure
            title: post.title,
            content: post.content,
            image: post.images?.url || null,
            subreddit: post.subreddit?.data?.name || 'Aucun',
            documentId: post.documentId,
            author: post.user?.username || 'Anonyme',
            votes: post.votes || 0,
            comments: post.comments || [],
          })));

          pageCount = response.data.meta.pagination.pageCount;
          page++;
          console.log("Page : ", page);
          console.log("PageCount : ", pageCount);
          console.log("cleanPosts : ", cleanPosts);
        }

        setPosts(cleanPosts);
      } catch (error) {
        console.error('Erreur lors de la récupération des publications', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  // Fonction suppression de post
  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce post ?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:1337/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Mettre à jour l’état en supprimant le post localement
      setPosts((prevPosts) => prevPosts.filter((post) => post.documentId !== postId));

      alert("Post supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression du post :", error);
      alert("Échec de la suppression du post.");
    }
  };

  if (loading) return <div className="loading">Chargement en cours...</div>;

  return (
    <div className="main-container">
      <Header /> {/* Header intégré ici */}
      <div className="home-container">
        <h1>Bienvenue sur HETIC CONNECT</h1>
        
        {token && (
          <Link to="/CreatePost" className="create-post-btn">
            Créer une publication
          </Link>
        )}

        <div className="posts-list">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="post-card"> {/* Changé de post._id à post.id */}
                <h3>{post.title}</h3>
                {post.image ? (
                  <img 
                    src={`http://localhost:1337${post.image}`} 
                    alt={post.title}
                    className="post-image"
                  />
                ) : (
                  <div className="no-image">Aucune image disponible</div> // Message si pas d'image
                )}
                <p className="post-content">{post.content}</p>
                <p className="author">Publié par {post.author}</p>
                <p className="votes">Votes : {post.votes}</p>
                <Link to={`/post/${post.id}`} className="comments-link">
                  Commentaires{/* Voir les commentaires ({post.comments.length}) */}
                </Link>
                <button
                  onClick={() => handleDeletePost(post.documentId)}
                  className="delete-post-btn"
                >
                  Supprimer
                </button>
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
