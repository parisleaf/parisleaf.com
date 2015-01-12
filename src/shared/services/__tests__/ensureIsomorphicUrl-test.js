'use strict';

describe('ensureIsomorphicUrl', () => {
  import ensureIsomorphicUrl from '../ensureIsomorphicUrl';
  import isNode from 'detect-node';
  import url from 'url';

  let initialPort;

  before(() => {
    initialPort = process.env.PORT;
    process.env.PORT = 1234;
  });

  after(() => {
    process.env.PORT = initialPort;
  });

  if (isNode) {
    it('uses localhost as hostname, if none given', () => {
      expect(ensureIsomorphicUrl('/foo/bar')).to.equal('http://localhost:1234/foo/bar');
      expect(ensureIsomorphicUrl('http://baz.com/foo/bar')).to.equal('http://baz.com/foo/bar');
    });

    it('uses `process.env.PORT` as port', () => {
      expect(url.parse(ensureIsomorphicUrl('/foo/bar')).port).to.equal('1234');
    });
  } else {
    it('returns url as is', () => {
      expect(ensureIsomorphicUrl('/foo/bar')).to.equal('/foo/bar');
      expect(ensureIsomorphicUrl('http://baz.com/foo/bar')).to.equal('http://baz.com/foo/bar');
    });
  }
});
