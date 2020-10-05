# Nest.js boilerplate

[![onix](https://img.shields.io/badge/onix-systems-blue.svg)](https://onix-systems.com/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Downloads Month](https://img.shields.io/jsdelivr/npm/hm/generator-nestjs-boilerplate?style=flat&color=green)](https://www.npmjs.com/package/generator-nest-js-boilerplate)
[![Typescript for types](https://img.shields.io/npm/types/typescript)](https://www.typescriptlang.org/)
[![Our rating](https://img.shields.io/librariesio/sourcerank/npm/generator-nest-js-boilerplate?color=green&label=Rating)](https://www.npmjs.com/package/generator-nest-js-boilerplate)
[![License](https://img.shields.io/npm/l/generator-nest-js-boilerplate)](https://www.npmjs.com/package/generator-nest-js-boilerplate)
[![Issues](https://img.shields.io/github/issues/Onix-Systems/nest-js-boilerplate?color=green)](https://github.com/Onix-Systems/nest-js-boilerplate/issues)
[![Latest package version](https://img.shields.io/npm/v/generator-nest-js-boilerplate)](https://www.npmjs.com/package/generator-nest-js-boilerplate)
[![Dependencies](https://img.shields.io/librariesio/release/npm/@onix-systems/generator-nestjs-boilerplate)](https://www.npmjs.com/package/generator-nest-js-boilerplate)
[![Organization stars](https://img.shields.io/github/stars/Onix-Systems?label=Onix%20Stars&style=social)](https://github.com/Onix-Systems)
[![Travis build passing](https://api.travis-ci.org/Onix-Systems/nest-js-boilerplate.svg?branch=master)](https://github.com/Onix-Systems/nest-js-boilerplate)

> Node.js Nest.js API. Supports MongoDB, Mysql, Redis

## Description
This generator will help you to build your own Nest.js Mongodb/MySQL API using TypeScript 4

### Project Introduction
- Support ES6/ES7 features
- Using Eslint followed [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Husky
- Commitizen
- MIT license and Code of conduct
- Docker
- Prettier

## Features
##### Authentication:
- passport local strategy
- jwt authentication
- passport google 2.0 strategy
##### Session Storage:
- MongoDB
- Redis
- MySQL
##### Integration testing
- mocha
- chai
- supertest

## Requirements

- node >= 12
- npm >= 6
- mongodb >= 4.0
- typescript >= 3.0

## Installation

First, install [Yeoman](http://yeoman.io) and generator-nest-js-boilerplate using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-nest-js-boilerplate
```

Then generate your new project:

```bash
yo nest-js-boilerplate
```

App Skeleton

```
├── src
│├── components
││├── app
│││   └── ...
││├── auth
│││   └── ...
││└── users
││    └── ...
│├── dto
││└── ...
│├── filters
││└── ...
│├── guards
││└── ...
│├── main.ts
│└── pipes
│    └── ...
├── docker-compose.yml
├── index.js
├── nest-cli.json
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json

```

## Running the API
### Development
To start the application in development mode, run:

```bash
npm run start:dev
```

Start the application in production env:

Install ts pm2 and typescript compiler:
```
npm install -g pm2
pm2 install typescript
```

example start with scale on 2 core:
```
pm2 start ./dist/main.js -i 2 --no-daemon
```

Express server listening on http://localhost:3000/, in development mode
The developer mode will watch your changes then will transpile the TypeScript code and re-run the node application automatically.

### Docker

* [Install Docker](https://docs.docker.com/get-docker/)
* [Install docker-compose](https://docs.docker.com/compose/install/)

To run your app in docker containers choose "Yes" when the generator asks you about docker.
 
#### Now, lift up your app in docker 
``` 
  docker-compose up 
```
  
## Set up environment
In root folder you can find `.env`. You can use this config or change it for your purposes.

## Deploy 
### Heroku
Check all urls to dbs if they are true, they must connect to dbs which located at them own servers like mongodb on Mlab
When you'll run npm run deploy:heroku you'll need to sign in on heroku. You will be redirected to login form.

```
npm run deploy:heroku
```

        
## Swagger
Swagger documentation will be available on route:
```bash
http://localhost:3000/api
```
![Alt Text1](https://media.giphy.com/media/XEUyeEL03IcaZYw6SB/giphy.gif)

### Jwt auth
![Alt Text2](https://media.giphy.com/media/QUKuolFMyd0WsNFIUH/giphy.gif)

### Oauth2 auth
![Alt Text3](https://media.giphy.com/media/RiWDyLQwXaJXu972SM/giphy.gif)

When you go by http://localhost:3000/google route, google'll ask you to authorize into your account. After successfully sign in to your account you will be redirected to http://localhost:3000/google/redirect route

## Diagnose and pinpoint performance issues

### Bubble
![Bubble](https://i.ibb.co/tY6MQKR/Screenshot-from-2020-10-01-17-08-03.png)

### Doctor
![Doctor](https://i.ibb.co/FmD5dSk/Screenshot-from-2020-10-01-17-11-41.png)

## Getting To Know Yeoman

* Yeoman has a heart of gold.
* Yeoman is a person with feelings and opinions, but is very easy to work with.
* Yeoman can be too opinionated at times but is easily convinced not to be.
* Feel free to [learn more about Yeoman](http://yeoman.io/).

[travis-image]: https://travis-ci.org/caiobsouza/generator-ts-node-api.svg?branch=master
[travis-url]: https://travis-ci.org/caiobsouza/generator-ts-node-api
