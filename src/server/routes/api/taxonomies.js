import wp from './WP';

export default function(app) {
  app.get('/api/taxonomies/:taxonomyName/terms', function *() {
    const terms = yield wp.taxonomies().taxonomy(this.params.taxonomyName).terms();

    this.body = {
      terms,
    };
  });
}
