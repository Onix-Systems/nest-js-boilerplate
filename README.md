# Nest.js boilerplate


![onix](https://img.shields.io/badge/onix-systems-blue.svg)

> Node.js Nest.js API. Supports MongoDB, Mysql, Redis ;)

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

## Deploy 
 - Heroku (http://heroku.com)
    - npm run deploy:heroku
    - NOTICES 
        - Check all urls to dbs if they are true, they must connect to dbs which located at them own servers like mongodb on Mlab
        - When you'll run npm run deploy:heroku you'll need to sign in on heroku. You will be redirected to login form.
        
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

## Clinic Benchmark 
   ### Graph
   ![Clinic Benchmark](https://lh3.googleusercontent.com/ZE9nbA3Ydkqn1Pr7YyoC400Dw4dxAvML-JBaGFk_2tWw5qQWm-oyA0toBC8Tu-lGOrqpT3ElnR17gLIFPc7bqqESBoBB_r6vEhfbaRP8vIq2u9Zq6Zz5s3cHs9OMk-Kjbt9atIZReKohT_8ne48irv3kMkxpGgLxV0OrBibaHM2N8nglUCbnGB_TI11RfqjrnKA_0pk2cf9BtgexbiB24skvhcAssAWJb3VX7N8DLEhgR75XyOuVMP0RgxvshM0owlSufAm4iDvFu0hGQtIh_zwd5H0zu8uvQDjYHA9uukr0Xqn4O8B8dMgp5wYgAA1IOkRcZuRlQEahxDEkse0NHzppL1clJvFXAqNJ8jOJ7xxgOg7o07eiaIdqZ_5d4-pyAjTw5O1eWICsFyUl6cQZxWPjc6-jnHbW4czTudjfwtHUBc8tp1q5BOjQmpZ3X7qiwaDEurkVBF6jvP8cqrouxabJBQkI6WwK05GaOs8KewZoU6EcMgo0cuiC3YHbe3AYygXmu3hbf2eYLod8WblKZ57SM72MDOIhc5_UIt9pNT8YW_0QDNScFoJTGGJY4dvqI312VjRQLftU_NG0Pb2cuqR4Rc6Byc6DprFxnhPriaQ0k0vLaWDJkhjWBoFagHMnS0z_lsciycB6GoThPNMRzsmyQE7yIKI0BehltMLTynDgfqhlOhNExFZjpi1D-g=w1622-h912-no?authuser=0)
   ### Graphics
   ![Graphics](https://lh3.googleusercontent.com/wTXv1mVlL0WINon8d-m6poo3vwZMI3sTe0fpGUys7xodHN7sdwGN3eEeDbW8tu_Vyfi8rXbh5UpAZSdgAkNso2Wf7zk4MFprxgJYNTSSZmpO3pgmsI00nGE45gwG3OgVTL6zLjIel4KFdy5eJMneg_OPEwiALh5d6sAMSGDczb5VHlJ1pMK6GuzywYRKcUfjo07-q8kNBozf1q6ZIpsie8eaB5mMOFaWrp__twFS9z25_Nxrlz7abCG-yiGd2v_GFTM_8BbpbfMJUTZspQVVPgj9QpXqx00huVd82QVxjAD0xYTgSbzRbiYRWlITzZ98XToTlPenA6ddZRrj1uZm8q2LdeBYHg0yIFHjzihL0CTLwKULvpOSPUdUOAs74XgypKcI2IyPJHThBJ6cLOGOYh69fCboZDgYaPDsMjr1A0vxaDOjouoOkLSieGigsZBK796PfV-JsGmK9RA2uHXcUQBPF-U2v7to9sgie2FwB283vv_M1iXAe437zohSyMQqOS7F0gNU_6orWRXctCRN8N6lPL_A6n1Cl5qSOzxtACCg8VRf1znXFiuXjfBemntJ9prOcdYi0r0ePrfEMg2EpascJG2CvxzZn0sWCGfxUuuOa2iuKvMvGVbxR4QCeF5jCymM48suARom3kOQ6tLKbzS5Qh8QUdm3eQgpomXq2KZVIT_8Zu2rlUAESgm_PQ=w1622-h912-no?authuser=0)

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

[travis-image]: https://travis-ci.org/caiobsouza/generator-ts-node-api.svg?branch=master
[travis-url]: https://travis-ci.org/caiobsouza/generator-ts-node-api
