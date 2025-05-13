import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:1337/api', // change ici si ton Strapi est déployé
  headers: {
    'Content-Type': 'application/json',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  },
});

// const findAll = async (url, params) => {
//   try {
//     let page = 1;
//     let pageCount = 2;
//     let entities = [];

//     let full_url = `${url}?${params}`;
//     const response = await client.get(url);
//     return response.data;
//   } catch (error) {
//     console.error('Erreur lors de la récupération des données :', error);
//     throw error;
//   }
// };

export default client;
