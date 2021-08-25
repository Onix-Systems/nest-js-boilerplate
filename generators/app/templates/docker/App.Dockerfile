FROM ubuntu:latest

WORKDIR /var/www/app

# OS TOOLS
RUN apt-get update && \
apt-get install -y curl && \
curl --version && \
apt install -y python2 && \
python2 -V && \
apt install -y build-essential && \
apt-get install -y manpages-dev && \
gcc --version && \
apt-get -y install make

COPY . .

## Install Node (with npm)
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y \
 nodejs

RUN apt-get install -y git

RUN npm install

RUN npm rebuild bcrypt --build-from-source && \
npm install -g node-gyp && \
npm install -g @nestjs/cli

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
