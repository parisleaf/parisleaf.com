6TO5_CMD = node_modules/.bin/6to5
MOCHA_CMD = node_modules/.bin/mocha

SRC_JS = $(shell find src -name "*.js")
LIB_JS = $(patsubst src/%.js,lib/%.js,$(SRC_JS))

# Test with mocha
test: build
	$(MOCHA_CMD) lib/**/__tests__/*-test.js

# Build application
build: transpile-js

# Clean up
clean:
	rm -rf lib

# Transpile JavaScript using 6to5
transpile-js: $(LIB_JS)

$(LIB_JS): lib/%.js: src/%.js
	mkdir -p $(dir $@) && $(6TO5_CMD) $< -o $@ --blacklist generators,letScoping


.PHONY: test build watch stop-watch clean transpile-js
