'use strict';

import Immutable from 'immutable';

describe('PostUtils', () => {

  describe('.getTermNames', () => {
    import { getTermNames } from '../PostUtils';

    it('returns an array of term names', () => {

      let p1 = Immutable.fromJS({
        terms: {
          foobar_tag: [
            { name: 'foo' },
            { name: 'bar' },
            { name: 'baz' },
          ],
        }
      });

      expect(getTermNames(p1, 'foobar_tag')).to.deep.equal([
        'foo',
        'bar',
        'baz',
      ]);
    });

    it('returns empty array if project has no services', () => {

      let p1 = Immutable.fromJS({
        terms: {},
      })

      expect(getTermNames(p1, 'foobar_tag')).to.deep.equal([]);

    });

  });

});
