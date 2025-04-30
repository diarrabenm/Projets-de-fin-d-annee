import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:1337/api', // change ici si ton Strapi est déployé
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
