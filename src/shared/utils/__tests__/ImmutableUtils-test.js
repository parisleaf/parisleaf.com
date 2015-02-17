'use strict';

import Immutable from 'immutable';
import ImmutableUtils from '../ImmutableUtils';

describe('ImmutableUtils', () => {

  describe('nestedGet', () => {
    let { nestedGet } = ImmutableUtils;

    let m = Immutable.fromJS({
      foo: {
        bar: {
          baz: 'foo',
        }
      },
    });

    it('returns a nested value', () => {
      expect(nestedGet(m, 'foo', 'bar', 'baz')).to.equal('foo');
      expect(nestedGet(m, 'foo', 'baz', 'bar')).to.be.undefined;
    });

    it('returns undefined if value isn\'t an Immutable collection', () => {
      expect(nestedGet(undefined, 'foo', 'bar')).to.be.undefined;
      expect(nestedGet(null, 'foo', 'bar')).to.be.undefined;
      expect(nestedGet({}, 'foo', 'bar')).to.be.undefined;
    });

  });

});
