import posts from './posts';
import pages from './pages';
import projects from './projects';
import taxonomies from './taxonomies';
import menus from './menus';
import tweets from './tweets';
import options from './options';

export default function(app) {
  posts(app);
  pages(app);
  projects(app);
  taxonomies(app);
  menus(app);
  tweets(app);
  options(app);
}
