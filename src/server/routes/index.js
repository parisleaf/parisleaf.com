'use strict';

import middleware from './middleware';
import api from './api';
import contact from './contact';
import appIndex from './views/appIndex';
import Styleguide from './views/Styleguide';

export default function(app) {
  middleware(app);
  api(app);
  Styleguide(app);
  contact(app);
  appIndex(app);
}
