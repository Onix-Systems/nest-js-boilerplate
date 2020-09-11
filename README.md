# Nest.js boilerplate


![onix](https://img.shields.io/badge/onix-systems-blue.svg)

> Node.js Nest.js API with TypeScript 3. Supports MongoDB

## Description
This generator will help you to build your own Nest.js Mongodb API using TypeScript 3.

### Project Introduction
- Support ES6/ES7 features
- Using Eslint followed [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Husky
- Commitizen
- MIT license and Code of conduct
- Docker
- Prettier
- Jest because testing matters
- Typescript for coding with static type checking

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
npm start:dev
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

### Testing
To run integration tests:
```bash
npm test
```

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
- When you go by http://localhost:3000/google route, google'll ask you to authorize into your account. After successfully sign in to your account you will be redirected to http://localhost:3000/google/redirect route
## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

[travis-image]: https://travis-ci.org/caiobsouza/generator-ts-node-api.svg?branch=master
[travis-url]: https://travis-ci.org/caiobsouza/generator-ts-node-api
