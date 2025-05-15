import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubredditManager = () => {
  const [subreddits, setSubreddits] = useState([]);
  const [newName, setNewName] = useState('');
  const [editSubredditId, setEditSubredditId] = useState(null);

  // Charger les subreddits depuis l'API
  useEffect(() => {
    const fetchSubreddits = async () => {
      try {
        const response = await axios.get('/api/subreddits');
        setSubreddits(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des subreddits", error);
      }
    };

    fetchSubreddits();
  }, []);

  // Modifier un subreddit
  const handleEdit = (subredditId) => {
    const subreddit = subreddits.find((sub) => sub.id === subredditId);
    if (subreddit) {
      setEditSubredditId(subredditId);
      setNewName(subreddit.name);
    }
  };

  const handleSaveEdit = async () => {
    if (newName.trim() === '') return;

    try {
      await axios.put(`/api/subreddits/${editSubredditId}`, { name: newName });
      setSubreddits(subreddits.map((sub) => (sub.id === editSubredditId ? { ...sub, name: newName } : sub)));
      setEditSubredditId(null);
      setNewName('');
    } catch (error) {
      console.error("Erreur lors de la mise à jour du subreddit", error);
    }
  };

  // Supprimer un subreddit
  const handleDelete = async (subredditId) => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce subreddit ?');
    if (confirmed) {
      try {
        await axios.delete(`/api/subreddits/${subredditId}`);
        setSubreddits(subreddits.filter((sub) => sub.id !== subredditId));
      } catch (error) {
        console.error("Erreur lors de la suppression du subreddit", error);
      }
    }
  };

  return (
    <div>
      <h2>Gestion des Subreddits</h2>

      <div>
        <h3>Modifier le nom du subreddit</h3>
        {editSubredditId && (
          <div>
            <input 
              type="text" 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
              placeholder="Nouveau nom du subreddit" 
            />
            <button onClick={handleSaveEdit}>Enregistrer</button>
          </div>
        )}
      </div>

      <div>
        <h3>Liste des Subreddits</h3>
        <ul>
          {subreddits.map((subreddit) => (
            <li key={subreddit.id}>
              <span>{subreddit.name}</span>
              <button onClick={() => handleEdit(subreddit.id)}>Modifier</button>
              <button onClick={() => handleDelete(subreddit.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubredditManager;
