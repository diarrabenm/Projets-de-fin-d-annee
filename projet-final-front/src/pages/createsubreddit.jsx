import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importer Link

const CreateSubreddit = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validation des données
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Minimum 3 caractères';
    } else if (formData.name.length > 30) {
      newErrors.name = 'Maximum 30 caractères';
    } else if (!/^[a-z0-9_]+$/i.test(formData.name)) {
      newErrors.name = 'Lettres, chiffres et underscores seulement';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Maximum 500 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validation en temps réel
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setApiError('Vous devez être connecté');
      return;
    }

    setIsSubmitting(true);
    setApiError('');

    try {
      const response = await axios.post(
        'http://localhost:1337/api/subreddits',
        {
          data: {
            Description: formData.description,
            Name: formData.name.trim().toLowerCase()
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setIsSuccess(true);
      setFormData({ name: '', description: '' });
      
      // Réinitialiser le message de succès après 3 secondes
      setTimeout(() => setIsSuccess(false), 3000);
      
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApiError = (error) => {
    console.error('Erreur API:', error);
    
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          setApiError(data.error?.message || 'Données invalides');
          break;
        case 401:
          setApiError('Authentification requise');
          break;
        case 403:
          setApiError('Permissions insuffisantes');
          break;
        case 409:
          setApiError('Ce subreddit existe déjà');
          break;
        default:
          setApiError('Une erreur est survenue, veuillez réessayer.');
      }
    } else if (error.request) {
      setApiError('Pas de réponse du serveur');
    } else {
      setApiError('Erreur de configuration');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Créer un nouveau Subreddit
      </h2>
      
      {apiError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {apiError}
        </div>
      )}
      
      {isSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Subreddit créé avec succès!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Nom du subreddit <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full p-2 border rounded-md ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="ex: programmation"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full p-2 border rounded-md h-24 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Décrivez votre communauté..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.description.length}/500 caractères
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className={`w-full py-2 px-4 rounded-md font-medium ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : isSuccess
              ? 'bg-green-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSubmitting
            ? 'Création en cours...'
            : isSuccess
              ? '✓ Créé avec succès'
              : 'Créer le Subreddit'}
        </button>
      </form>

      {/* Bouton de retour à la page d'accueil avec Link */}
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
};

export default CreateSubreddit;

