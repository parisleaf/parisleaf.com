'use strict';

import { wpRequest } from './WP';
import request from 'superagent';

export default function(app) {

  app.get('/api/menus', function *() {
    let response = yield wpRequest('/menus').exec();
    
    response = yield response.body.map(function(single) {
      
      return wpRequest('/menus/' + single.ID).exec().then(
        response => response.body
      ); 
    });

    this.body = response; 
  });
}
