import React, { useState, useEffect } from 'react'; // Importer React et useState, useEffect (les hooks)
import axios from 'axios';
import './RightSidebare.css';

function RightSidebar() {
  const [subreddits, setSubreddits] = useState([]);
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  

  // Fonction pour charger les subreddits
  const fetchSubreddits = async () => {
    try {
      if (!token) {
        console.error('Token non trouvé. Assurez-vous d\'être connecté.');
        return;
      } 

      const response = await axios.get('http://localhost:1337/api/subreddits', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSubreddits(response.data.data);
    } catch (error) {
      console.error('Erreur lors du chargement des subreddits', error.response || error);
      if (error.response && error.response.status === 401) {
        console.error('Le jeton est invalide ou expiré.');
      }
    }
  };

  // Fonction pour charger les posts
  const fetchPosts = async () => {
    try {
      if (!token) {
        console.error('Token non trouvé. Assurez-vous d\'être connecté.');
        return;
      }

      const postsResponse = await axios.get('http://localhost:1337/api/posts?populate=*', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setPosts(postsResponse.data.data);
    } catch (error) {
      console.error('Erreur lors du chargement des posts', error.response || error);
      if (error.response && error.response.status === 401) {
        console.error('Le jeton est invalide ou expiré.');
      }
    }
  };

  // useEffect pour charger les données au montage
  useEffect(() => {
    fetchSubreddits();
    fetchPosts();
  }, );

  // Exemple : ici on filtre les subreddits créés par l'utilisateur avec un critère plus précis
  // (par exemple, en vérifiant un champ "userId" ou "creatorId" si votre API le permet)
  const mySubreddits = subreddits.filter(sub => sub.creatorId === 'votreUserId'); // Remplacez 'votreUserId' par l'ID de l'utilisateur actuel

  return (
    <div className="right-sidebar">
      <h2>SUGGESTION</h2>

      <div className="suggestions">
        <div className="header-with-refresh">
          <h3>Subreddits Populaires</h3>
          <button onClick={fetchSubreddits} className="refresh-button">↻</button>
        </div>
        <ul>
          {subreddits.length > 0 ? (
            subreddits.map((subreddit) => (
              <li key={subreddit.id}>
                <a href={`/r/${subreddit.Name}`}>r/{subreddit.Name}</a>
              </li>
            ))
          ) : (
            <li>Aucun subreddit trouvé.</li>
          )}
        </ul>
      </div>

      <div className="my-subreddits">
        <h3>Mes Subreddits</h3>
        <ul>
          {mySubreddits.length > 0 ? (
            mySubreddits.map((subreddit) => (
              <li key={subreddit.id}>
                <a href={`/r/${subreddit.Name}`}>r/{subreddit.Name}</a>
              </li>
            ))
          ) : (
            <li>Aucun subreddit personnel.</li>
          )}
        </ul>
      </div>

      <div className="recent-posts">
        <h3>Publications Récentes</h3>
        <ul>
          {posts.length > 0 ? (
            posts.slice(0, 5).map((post) => (
              <li key={post.id}>
                <a href={`/post/${post.id}`}>{post.title}</a>
              </li>
            ))
          ) : (
            <li>Aucun post récent.</li>
          )}
        </ul>
      </div>

      <div className="explore-more">
        <a href="/explore" className="explore-link">Explorer plus de subreddits</a>
      </div>
    </div>
  );
}

export default RightSidebar;
