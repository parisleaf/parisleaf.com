'use strict';

import { Actions } from 'flummox';
import * as APIService from '../services/APIService';

export default class PostActions extends Actions {

  async getPosts(query = {}) {
    let posts = await APIService.getPosts(query);
    return { posts, query };
  }

  async getPostBySlug(slug) {
    return await APIService.getPostBySlug(slug);
  }

}
