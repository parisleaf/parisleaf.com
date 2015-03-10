import { Actions } from 'flummox';
import { getTaxonomyTerms } from '../services/APIService.js'

export default class TermActions extends Actions {
  async getTaxonomyTerms(taxonomyName) {
    const terms = await getTaxonomyTerms(taxonomyName);

    return {
      [taxonomyName]: terms
    };
  }
}
