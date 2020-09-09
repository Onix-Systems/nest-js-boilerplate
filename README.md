# Nest.js boilerplate


![onix](https://img.shields.io/badge/onix-systems-blue.svg)

> Node.js Nest.js API with TypeScript 3. Supports MongoDB
> See [node-nest-quick-start](https://github.com/igrokqq/nestjs-jwt-boilderplate) if you need vanilla JS

## Description
This generator will help you to build your own Nest.js Mongodb API using TypeScript 3.

### Project Introduction
- support ES6/ES7 features
- using tslint followed [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

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
- mongodb >= 3.0
- typescript >= 3.0

## Installation

First, install [Yeoman](http://yeoman.io) and generator-node-express-typescript-api using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-node-express-typescript-api
```

Then generate your new project:

```bash
yo @onix-systems/nestjs-boilerplate
```

App Skeleton

```├── index.js
├── nest-cli.json
├── package.json
├── package-lock.json
├── README.md
├── src
│ ├── components
│ │ ├── app...
│ │ ├── auth
│ │ │ ├── guards...
│ │ │ ├── serializers...
│ │ │ └── strategies...
│ │ └── users...
│ ├── guards...
│ ├── interfaces
│ │ └── responses...
│ ├── main.ts
│ └── pipes...
├── tsconfig.build.json
└── tsconfig.json
```

## Running the API
### Development
To start the application in development mode, run:

```bash
npm start
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

## Set up environment
In root folder you can find `.env`. You can use this config or change it for your purposes.
If you want to add some new variables, you also need to add them to interface and config object (Look `src/config/index.ts`)

## Usage as OAuth2.0 Server
To use this generator as OAuth2.0 server you should implement client side, that will be handle your redirectUris and make requests to `/auth/token/` route. [Read more about OAuth2.0](https://alexbilbie.com/guide-to-oauth-2-grants/)

## Swagger
```bash
npm install -g swagger-jsdoc
swagger-jsdoc -d swaggerDef.js -o swagger.json
```
Swagger documentation will be available on route: 
```bash
http://localhost:3000/docs
```
![Alt Text](https://i.ibb.co/b6SdyQV/gif1.gif)

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

[travis-image]: https://travis-ci.org/caiobsouza/generator-ts-node-api.svg?branch=master
[travis-url]: https://travis-ci.org/caiobsouza/generator-ts-node-api
