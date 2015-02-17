'use strict';

import Immutable from 'immutable';
import ProjectUtils from '../ProjectUtils';

describe('ProjectUtils', () => {

  describe('.isCaseStudy()', () => {
    let { isCaseStudy } = ProjectUtils;

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

      expect(isCaseStudy(p2)).to.be.false;

    });
  });

  describe('.getServices', () => {
    let { getServices } = ProjectUtils;

    it('returns an array of service names', () => {

      let p1 = Immutable.fromJS({
        terms: {
          project_service: [
            { name: 'foo' },
            { name: 'bar' },
            { name: 'baz' },
          ],
        }
      });

      expect(getServices(p1)).to.deep.equal([
        'foo',
        'bar',
        'baz',
      ]);
    });

    it('returns empty array if project has no services', () => {

      let p1 = Immutable.fromJS({
        terms: {},
      })

      expect(getServices(p1)).to.deep.equal([]);

    });

  });

});
