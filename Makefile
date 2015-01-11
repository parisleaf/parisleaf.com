6TO5_CMD = node_modules/.bin/6to5
MOCHA_CMD = node_modules/.bin/mocha
BROWSERIFY_CMD = node_modules/.bin/browserify
WATCHIFY_CMD = node_modules/.bin/watchify
SASS_CMD = sassc
WATCH_CMD = node_modules/.bin/watch
AUTOPREFIXER_CMD = node_modules/.bin/autoprefixer
SVG_SPRITE_CMD = node_modules/.bin/svg-sprite
UGLIFY_CMD = node_modules/.bin/uglifyjs
CLEANCSS_CMD = node_modules/.bin/cleancss
JSON_SASS_CMD = node_modules/.bin/json-sass

6TO5_ARGS = --experimental --source-maps-inline --runtime
BROWSERIFY_ARGS = -t [ 6to5ify $(6TO5_ARGS) ] -t envify

SRC_JS = $(shell find src -name "*.js")
LIB_JS = $(patsubst src/%.js,lib/%.js,$(SRC_JS))

# Build application
build: js browserify uglify-js css icons

# Test
test: js
	@NODE_ENV=test $(MOCHA_CMD) --harmony --require lib/test-init.js lib/{server,shared}/**/__tests__/*-test.js

# Build application quickly
# Faster on first build, but not after that
fast-build: fast-js build

# Watch for changes
watch:
	@NODE_ENV=development $(MAKE) -j4 watch-css watch-js watchify browser-sync

# Clean up
clean:
	rm -rf lib
	rm -rf public/js/
	rm -rf public/css/
	rm -f views/icon-sprite.svg
	rm -f sass/_theme.scss

browserify: public/js/app.js

watchify: src/client/app.js
	mkdir -p $(dir $@) && $(WATCHIFY_CMD) $< -o public/js/app.js $(BROWSERIFY_ARGS) --debug

public/js/app.js: $(SRC_JS)
	@NODE_ENV=production mkdir -p $(dir $@) && $(BROWSERIFY_CMD) src/client/app.js $(BROWSERIFY_ARGS) > $@

# Transpile JavaScript using 6to5
js: $(LIB_JS)

$(LIB_JS): lib/%.js: src/%.js
	mkdir -p $(dir $@) && $(6TO5_CMD) $< -o $@ $(6TO5_ARGS) --blacklist generators,letScoping --options asyncToGenerator

fast-js:
	$(6TO5_CMD) src -d lib $(6TO5_ARGS)

watch-js:
	$(6TO5_CMD) src -d lib $(6TO5_ARGS) -w

uglify-js: public/js/app.min.js

public/js/app.min.js: public/js/app.js
	mkdir -p public/js
	$(UGLIFY_CMD) public/js/app.js \
	--compress=dead_code,sequences,unused,conditionals,booleans,if_return,drop_console \
	--mangle \
	--screw-ie8 \
	> public/js/app.min.js

# Compile Sass
css: public/css/app.css public/css/app.min.css

public/css/app.css: sass/app.sass theme
	mkdir -p $(dir $@) && $(SASS_CMD) -m $< | $(AUTOPREFIXER_CMD) > $@

public/css/app.min.css: public/css/app.css
	$(CLEANCSS_CMD) $< > $@

watch-css:
	$(WATCH_CMD) "mkdir -p public/css && $(SASS_CMD) -m sass/app.sass | $(AUTOPREFIXER_CMD) > public/css/app.css" sass

theme: sass/_theme.scss

sass/_theme.scss: lib/shared/theme.js
	mkdir -p $(dir $@) && $(JSON_SASS_CMD) -i $< \
	| sed '1s/^/$$theme: /' \
	> $@

browser-sync:
	browser-sync start --config "bs-config.js"

icons: views/icon-sprite.svg

ICON_SVGS = $(shell find icons -name "*.svg")
views/icon-sprite.svg: $(ICON_SVGS)
	$(SVG_SPRITE_CMD) --symbol --symbol-inline --symbol-dest=views --symbol-sprite="./icon-sprite.svg" icons/*.svg

.PHONY: test build fast-build watch clean browserify watchify js fast-js
.PHONY: watch-js css watch-css icons
