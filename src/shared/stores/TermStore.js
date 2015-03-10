import { Store } from 'flummox';
import Immutable from 'immutable';

export default class TermStore extends Store {
  constructor(flux) {
    super();

    const termActions = flux.getActions('terms');

    this.register(termActions.getTaxonomyTerms, this.handleNewTaxonomyTerms);

    this.state = {
      taxonomies: Immutable.Map()
    };
  }

  handleNewTaxonomyTerms(terms) {
    const newTerms = Immutable.fromJS(terms);

    this.setState({
      taxonomies: this.state.taxonomies.merge(newTerms),
    });
  }

  getTaxonomyTerms(taxonomyName) {
    return this.state.taxonomies.get(taxonomyName);
  }
}
