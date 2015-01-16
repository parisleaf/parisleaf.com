'use strict';

import Immutable from 'immutable';

describe('ProjectUtils', ()=> {

  describe('.isCaseStudy()', () => {
    import { isCaseStudy } from '../ProjectUtils';

    it('returns true if case study has a project tag with slug "case-study"', () => {

      let p1 = Immutable.fromJS({
        terms: {
          project_tag: [
            { slug: 'case-study' },
          ],
        }
      });

      expect(isCaseStudy(p1)).to.be.true;

      let p2 = Immutable.fromJS({
        terms: {
          project_tag: [
            { slug: 'foo' },
          ],
        }
      });

      // expect(isCaseStudy(p2)).to.be.false;

    });
  });

});
