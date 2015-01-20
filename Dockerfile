FROM ubuntu:14.04

RUN apt-get update
RUN apt-get install -y build-essential curl git

# Install nvm
RUN git clone https://github.com/creationix/nvm.git#43a7d786936ef1fe5fd954c8eee2e41434718574 /.nvm
RUN /bin/bash -c "source /.nvm/nvm.sh && nvm install iojs-v1.0.3 && \
    nvm default iojs-v1.0.3 && \
    ln -s /.nvm/versions/io.js/v1.0.3/bin/iojs /usr/bin/node && \
    ln -s /.nvm/versions/io.js/v1.0.3/bin/iojs /usr/bin/nodejs && \
    ln -s /.nvm/versions/io.js/v1.0.3/bin/iojs /usr/bin/iojs && \
    ln -s /.nvm/versions/io.js/v1.0.3/bin/npm /usr/bin/npm"

# Install sassc
ADD scripts/libsass-install.sh /libsass-install.sh
RUN bash /libsass-install.sh

WORKDIR /app
ADD . /app

RUN npm install

ENV NODE_ENV production
ENV PORT 8080
EXPOSE $PORT

CMD npm start
