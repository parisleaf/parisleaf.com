[![Build Status](https://travis-ci.org/parisleaf/parisleaf.com.svg?branch=master)](https://travis-ci.org/parisleaf/parisleaf.com)

A frontend blog-style app that fetches data using the WP REST API.

## Architecture

Content is fetched from an external WordPress application using [WP-API](http://wp-api.org/). That project can be found at [parisleaf/wp.parisleaf.com](https://github.com/parisleaf/wp.parisleaf.com).

**Server** - Node.js v0.11 (harmony flag enabled)

**Middleware** - [koa.js](https://github.com/koajs/koa)

**Client** - [React.js](https://github.com/facebook/react) (rendered server-side and then resumed on the client)

## Git Conventions

**1 Topic = 1 Commit.** Each commit should be attributed to one change.

**Never commit half-done work.** Commits are made to wrap up something completed, no matter how small the change.

#### Branches
There are two long-term branches - **master** and **develop** - that should never be removed. New branches should only come from **develop**. Stable changes can then be merged into **master** with a [semantic versioning](http://semver.org/) tag (`npm version [major|minor|patch]`).

**Master** contains *production-ready* code only, and corresponds to the production environment at [parisleaf.com](https://parisleaf.com)

**Develop** contains *potentially unstable* code and is deployed to [staging.parisleaf.com](https://staging.parisleaf.com).

These two versions of the frontend are hosted on the same Droplet in Digital Ocean, and deployed via [dokku-alt](https://github.com/dokku-alt/dokku-alt).

## Tooling

#### browserify (CommonJS)

JavaScript is organized into CommonJS modules and bundled with [browserify](http://browserify.org/) for the browser.

#### react-router

Routing is handled with react-router. Combined with Browserify and server-side rendering, this enables us to write isomorphic JavaScript. Learn more about [isomorphic JavaScript applications](http://isomorphic.net/).

#### 6to5

JavaScript files in `src` are compiled with 6to5. This lets us use ES6 features like arrow functions and class syntax in today's JavaScript environments. 6to5 also handles React JSX transformation.

#### libsass

Stylesheets are compiled using the [sassc](https://github.com/sass/sassc) implementation of [libsass](https://github.com/sass/node-sass).

The Dockerfile takes care of installing sassc. You'll probably want to install it on your own machine, too. On OS X: `brew install sassc`

On Linux, it's [a bit more complicated](http://crocodillon.com/blog/how-to-install-sassc-and-libsass-on-ubuntu).

## Development

1. Clone the repository to your development environment.
```git
git clone git@github.com:parisleaf/parisleaf.com.git
```

2. Duplicate .env.example and rename it to .env. Open the file and set your environment variables.

3. Build the application.
```shell
make build
```
Running `make` again will cause only files with updated dependencies to rebuild.

4. Spin up the local dev server.
```shell
make watch
```
This will watch for changes, rebuild, and inject changes in the browser as files are changed.

If it's the first build, you can run `make fast-build`. This will build the application more quickly, but it won't check for changes — it runs every time. On subsequent builds, use `make build`.

## Deployment

In all our environments, this app is set up to deploy via dokku-alt. Pushing to dokku-alt will automatically build a new container based on whatever git commit you just pushed.

Refer to [dokku-alt's documentation](https://github.com/dokku-alt/dokku-alt) for more information.

#### Staging

In staging, the `develop` branch is deployed directly to dokku-alt:

1. `git remote add dokku-staging dokku@parisleaf.com:staging`
2. `git push dokku-staging develop:master`

#### Production

In staging, the `master` branch is deployed to [Travis-CI](https://travis-ci.org/), and then Travis deploys to dokku-alt if all tests pass:

1. `git push`
2. Check [Travis-CI](https://travis-ci.org/)

## FAQ

Coming soon.
