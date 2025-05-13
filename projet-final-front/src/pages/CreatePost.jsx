import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importer Link pour le bouton retour
import axios from 'axios';
import './CreatePost.css'; // Assurez-vous d'avoir ce fichier CSS pour le style

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subredditId, setSubredditId] = useState('');
  const [subreddits, setSubreddits] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate(); // Initialiser le hook
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  // 🔁 Redirection automatique si non connecté
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    }
  }, [isAuthenticated, navigate]);

  // Récupérer les subreddits lors du premier rendu
  useEffect(() => {
    axios.get('http://localhost:1337/api/subreddits?populate=*', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((res) => {
      console.log(res.data.data); // Vérification des subreddits récupérés
      setSubreddits(res.data.data);
    })
    .catch((err) => console.error('Erreur récupération subreddits:', err));
  }, []);

  // Gérer le changement de l'image
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

  // Soumettre le formulaire pour créer un post
  async function handleSubmit(e) {
    e.preventDefault();

    let bodyData = {
      title,
      content,
      subreddit: {
        connect: [subredditId]
      
      },
    }

    try {

      if (image) {
        const formData = new FormData();
        formData.append('files', image);
        const res = await axios.post(
          'http://localhost:1337/api/upload',
          formData,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "multipart/form-data"
            }
          }
        );

        bodyData.images = res.data[0].id;

      }



      await axios.post(
        'http://localhost:1337/api/posts', {data: bodyData},
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
      setUsername('');
      setSubredditId('');
      setImage(null);
      setPreview('');
    } catch (err) {
      alert('Erreur lors de la création du post.');
      console.error(err);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Créer un post</h2>

      <form
        onSubmit={handleSubmit}
        className="mb-6"
        encType="multipart/form-data"
      >
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
            <option key={s.id} value={s.documentId}>
              {s.Name}
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

      {/* Bouton de retour à la page d'accueil */}
      <Link
        to="/home"
        style={{
          marginTop: '24px',
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#1976d2',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          textAlign: 'center'
        }}
      >
        Retour à la page d'accueil
      </Link>
    </div>
  );
}

export default CreatePost;


















