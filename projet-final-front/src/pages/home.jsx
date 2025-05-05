import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Appel API pour récupérer les publications
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/posts');
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Erreur lors de la récupération des publications', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="home-container">
      <h1>Bienvenue sur MiniReddit</h1>
      <Link to="/create-post" className="create-post-btn">Créer une publication</Link>

      <div className="posts-list">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <h3>{post.title}</h3>
            <p className="author">Publié par {post.author}</p>
            <p className="votes">Votes : {post.votes}</p>
            <Link to={`/post/${post._id}`} className="comments-link">Voir les commentaires</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
