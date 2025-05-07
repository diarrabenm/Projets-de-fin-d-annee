import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ← Importer le hook
import axios from 'axios';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subredditId, setSubredditId] = useState('');
  const [subreddits, setSubreddits] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  const navigate = useNavigate(); // ← Initialiser le hook
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  // 🔁 Redirection automatique si non connecté
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // ← Remplace par le chemin de ta page de connexion
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/subreddits')
      .then((res) => {
        setSubreddits(res.data.data);
      })
      .catch((err) => console.error('Erreur récupération subreddits:', err));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('files.image', image);

    try {
      await axios.post(
        'http://localhost:1337/api/posts',
        {
          data: {
            title,
            content,
            subreddit: subredditId,
          },
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert('Post créé avec succès !');
      setTitle('');
      setContent('');
      setSubredditId('');
      setImage(null);
      setPreview('');
    } catch (err) {
      alert('Erreur lors de la création du post.');
      console.error(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Créer un post</h2>

      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />

      <textarea
        placeholder="Contenu"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md mb-4 h-32"
      />

      <select
        value={subredditId}
        onChange={(e) => setSubredditId(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      >
        <option value="">Choisir un subreddit</option>
        {subreddits.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Image (optionnelle)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {preview && (
          <div className="mt-2">
            <img src={preview} alt="Preview" className="max-h-40 rounded-md" />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Publier
      </button>
    </form>
  );
}

export default CreatePost;
