'use strict';

describe('ensureIsomorphicUrl', () => {
  import ensureIsomorphicUrl from '../ensureIsomorphicUrl';
  import isNode from 'detect-node';
  import url from 'url';

  if (isNode) {
    it('uses localhost as hostname, if none given', () => {
      expect(ensureIsomorphicUrl('/foo/bar')).to.equal('http://localhost/foo/bar');
      expect(ensureIsomorphicUrl('http://baz.com/foo/bar')).to.equal('http://baz.com/foo/bar');
    });

    it('uses `process.env.PORT` as port', () => {
      let initialPort = process.env.PORT;
      process.env.PORT = initialPort || 3000;

      expect(url.parse(ensureIsomorphicUrl('/foo/bar')).port).to.equal('3000');

      process.env.PORT = initialPort;
    });
  } else {
    it('returns url as is', () => {
      expect(ensureIsomorphicUrl('/foo/bar')).to.equal('/foo/bar');
      expect(ensureIsomorphicUrl('http://baz.com/foo/bar')).to.equal('http://baz.com/foo/bar');
    });
  }
});
