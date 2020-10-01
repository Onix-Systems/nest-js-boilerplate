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

## Diagnose and pinpoint performance issues
   ### Graph
   ![Clinic Benchmark](https://lh3.googleusercontent.com/5r4Q_fTsrRmPbZP6XC0HtfUZ2qjcmp-lyu2C3FucGxlMsp173IrH_Ck1wu_84eQH0Asby2XEgRusvpiOiBW9NncqeW5u1Ijv_PlbUaeBqvgdGCltWQxCRLDZWBZ71UF8l1yZpDtkeME7e-BDQ4Ojj2axxmDUhovhTG6DzRSarA_sR51X2I-nbC1UwEWFj4f6Phvb9wgTi8YIosckwkStcoqs0xbXwGoUKf3kOfoMqiilX7jerqRUjxzAfuBsbD-oJR-Qn059fB8CsmYJANGndlGphbadrGgJsIymRspKxlCoTJz1xOceuIlxpZ8poVu4omWUmM140j-opMxPmqEV_KJTf2Unxb1sFWYWnNhRym8PCXLyKD2W1SPBV6N7hc185NVQdUsZlSRDdtv4LXa-CSgBsmYiaw79sT50KkygPShrzb-_Xd9JPmbm83m_Nnt8hmmgNXKQlpsOAlPZbVWG5AQs_Wrp0ZuaBMTdGCmzBZBVQqRIhu96w6006RSH-5i1EOfqNC-zzVoivbqjs1_bV0bg7LRVkFy0he4FqKaHpAquV2mOZe9jx9uPZ6zWHgPxs0_WztQPQUAJmK-Fi___4e-aR8czY2MzUM9KT807cIa4Dsw-MEPMk-pSN92r2xQcLxiFCI1ItRQTM6BINzlyRvlyGRUAc530oSnlItZIkebMKqnPUXTajUiEwlp58A=w1835-h942-no?authuser=0)
   ### Graphics
   ![Graphics](https://lh3.googleusercontent.com/ctXpOJPxHLmEGtlt_ZQRPU9dgzcfPKHHk0QarMDNgkY_2jrrxI8FLi2E_Drd9dn3cZZXMEsFAbJjFECDQrr1ssKrhOnWKbUIbF0OwCq-9c0S1ods5mE1RxDeiOq_k7BdDODI9O69R9PXV47BPQ4_2RKxgQWirWNyxjTpMpwaxoqkKE1BL3hvudVUsXSPRNiOmMol7INwuTyzwgzw1SKQda4ZIRmtm0EwWrlVdHqa-RUNwrDRGst7oOuIi44AIjyDCT0oua22pW-oQ5XcUlGjGcfKCfY5HmmhrxGQWA_3H3kPAxWWqeitnqSgAl3nQBYmrkeXXIzZUY1OYQqWyndRaDdpGw34VEFSQ7MJXyS2vPbGfibT75PRSx320YHoAx22x_CGPus_Pfo-ib2LnmOchYs_lsnqpyDy36n4HxC21HYuItW5XyiNqRYHICivKKkAtPLTUFhdpuJzApzcjNawEsiFpb6d--fj6TdOU0617t8bSuLj-9VDm6EpL9o9-GbWBRcKEYtZg6QdkssfGMwUr2gUC5Ho7QQdoI9hJ6ZB0zrXLqwI456EYMC8CZMGO0t2YBwsINHK7ZgcwIUQ7vw92XPha6Aebp6nDWtOOeVU-GFtxKZjAnHGAVDtAXmT0VDbrLj3ewTHub3pd0n3L5E0KgZR-hKTIzIICf2uyDvXayGHQF_0_z6Obg1g_aR9VQ=w1829-h944-no?authuser=0)

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

[travis-image]: https://travis-ci.org/caiobsouza/generator-ts-node-api.svg?branch=master
[travis-url]: https://travis-ci.org/caiobsouza/generator-ts-node-api
