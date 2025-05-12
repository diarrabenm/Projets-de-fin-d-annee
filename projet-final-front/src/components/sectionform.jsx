import React, { useState } from 'react';

const Formulaire = () => {
  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: '',
  });

  // Gestion des changements dans les champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données envoyées :', formData);
    // Ici, vous pourriez ajouter une validation ou une requête API
    alert('Formulaire soumis avec succès !');
  };

  return (
    <form onSubmit={handleSubmit} className="formulaire">
      <div>
        <label htmlFor="nom">Nom :</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="message">Message :</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Envoyer</button>
    </form>
  );
};

export default Formulaire;