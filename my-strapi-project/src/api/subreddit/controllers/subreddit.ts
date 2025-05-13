/**
 * subreddit controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::subreddit.subreddit', ({ strapi }) => ({
  async create(ctx) {
    console.log('Creating a new subreddit...');
    console.log('Request body:', ctx.request.body);

    // Vérifier si le nom du subreddit existe et a une longueur d'au moins 3 caractères
    const { name } = ctx.request.body.data;

    if (name && name.length < 3) {
      // Retourner une erreur si le nom est trop court
      return ctx.badRequest('Le nom du subreddit doit comporter au moins 3 caractères.');
    }

    // Si la validation passe, on crée le subreddit
    return await super.create(ctx);
  }
}));
