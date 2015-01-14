'use strict';

import middleware from './middleware';
import api from './api';
import appIndex from './views/appIndex';
import Styleguide from './views/Styleguide';

export default function(app) {
  middleware(app);
  api(app);
  Styleguide(app);
  appIndex(app);
  
}
