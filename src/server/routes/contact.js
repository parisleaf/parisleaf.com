export default function(app) {
  app.post('/contact', function *() {
    this.body = { success: true };
  });
}
