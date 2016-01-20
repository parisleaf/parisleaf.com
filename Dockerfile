FROM ubuntu:14.04

RUN apt-get update
RUN apt-get install -y build-essential curl git

# Install nvm
RUN git clone https://github.com/creationix/nvm.git /.nvm
RUN cd /.nvm && git fetch && git checkout 879dda6
RUN /bin/bash -c "source /.nvm/nvm.sh && nvm install iojs-v1.2.0 && \
    nvm default iojs-v1.2.0 && \
    ln -s /.nvm/versions/io.js/v1.2.0/bin/iojs /usr/bin/node && \
    ln -s /.nvm/versions/io.js/v1.2.0/bin/iojs /usr/bin/nodejs && \
    ln -s /.nvm/versions/io.js/v1.2.0/bin/iojs /usr/bin/iojs && \
    ln -s /.nvm/versions/io.js/v1.2.0/bin/npm /usr/bin/npm"

WORKDIR /app
ADD . /app

RUN npm install
RUN bower install

ENV NODE_ENV production
ENV PORT 8080
EXPOSE $PORT

CMD npm start
