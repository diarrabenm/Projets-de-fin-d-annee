import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:1337/api', // ou l'URL de ton Strapi déployé
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
