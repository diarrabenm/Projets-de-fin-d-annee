import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RightSidebare.css'; // Si tu veux ajouter des styles spécifiques

function RightSidebar() {
  const [subreddits, setSubreddits] = useState([]);
  const [posts, setPosts] = useState([]);

  // Récupérer les subreddits populaires (ou autres données)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const subredditResponse = await axios.get('http://localhost:1337/api/subreddits');
        const postsResponse = await axios.get('http://localhost:1337/api/posts?populate=*');

        // Supposons que les subreddits et les posts sont retournés de cette manière
        setSubreddits(subredditResponse.data.data);
        setPosts(postsResponse.data.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données', error);
      }
    };

    fetchData();
  }, []);

  return (
     <div className="right-sidebar">
       <h2>Suggestions</h2>

      <div className="suggestions">
        <h3>Subreddits Populaires</h3>
        <ul>
          {subreddits.length > 0 ? (
            subreddits.map((subreddit) => (
              <li key={subreddit.id}>
                <a href={`/r/${subreddit.name}`}>r/{subreddit.name}</a>
              </li>
            ))
          ) : (
            <li>Aucun subreddit trouvé.</li>
          )}
        </ul>
      </div>

      <div className="recent-posts">
        <h3>Publications Récentes</h3>
        <ul>
          {posts.length > 0 ? (
            posts.slice(0, 5).map((post) => ( // Affiche les 5 derniers posts
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