import React, { useState } from 'react';
import axios from 'axios';

function CreateSubreddit() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Vous devez être connecté pour créer un subreddit.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:1337/api/subreddits',
        {
          data: {
            name,
            description
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Réponse API:', response.data); // Afficher la réponse complète pour le débogage
      alert('Subreddit créé avec succès !');
      setName('');
      setDescription('');
    } catch (err) {
      console.error('Erreur création subreddit :', err.response ? err.response.data : err);
      setError('Erreur lors de la création du subreddit. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl mt-10"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Créer un subreddit</h2>

      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Nom du subreddit"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />

      <textarea
        placeholder="Description (optionnelle)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4 h-24"
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
        disabled={loading}
      >
        {loading ? 'Création en cours...' : 'Créer le subreddit'}
      </button>
    </form>
  );
}

export default CreateSubreddit;
